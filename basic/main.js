// 0. 判斷 requestAnimationFrame 支援度
// 1. 定義動畫要操作的 "物件" 
// 2. 設定物件初始化的狀態(x, y, size, velocity, color...)
// 3. 瀏覽器每次繪製時要 "如何" 操作物件達到想要的效果
// 4. (如果需要) 到達終點時, 將物件設定為起點狀態
// 5. (如果需要) 每次繪製時的第一步, "擦掉" 畫布的內容
// 6. 根據物件狀態, 繪製到 Canvas 上

var canvasWidth = 500;
var canvasHeight = 100;
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var dot;

// 0. 判斷 requestAnimationFrame 支援度
var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }

// 1. 定義動畫要操作的 "物件" 
var Dot = function () {

  // 2. 設定物件初始化的狀態(x, y, size, velocity, size, color...)
  this.x = 50;
  this.y = 50;
  this.velocity = 1;
  this.size = 10;
  this.color = 'black';
}

// 3. 瀏覽器每次繪製時要 "如何" 操作物件達到想要的效果
Dot.prototype.update = function () {

  // x 往右邊移動
  this.x += this.velocity;

  // 4. (如果需要) 到達終點時, 將物件設定為起點狀態
  // TODO
  if (this.x > 300) {
    this.x = 50;
  }
}

// 6. 根據物件狀態, 繪製到 Canvas 上
Dot.prototype.draw = function () {

  ctx.save();
  ctx.beginPath();

  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();

  ctx.closePath();
  ctx.restore();
}



// 初始化
function initial() {
  // 初始化一個點
  dot = new Dot();
}

// 更新畫面
function animate() {

  // 5. (如果需要) 每次繪製時的第一步, "擦掉" 畫布的內容
  // 繪製一個跟 canvas 等寬高的白色 rect
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 更新 dot
  dot.update();

  // 繪製 dot
  dot.draw();

  // 瀏覽器準備繪製時, 呼叫要執行的 function
  requestAnimationFrame(animate);
}

// 主程式
initial();
animate();