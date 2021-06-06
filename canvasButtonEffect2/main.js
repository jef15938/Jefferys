var requestId = undefined;
var canvasWidth = 150;
var canvasHeight = 80;
var canvasCenterX = canvasWidth / 2;
var canvasCenterY = canvasHeight / 2;
var numberOfParticles = 100;
var particleList = [];
var canvas = $('.button-container__canvas')[0];
var ctx = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

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

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


// 每顆粒子
var Particle = function (context, fillColor) {
  this.context = context;
  this.initial(fillColor);
}

// 初始化粒子
Particle.prototype.initial = function (fillColor) {
  this.x = canvasCenterX;
  this.y = canvasCenterY;
  this.opacity = 1;
  this.velocityX = (Math.random() * 2) - 1;  // -1 ~ 1
  this.velocityY = (Math.random() * 2) - 1;  // -1 ~ 1
  this.velocityOpacity = (Math.random() * 0.1) * -1; // -0.1 ~ 0
  this.size = Math.random() * 1.5 + 5; // 5 ~ 6.5
  this.fillColor = fillColor;
}

// 更新狀態
Particle.prototype.update = function () {
  this.x += this.velocityX;
  this.y += this.velocityY;
  this.opacity += this.velocityOpacity;

  // 如果粒子超出 canvas 或是 透明度 < 0, 重設為起始狀態
  if (this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight || this.opacity < 0) {
    this.initial(this.fillColor);
  }
}

// 畫圓圈
Particle.prototype.drawCircle = function () {
  this.context.save();
  this.context.beginPath();
  this.context.globalAlpha = this.opacity;
  this.context.fillStyle = this.fillColor;
  this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  this.context.fill();
  this.context.restore();
}

// 畫正方形
Particle.prototype.drawRectangle = function () {
  this.context.save();
  this.context.beginPath();
  this.context.save();
  this.context.globalAlpha = this.opacity;
  this.context.strokeStyle = this.fillColor;
  this.context.strokeRect(this.x, this.y, this.size * 1.5, this.size * 1.5);
  this.context.restore();
}

function initial() {
  particleList = [];
  for (var i = 0; i < numberOfParticles; i++) {
    const randomColor = getRandomGreenColor();
    particleList.push(new Particle(ctx, randomColor));
  }
}

// 開始動畫
function animate() {

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  for (var i = 0; i < particleList.length; i++) {
    particleList[i].update();
    particleList[i].drawCircle();
  }

  requestId = requestAnimationFrame(animate);

}

// 結束動畫
function stopAnimate() {

  if (requestId) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    cancelAnimationFrame(requestId);
    requestId = undefined;
  }

}

var bindButtonEvent = function () {
  // 滑鼠移進按鈕
  $('.button-container__btn').on('mouseenter', function () {
    initial();
    animate();
  })

  // 滑鼠移出按鈕
  $('.button-container__btn').on('mouseleave', function () {
    stopAnimate();
  });
}


// 主程式
bindButtonEvent();


// utils
function getRandomGreenColor() {
  var color = 'rgb(0, green, 0)';
  var randomGreen = Math.floor(Math.random() * 155) + 100; // 100 ~ 255
  return color.replace('green', randomGreen);
}

function getRandomRedColor() {
  var color = 'rgb(red, 0, 0)';
  var randomRed = Math.floor(Math.random() * 155) + 100; // 100 ~ 255
  return color.replace('red', randomRed);
}

