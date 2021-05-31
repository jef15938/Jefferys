// helper functions
const PI2 = Math.PI * 2
//這邊max-min+1, 不太確定+1的原因, 不過有嘗試過把1拿掉似乎也沒錯誤, 這邊其實可以視為是在max+1 跟min之間取隨機值
const random = (min, max) => Math.random() * (max - min + 1) + min | 0 // 注意這邊的 | 是為了用來排除max/min 如果不是數字, 計算出來結果有NAN或undefined時, 防呆自動給0
const timestamp = _ => new Date().getTime()

// container
class Birthday {
  constructor() {
    this.resize()

    // create a lovely place to store the firework
    this.fireworks = []
    this.counter = 0

  }

  resize() {
    //把canvas 大小跟canvas 同步
    //canvas 是canvas element
    this.width = canvas.width = window.innerWidth
    let center = this.width / 2 | 0 // 取得寬度的水平中心, 同樣防呆給0
    this.spawnA = center - center / 4 | 0 // 水平中心靠左 四分之一距離, 同樣防呆給0
    this.spawnB = center + center / 4 | 0 // 水平中心靠右 四分之一距離, 同樣防呆給0
    //不太確定寬度有防呆, 高度沒有防呆的原因
    this.height = canvas.height = window.innerHeight //取得高度的垂直中心
    this.spawnC = this.height * .1 //高度的十分之一倍
    this.spawnD = this.height * .5 //高度的一半

  }

  onClick(evt) {
    // 這邊的xy 就是從傳進來的event 物件去拿到點擊座標
    let x = evt.clientX || evt.touches && evt.touches[0].pageX
    let y = evt.clientY || evt.touches && evt.touches[0].pageY

    let count = random(3, 5)

    for (let i = 0; i < count; i++) this.fireworks.push(new Firework(
      // 大約是在水平3/4到1/4之間取隨機位置
      random(this.spawnA, this.spawnB),
      this.height,
      x,
      y,
      // 這邊的數值應該是隨便訂的
      random(0, 260),
      random(30, 110)))

    this.counter = -1

  }
  // delta 是豪秒差/1000
  update(delta) {
    ctx.globalCompositeOperation = 'hard-light'
    ctx.fillStyle = `rgba(20,20,20,${7 * delta})`
    // 這邊的fillStyle是不停地蓋有透明度的灰幕上去, 這樣就會讓煙火的尾端拖曳軌跡產生淡出效果
    ctx.fillRect(0, 0, this.width, this.height)

    ctx.globalCompositeOperation = 'lighter'
    // 第一次執行的時候因為this.fireworks是空物件, 所以等於什麼都沒做
    for (let firework of this.fireworks) firework.update(delta)
    // 跟原本的註解寫得一樣, 每次run unpate就會去+=counter, 而當run undate run到counter超過某值時, 就開始push新的 firework 
    // if enough time passed... create new new firework
    this.counter += delta * 3 // each second
    if (this.counter >= 1) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,// 所以煙火基本都從最底部發射 ,因為固定給 this.height
        random(0, this.width),// 這個應該是爆開的位置(Ｘ軸)
        random(this.spawnC, this.spawnD),// 這個應該是爆開的位置(y軸)
        random(500, 600),
        random(30, 110)))
      //所以這邊可以解釋成他會setInterval 去做煙火的施放
      this.counter = 0// 放完一發煙火之後歸0 counter
    }

    // remove the dead fireworks
    // 當煙火的實例超過1000發的時候, 移除掉已經爆炸結束的煙火
    if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

  }
}
//煙火class
// 這邊煙火class產生的實例就是單一發煙火
class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false
    this.offsprings = offsprings

    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY

    this.shade = shade
    this.history = []
  }
  update(delta) {
    if (this.dead) return
    // 計算爆炸位置跟施放位置的水平/垂直距離差
    let xDiff = this.targetX - this.x
    let yDiff = this.targetY - this.y
    // 如果爆炸位置跟施放位置的水平/垂直距離差都低於3的話, 代表煙火還在移動, 沒有爆炸
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
      // 這邊就是算出當前x 的距離, 傳入的delta 就有點像是幀與幀之間的時間差
      this.x += xDiff * 2 * delta
      this.y += yDiff * 2 * delta
      // 這邊這個history 用意就是用來紀錄拖曳的軌跡,history的長短決定軌跡的長短
      this.history.push({
        x: this.x,
        y: this.y
      })

      if (this.history.length > 20) this.history.shift()// 當形成軌跡的座標超過20 組, 則自動拿掉最舊的座標

    } else {
      // 要爆了
      // 爆過之後就不會再進到這個if
      if (this.offsprings && !this.madeChilds) {

        let babies = this.offsprings / 2
        for (let i = 0; i < babies; i++) {
          //根據爆炸的中心點, 還有爆炸的極限半徑來計算出每發子煙火最終抵達的位置
          let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
          let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0
          // 所以每一發爆炸的煙火實例產生的子煙火(就是爆炸後輻射出去的每一發小煙火)也都是獨立的煙火實例
          // 至於為什麼子煙火不會再衍生自己的子嗣, 是因為下面這一行 ,offSpring 是給0, 所以他在前面的if(標了"要爆了"的那段)就會過不了關
          birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))

        }

      }
      //代表已經爆過了
      this.madeChilds = true
      //逐漸的移除掉軌跡的座標
      this.history.shift()
    }
    //當軌跡座標長度歸0代表該發煙火已結束
    if (this.history.length === 0) this.dead = true
    //這邊就是在畫一般煙火軌跡
    else if (this.offsprings) {
      for (let i = 0; this.history.length > i; i++) {
        let point = this.history[i]
        ctx.beginPath()
        ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
        //每個軌跡點點其實都是一個小圓型, 所以這邊是用arc畫路徑之後fill
        ctx.arc(point.x, point.y, 1, 0, PI2, false)
        ctx.fill()
      }

    }
    //然後這是子煙火的軌跡 
    else {
      ctx.beginPath()
      ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
      ctx.arc(this.x, this.y, 1, 0, PI2, false)
      ctx.fill()
    }

  }
}
// init的起始點
let canvas = document.getElementById('birthday')
let ctx = canvas.getContext('2d')

// 先定義init時的豪秒數
let then = timestamp();
//產生birthday實例
let birthday = new Birthday;

window.onresize = () => birthday.resize() // 綁定全document 的 onresize 事件, 讓canvas 的大小跟視窗大小同步
document.onclick = evt => birthday.onClick(evt)// 綁定全document 的 onclick 事件, 這邊可以這樣綁是因為canvas 的大小是滿螢幕的, 這麼一來document的點擊座標就剛好是canvas 的點擊座標
document.ontouchstart = evt => birthday.onClick(evt);//  綁定全document 的 ontouchstart 事件, 這邊可以這樣綁是因為canvas 的大小是滿螢幕的, 這麼一來document的點擊座標就剛好是canvas 的點擊座標

(function loop() {
  // 立即函數會馬上執行裡面的func
  requestAnimationFrame(loop)
  let now = timestamp()
  let delta = now - then
  // 這邊的delta 會是毫秒數差
  then = now
  //使用birthday實例的update方法, 並傳入豪秒時間差/1000
  birthday.update(delta / 1000)


})()