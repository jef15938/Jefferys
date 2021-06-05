// 0. 判斷 requestAnimationFrame 支援度
// 1. 定義動畫要操作的 "物件" 
// 2. 設定物件初始化的狀態(x, y, size, velocity, color...)
// 3. 瀏覽器每次繪製時要 "如何" 操作物件達到想要的效果
// 4. (如果需要) 到達終點時, 將物件設定為起點狀態
// 5. (如果需要) 每次繪製時的第一步, "擦掉" 畫布的內容
// 6. 根據物件狀態, 繪製到 Canvas 上

var canvasWidth = 1920;
var canvasHeight = 1080;
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

  // 2. 設定物件初始化的狀態(x, y, size, velocity, color...)
  this.x = 50;
  this.y = 50;
  this.velocity = 1;
  this.size = 10;
  this.color = 'black';
}

// 3. 瀏覽器每次繪製時要 "如何" 操作物件達到想要的效果
Dot.prototype.update = function () {

  this.x += this.velocity;

  // 4. (如果需要) 到達終點時, 將物件設定為起點狀態
  if (this.x > 300) {
    this.x = 50;
  }
}

// 6. 根據物件狀態, 繪製到 Canvas 上
Dot.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
}



// 初始化
function initial() {
  dot = new Dot();
}

// 更新畫面
function animate() {

  // 5. (如果需要) 每次繪製時的第一步, "擦掉" 畫布的內容
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  dot.update();
  dot.draw();

  // 瀏覽器準備繪製時, 呼叫自己(更新畫面)
  requestAnimationFrame(animate);
}

// 主程式
initial();
animate();