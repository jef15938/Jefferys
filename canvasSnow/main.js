// 0. 判斷 requestAnimationFrame 支援度
// 1. 定義動畫要操作的 "物件" 
// 2. 設定物件初始化的狀態(x, y, size, velocity, color...)
// 3. 瀏覽器每次繪製時要 "如何" 操作物件達到想要的效果
// 4. (如果需要) 到達終點時, 將物件設定為起點狀態
// 5. (如果需要) 每次繪製時的第一步, "擦掉" 畫布的內容
// 6. 根據物件狀態, 繪製到 Canvas 上

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var numberOfSnow = 5000;
var snowList = [];
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var myWorker = new Worker("worker.js");;

// 0. 判斷 requestAnimationFrame 支援度
var requestAnimationFrame = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }
);

// 1. 定義動畫要操作的 "物件" 
var Snow = function () {

  // 2. 物件初始化的狀態
  this.x = Math.random() * canvasWidth;
  this.y = Math.random() * canvasHeight;
  this.velocity = Math.random() * 3.5 + 0.5; // 0.5  ~ 4
  this.size = Math.random() * 3.5 + 1; // 1 ~ 4.5
}

// 3. 瀏覽器每次繪製時要 "如何" 操作物件達到想要的效果
Snow.prototype.update = function () {

  // 往下飄落
  this.y += this.velocity;

  // 4. 設定終止條件(雪花已經飄到畫面外)
  if (this.y > canvasHeight) {
    this.y = 0;
    this.x = Math.random() * canvasWidth;
  }
}

// 6. 把雪花繪製到 Canvas 上
Snow.prototype.draw = function () {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}


// 初始化雪花陣列
function initial() {
  for (var i = 0; i < numberOfSnow; i++) {
    snowList.push(new Snow());
  }

  if (window.Worker) {
    // myworker = new Worker("worker.js");

    myWorker.postMessage({ canvasWidth: canvasWidth, canvasHeight: canvasHeight });

    myWorker.postMessage(snowList);

    myWorker.onmessage = function (e) {
      var resultSnowList = e.data;
      for (var i = 0; i < numberOfSnow; i++) {
        var resultSnow = resultSnowList[i];
        snowList[i].x = resultSnow.x;
        snowList[i].y = resultSnow.y;
        snowList[i].size = resultSnow.size;
      }
    }
  }

}

// 更新畫面(雪花飄落)
function animate() {

  // 5. (如果需要) 每次繪製時的第一步, "擦掉" 畫布的內容
  // 每次繪製第一步都填入黑色, 長寬為整個 Canvas 的方塊 (擦掉畫布)
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // for loop 跑雪花陣列的 update, draw
  for (var i = 0; i < snowList.length; i++) {
    // snowList[i].update();
    snowList[i].draw();
  }



  // 瀏覽器準備繪製時, 呼叫自己(更新畫面)
  requestAnimationFrame(animate);
}

// 主程式
initial();
animate();