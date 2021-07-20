
var fireworks02;
var fireworks02Canvas = $('#fireworks02')[0];
var fireworks02Ctx = fireworks02Canvas.getContext('2d');
fireworks02Canvas.width = 300;
fireworks02Canvas.height = 300;

var colorfulBall;
var colorfulBallCanvas = $('#colorfulBall')[0];
var colorfulBallCtx = colorfulBallCanvas.getContext('2d');
colorfulBallCanvas.width = 300;
colorfulBallCanvas.height = 300;

var palette;
var paletteCanvas = $('#palette')[0];
var paletteCtx = paletteCanvas.getContext('2d');
paletteCanvas.width = 300;
paletteCanvas.height = 300;

var donut;
var donutCanvas = $('#donut')[0];
var donutCtx = donutCanvas.getContext('2d');
donutCanvas.width = 300;
donutCanvas.height = 300;



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

function convertToPI(degree) {
  return degree * Math.PI / 180;
}

// fireworks
var Fireworks = function (ctx, lineNumbers) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.lineNumbers = lineNumbers;
  this.centerX = 150;
  this.centerY = 150;
  this.lineFromRadius = 15
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

  ctx.fillStyle = '#eeeee8';
  ctx.beginPath();
  ctx.arc(this.centerX, this.centerY, this.lineFromRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
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


// ColorfulBall
var ColorfulBall = function (ctx, ballNumbers, ballColor = '') {

  this.rafId = undefined;
  this.ctx = ctx;
  this.ballNumbers = ballNumbers;
  this.centerX = 150;
  this.centerY = 150;
  this.outerRadius = 140;
  this.ballRadius = 10;
  this.isBallColorRandom = ballColor === '';
  this.ballColor = ballColor;
}

ColorfulBall.prototype.draw = function () {
  var ctx = this.ctx;

  ctx.translate(this.centerX, this.centerY);
  ctx.save();
  ctx.strokeStyle = '#eeeee8';
  ctx.beginPath();

  var unitDegree = 360 / this.ballNumbers;

  for (i = 0; i < 360; i += unitDegree) {

    const offsetX = (this.outerRadius - this.ballRadius) * Math.cos(convertToPI(i));
    const offsetY = (this.outerRadius - this.ballRadius) * Math.sin(convertToPI(i));

    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = '#eeeee8';
    ctx.arc(offsetX, offsetY, this.ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.closePath();

  }

  ctx.restore();
}

ColorfulBall.prototype.clear = function () {
  this.ctx.clearRect(0, 0, 300, 300);
}

ColorfulBall.prototype.changeColor = function (i, color) {
  var ctx = this.ctx;
  // const i = (360 / this.ballNumbers) * index;
  const offsetX = (this.outerRadius - this.ballRadius) * Math.cos(convertToPI(i));
  const offsetY = (this.outerRadius - this.ballRadius) * Math.sin(convertToPI(i));

  ctx.beginPath();
  ctx.save();
  ctx.fillStyle = color;
  ctx.arc(offsetX, offsetY, this.ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.closePath();


  this.draw();
  this.rafId = requestAnimationFrame(this.explosion.bind(this, paramater));
}

ColorfulBall.prototype.stopAnimation = function () {
  if (this.rafId) {
    window.cancelAnimationFrame(this.rafId);
    this.rafId = undefined;
  }
}


// Palette
var Palette = function (ctx, colorCollection, radius) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.colorCollection = colorCollection;
  this.centerX = 150;
  this.centerY = 150;
  this.radius = radius;
  this.rotateVelocity = 2;
  this.sourceVirtualCanvas = this.getSourceVirtualCanvas();
  this.stageAngle = 0;
  this.rotateAngle = 90;
}

Palette.prototype.draw = function () {
  this.ctx.drawImage(this.sourceVirtualCanvas, 0, 0);
}

Palette.prototype.getSourceVirtualCanvas = function () {

  var virtualCanvas = document.createElement('canvas');
  var virtualCanvasCtx = virtualCanvas.getContext('2d');
  virtualCanvas.width = 300;
  virtualCanvas.height = 300;
  var ctx = virtualCanvasCtx;
  ctx.translate(this.centerX, this.centerY);
  ctx.save();

  var unitDegree = 360 / this.colorCollection.length;
  // console.log('unitDegree', unitDegree);

  for (i = 0; i < this.colorCollection.length; i++) {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = this.colorCollection[i];
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, this.radius, convertToPI(i * unitDegree + 45), convertToPI((i + 1) * unitDegree + 45));
    ctx.fill();
    ctx.restore();
    ctx.closePath();

  }

  ctx.restore();

  return virtualCanvas;
}

Palette.prototype.clear = function () {
  this.ctx.clearRect(0, 0, 300, 300);
}

Palette.prototype.stopAnimation = function () {
  if (this.rafId) {
    window.cancelAnimationFrame(this.rafId);
    this.rafId = undefined;
  }
}

Palette.prototype.rotate = function () {
  // console.log('into rotate', this.rotateAngle, this.stageAngle);

  if (this.rotateAngle === 0 || Math.abs(this.rotateAngle) < Math.abs(this.stageAngle)) {
    return;
  }

  // console.log(this.rotateAngle, this.stageAngle);
  if (this.stageAngle === undefined) {
    this.stageAngle = 0;
  }

  this.ctx.save();
  var paramater;
  var translateX = this.centerX;
  var translateY = this.centerY;
  this.ctx.translate(translateX, translateY);
  this.ctx.rotate(Math.PI / 180 * this.stageAngle);
  this.clear();
  this.ctx.drawImage(this.sourceVirtualCanvas, -translateX, -translateY);

  this.ctx.restore();


  if (this.rotateAngle > 0) {
    paramater = this.stageAngle + this.rotateVelocity;
  }
  else if (this.rotateAngle < 0) {
    paramater = this.stageAngle - this.rotateVelocity;
  }
  this.stageAngle = paramater;

  this.rafId = requestAnimationFrame(this.rotate.bind(this));
}

// Donut
var Donut = function (ctx) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.centerX = 150;
  this.centerY = 150;
  this.innerRadius = 60;
  this.outerRadius = 80;
  this.innerRadiusRange = [40, 60];
  this.velocity = 0.5;
}

Donut.prototype.draw = function () {
  var ctx = this.ctx;
  ctx.beginPath();
  ctx.fillStyle = '#00aedc';
  ctx.translate(this.centerX, this.centerY);

  ctx.arc(0, 0, this.outerRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.save();
  ctx.fillStyle = 'white';
  ctx.arc(0, 0, this.innerRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.translate(-this.centerX, -this.centerY);
}

Donut.prototype.clear = function () {
  this.ctx.clearRect(0, 0, 300, 300);
}

Donut.prototype.stopAnimation = function () {
  if (this.rafId) {
    window.cancelAnimationFrame(this.rafId);
    this.rafId = undefined;
  }
}

Donut.prototype.update = function (isGrow) {
  if (isGrow) {
    return;
  }
  if (isGrow) {
    this.innerRadius += this.velocity;
  } else {
    this.innerRadius -= this.velocity;
  }
  this.draw();
  if (this.innerRadius > this.innerRadiusRange[1] && isGrow) {
    isGrow = false;
  } else if (this.innerRadius < this.innerRadiusRange[0] && !isGrow) {
    isGrow = true;
  }
  this.rafId = requestAnimationFrame(this.update.bind(this, isGrow));
}




function initial() {
  fireworks02 = new Fireworks(fireworks02Ctx, 16);
  fireworks02.drawLine();

  // colorfulBall = new ColorfulBall(colorfulBallCtx, 16);
  // colorfulBall.draw();

  palette = new Palette(paletteCtx, ['red', 'blue', 'yellow', 'green'], 100);
  palette.draw();

  donut = new Donut(donutCtx);
  donut.draw();
}


function bindMouseEvent() {
  $(fireworks02Canvas).on('mouseenter', function () {
    fireworks02.explosion(2);
  });

  $(paletteCanvas).on('mouseenter', function () {
    palette.clear();
    palette.draw();
    palette.stageAngle = 0;
    palette.rotateAngle = 90;
    palette.rotate();
  });
  setTimeout(() => {
    setInterval(() => {
      palette.rotateAngle += 90;
      palette.rotate();
    }, 3000);
  }, 2000);


  $(donutCanvas).on('mouseenter', function () {
    donut.innerRadius = 60;
    donut.update(false);
  });

  // $(colorfulBallCanvas).on('mouseenter', function () {
  //   console.log('1111111');
  //   var unitDegree = 360 / this.ballNumbers;

  //   for (i = 0; i < 360; i += unitDegree) {
  //     // setTimeout(() => {
  //     colorfulBall.changeColor(i, '#000');
  //     // }, 300);
  //   }
  // });
}


// 主程式
initial();
bindMouseEvent();
