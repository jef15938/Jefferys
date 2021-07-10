var fireworks;
var fireworksCanvas = $('#fireworks')[0];
var fireworksCtx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = 300;
fireworksCanvas.height = 300;

var flower;
var flowerdCanvas = $('#flower')[0];
var flowerCtx = flowerdCanvas.getContext('2d');
flowerdCanvas.width = 300;
flowerdCanvas.height = 300;

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

// fireworks
var Fireworks = function (ctx, lineNumbers) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.lineNumbers = lineNumbers;
  this.centerX = 150;
  this.centerY = 150;
  this.lineFromRadius = 50
  this.lineToRadius = 70;
  this.lineToMinRadius = 70;
  this.lineToMaxRadius = 100;
  this.isRadiusAdding = true;
}

Fireworks.prototype.drawLine = function () {
  var ctx = this.ctx;

  ctx.save();
  ctx.strokeStyle = '#eeeee8';
  ctx.lineCap = "round";
  ctx.beginPath();

  var perAdd = 360 / this.lineNumbers;

  for (i = 0; i < 360; i += perAdd) {
    const startOffsetX = this.lineFromRadius * Math.cos((Math.PI / 180) * i);
    const startOffsetY = this.lineFromRadius * Math.sin((Math.PI / 180) * i);

    const endOffsetX = this.lineToRadius * Math.cos((Math.PI / 180) * i);
    const endOffsetY = this.lineToRadius * Math.sin((Math.PI / 180) * i);

    ctx.lineWidth = 5;
    ctx.moveTo(this.centerX + startOffsetX, this.centerY + startOffsetY);
    ctx.lineTo(this.centerX + endOffsetX, this.centerY + endOffsetY);
  }

  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

Fireworks.prototype.update = function () {
  if (this.isRadiusAdding) {
    this.lineToRadius++;
  } else {
    this.lineToRadius--;
  }

  if (this.lineToRadius > this.lineToMaxRadius) {
    this.isRadiusAdding = false;
    return 'ToMax';
  }
  if (this.lineToRadius < this.lineToMinRadius) {
    this.isRadiusAdding = true;
    return 'ToMin';
  }

  return '';

}

Fireworks.prototype.clear = function () {
  this.ctx.clearRect(0, 0, 300, 300);
}

Fireworks.prototype.explosion = function (explosionTimes) {
  if (explosionTimes === 0) {
    return;
  }

  var paramater;
  this.clear();
  var updateRes = this.update();
  if (explosionTimes === undefined) {
    paramater = undefined;
  }
  else if (explosionTimes && explosionTimes > 0) {
    paramater = updateRes === 'ToMin' ? explosionTimes - 1 : explosionTimes;
  }

  this.drawLine();
  this.rafId = requestAnimationFrame(this.explosion.bind(this, paramater));
}

Fireworks.prototype.stopAnimation = function () {
  if (this.rafId) {
    window.cancelAnimationFrame(this.rafId);
    this.rafId = undefined;
  }
}


// flower
var Flower = function (ctx, petalNumbers) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.petalNumbers = petalNumbers;
  this.centerX = 150;
  this.centerY = 150;
  this.innerRadius = 30;
  this.outerRadius = 80;
  this.petalRadius = 25;
  this.flowerScale = 1;
  this.flowerMinScale = 1;
  this.flowerMaxScale = 1.2;
  this.scaleVelocity = 0.009;
  this.isScaleAdding = true;
}

Flower.prototype.clear = function () {
  this.ctx.clearRect(0, 0, 300, 300);
}

Flower.prototype.update = function () {
  if (this.isScaleAdding) {
    this.flowerScale += this.scaleVelocity;
  } else {
    this.flowerScale -= this.scaleVelocity;
  }

  if (this.flowerScale > this.flowerMaxScale) {
    this.isScaleAdding = false;
    return 'ToMax';
  }
  if (this.flowerScale < this.flowerMinScale) {
    this.isScaleAdding = true;
    return 'ToMin';
  }

  return '';

}

Flower.prototype.draw = function () {
  var ctx = this.ctx;
  ctx.save();

  // 處理 scale
  var translateX = this.centerX;
  var translateY = this.centerY;
  ctx.translate(translateX, translateY);
  ctx.scale(this.flowerScale, this.flowerScale);

  // 畫 outer
  ctx.fillStyle = '#ec6d45';
  ctx.arc(this.centerX - translateX, this.centerY - translateY, this.outerRadius, 0, Math.PI * 2);
  ctx.fill();

  // 畫花瓣
  var perAdd = 360 / this.petalNumbers;
  for (i = 0; i < 360; i += perAdd) {
    ctx.beginPath();
    const startOffsetX = this.outerRadius * Math.cos((Math.PI / 180) * i);
    const startOffsetY = this.outerRadius * Math.sin((Math.PI / 180) * i);
    ctx.arc(this.centerX + startOffsetX - translateX, this.centerY + startOffsetY - translateY, this.petalRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  // 畫中心
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(this.centerX - translateX, this.centerY - translateY, this.innerRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  ctx.restore();
}

Flower.prototype.bloom = function (bloomTimes) {
  if (bloomTimes === 0) {
    return;
  }

  var paramater;
  this.clear();
  var updateRes = this.update();
  if (bloomTimes === undefined) {
    paramater = undefined;
  }
  else if (bloomTimes && bloomTimes > 0) {
    paramater = updateRes === 'ToMin' ? bloomTimes - 1 : bloomTimes;
  }

  this.draw();
  this.rafId = requestAnimationFrame(this.bloom.bind(this, paramater));
}


function initial() {
  fireworks = new Fireworks(fireworksCtx, 12);
  fireworks.drawLine();

  flower = new Flower(flowerCtx, 12);
  flower.draw();
}


function bindMouseEvent() {
  $(fireworksCanvas).on('mouseenter', function () {
    fireworks.explosion(2);
  });
  $(flowerdCanvas).on('mouseenter', function () {
    flower.bloom(2);
  });
}


// 主程式
initial();
bindMouseEvent();
