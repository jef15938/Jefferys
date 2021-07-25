var colorLightBlue = '#00aedc';
var colorGray = '#eeeee8';

var rays;
var mainCanvas = $('#mainCanvas')[0];
var mainCtx = mainCanvas.getContext('2d');
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
mainCanvas.width = canvasWidth;
mainCanvas.height = canvasHeight;

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

// Rays
var Rays = function (ctx, lineNumbers) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.lineNumbers = lineNumbers;
  this.centerX = canvasWidth / 2;
  this.centerY = canvasHeight / 2;

  this.lineToRadius = Math.max(canvasWidth, canvasHeight);
}

Rays.prototype.drawBackground = function (color) {
  var ctx = this.ctx;

  ctx.save();
  ctx.fillStyle = color;
  ctx.rect(0, 0, canvasWidth, canvasHeight);
  ctx.fill();
  ctx.restore();
}

Rays.prototype.drawLine = function (color) {
  var ctx = this.ctx;

  ctx.save();
  ctx.fillStyle = color;
  ctx.lineCap = "round";
  ctx.beginPath();

  var perAdd = 360 / this.lineNumbers;

  for (i = 0; i < 360; i += perAdd) {

    const startOffsetX = this.lineToRadius * Math.cos((Math.PI / 180) * i);
    const startOffsetY = this.lineToRadius * Math.sin((Math.PI / 180) * i);

    const endOffsetX = this.lineToRadius * Math.cos((Math.PI / 180) * (i + 3));
    const endOffsetY = this.lineToRadius * Math.sin((Math.PI / 180) * (i + 3));

    var line = new Path2D();

    line.moveTo(this.centerX, this.centerY);
    line.lineTo(this.centerX + startOffsetX, this.centerY + startOffsetY);
    line.lineTo(this.centerX + endOffsetX, this.centerY + endOffsetY);
    line.lineTo(this.centerX, this.centerY);
    ctx.fill(line);
  }

  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function initial() {
  rays = new Rays(mainCtx, 12);
  rays.drawBackground('#00A8A9');
  rays.drawLine('white');
}

// 主程式
initial();
