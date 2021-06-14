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
  // TODO
}

// 3. 瀏覽器每次繪製時要 "如何" 操作物件達到想要的效果
Dot.prototype.update = function () {

  // x 往右邊移動
  // TODO

  // 4. (如果需要) 到達終點時, 將物件設定為起點狀態
  // TODO
}

// 6. 根據物件狀態, 繪製到 Canvas 上
Dot.prototype.draw = function () {
  // TODO
}



// 初始化
function initial() {
  // 初始化一個點
  // TODO
}

// 更新畫面
function animate() {

  // 5. (如果需要) 每次繪製時的第一步, "擦掉" 畫布的內容
  // 繪製一個跟 canvas 等寬高的白色 rect
  // TODO

  // 更新 dot
  // TODO

  // 繪製 dot
  // TODO

  // 瀏覽器準備繪製時, 呼叫要執行的 function
  // TODO
}

// 主程式
initial();
animate();