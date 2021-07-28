
var fireworks02;
var fireworks02Canvas = $('#fireworks02')[0];
var fireworks02Ctx = fireworks02Canvas.getContext('2d');
fireworks02Canvas.width = 300;
fireworks02Canvas.height = 300;
fireworks02Ctx.imageSmoothingEnabled = true;

var colorfulBall;
var colorfulBallCanvas = $('#colorfulBall')[0];
var colorfulBallCtx = colorfulBallCanvas.getContext('2d');
colorfulBallCanvas.width = 300;
colorfulBallCanvas.height = 300;
colorfulBallCtx.imageSmoothingEnabled = true;

var palette;
var paletteCanvas = $('#palette')[0];
var paletteCtx = paletteCanvas.getContext('2d');
paletteCanvas.width = 300;
paletteCanvas.height = 300;
paletteCtx.imageSmoothingEnabled = true;

var donut;
var donutCanvas = $('#donut')[0];
var donutCtx = donutCanvas.getContext('2d');
donutCanvas.width = 300;
donutCanvas.height = 300;
donutCtx.imageSmoothingEnabled = true;



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

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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

// ColorfulBallItem
var ColorfulBallItem = function (ctx, radius, color = '#111', center) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.centerX = center.x;
  this.centerY = center.y;
  this.radius = radius;
  this.color = color;
}

ColorfulBallItem.prototype.draw = function (isColorRandom) {
  var color = isColorRandom ? randomColor() : this.color;
  var ctx = this.ctx;
  clearCircle(ctx, this.centerX, this.centerY, this.radius + 1);
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

// ColorfulBall
var ColorfulBall = function (ctx, ballNumbers) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.centerX = 150;
  this.centerY = 150;
  this.radius = 140;
  this.ballNumbers = ballNumbers;
  this.itemList = this.initItemList(this.ballNumbers);
  this.changeTimeUnit = 100;

}

ColorfulBall.prototype.initItemList = function (ballNumbers) {
  var itemList = [];
  var unitDegree = 360 / ballNumbers;
  for (let degree = 0; degree < 360; degree += unitDegree) {

    const startOffsetX = this.radius * Math.cos((Math.PI / 180) * degree);
    const startOffsetY = this.radius * Math.sin((Math.PI / 180) * degree);

    const element = new ColorfulBallItem(
      this.ctx,
      10,
      '#ddd',
      {
        x: startOffsetX + this.centerX,
        y: startOffsetY + this.centerY
      }
    );
    itemList.push(element);
  }
  return itemList;
}

ColorfulBall.prototype.draw = function () {

  for (i = 0; i < this.itemList.length; i++) {
    this.itemList[i].draw();
  }
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
  // this.rafId = requestAnimationFrame(this.explosion.bind(this, paramater));
}

ColorfulBall.prototype.updateAndDraw = function (time, isRandomColor) {

  if (this.changeColorIndex === this.itemList.length) {
    this.changeColorIndex = 0;
    return;
  }

  var currentTime = new Date().getTime();
  if (time) {
    const timeGap = currentTime - this.startTime;
    if (timeGap >= this.changeTimeUnit) {
      this.startTime = currentTime;
      this.itemList[this.changeColorIndex].draw(isRandomColor);
      this.changeColorIndex++;
    }
  }
  else {
    this.startTime = currentTime;
    this.changeColorIndex = 0;
  }


  this.rafId = requestAnimationFrame(this.updateAndDraw.bind(this, this.startTime, isRandomColor));
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
  this.originDegree = 45;
}

Palette.prototype.draw = function () {
  // this.ctx.drawImage(this.sourceVirtualCanvas, 0, 0);
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.centerX, this.centerY);

  var unitDegree = 360 / this.colorCollection.length;
  // console.log('unitDegree', unitDegree);

  for (i = 0; i < this.colorCollection.length; i++) {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = this.colorCollection[i];
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, this.radius, convertToPI(i * unitDegree + this.originDegree), convertToPI((i + 1) * unitDegree + this.originDegree));
    ctx.fill();
    ctx.restore();
    ctx.closePath();

  }

  ctx.restore();

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
  if (this.originDegree >= 135) {
    return;
  }

  this.originDegree += this.rotateVelocity;
  this.clear();
  this.draw();

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
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = '#00aedc';

  ctx.arc(150, 150, this.outerRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  clearCircle(ctx, 150, 150, this.innerRadius);
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
  this.clear();
  this.draw();
  if (this.innerRadius > this.innerRadiusRange[1] && isGrow) {
    isGrow = false;
  } else if (this.innerRadius < this.innerRadiusRange[0] && !isGrow) {
    isGrow = true;
  }
  this.rafId = requestAnimationFrame(this.update.bind(this, isGrow));
}

function clearCircle(context, x, y, radius, strokeLineWidth) {
  context.save();
  context.beginPath();
  context.globalCompositeOperation = 'destination-out';
  if (strokeLineWidth) {
    context.lineWidth = strokeLineWidth;
  }
  context.arc(x, y, radius, 0, Math.PI * 2, true);

  if (strokeLineWidth) {
    context.stroke();
  }
  else {
    context.fill();
  }
  context.closePath();
  context.restore();
}




function initial() {
  fireworks02 = new Fireworks(fireworks02Ctx, 16);
  fireworks02.drawLine();

  colorfulBall = new ColorfulBall(colorfulBallCtx, 16);
  colorfulBall.draw();

  palette = new Palette(paletteCtx, ['red', 'blue', 'yellow', 'green', 'pink'], 100);
  palette.draw();

  donut = new Donut(donutCtx);
  donut.draw();
}


function bindMouseEvent() {
  $(fireworks02Canvas).on('mouseenter', function () {
    fireworks02.explosion(2);
  });

  $(paletteCanvas).on('mouseenter', function () {
    // palette.clear();
    // palette.draw();
    // palette.stageAngle = 0;
    // palette.rotateAngle = 90;
    palette.originDegree = 45;
    palette.rotate();
  });
  // setTimeout(() => {
  //   setInterval(() => {
  //     // palette.rotateAngle += 90;
  //     palette.rotate();
  //   }, 3000);
  // }, 2000);


  $(donutCanvas).on('mouseenter', function () {
    donut.innerRadius = 60;
    donut.update(false);
  });

  $(colorfulBallCanvas).on('mouseenter', function () {
    colorfulBall.updateAndDraw(new Date().getTime(), true);
  });

  // $(colorfulBallCanvas).on('mouseleave', function () {
  //   colorfulBall.updateAndDraw(new Date().getTime(), false);
  // });
}



// 主程式
initial();
bindMouseEvent();
