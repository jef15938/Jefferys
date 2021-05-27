
var Coordinate = function (x, y) {
  this.x = x;
  this.y = y;
}

var Triangele = function (pointA, pointB, pointC, fillStyle) {
  this.pointA = pointA;
  this.pointB = pointB;
  this.pointC = pointC;
  this.fillStyle = fillStyle;
}


var canvasWidth = 500;
var canvasHeight = 500;
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var triangleList = [];
var triangleNumber = 10;


var trangleRotateAngle = 0;
var trangleRotateSpeed = 8;
var showOne = true;
var count = 0;

var carHead = null;
var carBody = null;
var carWheel1 = null;
var carWheel2 = null;

function CarBody(
  startX,
  endX,
  startY,
  endY,
  startWidth,
  endWidth,
  startHeight,
  endHeight
) {
  this.frameNumber = 20;
  this.startX = startX;
  this.endX = endX;
  this.startY = startY;
  this.endY = endY;
  this.startWidth = startWidth;
  this.endWidth = endWidth;
  this.startHeight = startHeight;
  this.endHeight = endHeight;
  this.strokeStyle = 'black';
  this.isStartToEndMode = true;

  this.x = this.startX;
  this.y = this.startY;
  this.width = this.startWidth;
  this.height = this.startHeight;

  this.differenceX = (this.startX - this.endX) / this.frameNumber;
  this.differenceY = (this.startY - this.endY) / this.frameNumber;
  this.differenceWidth = (this.startWidth - this.endWidth) / this.frameNumber;
  this.differenceHeight = (this.startHeight - this.endHeight) / this.frameNumber;

}

CarBody.prototype.initial = function () {
  strokeRect(ctx, this.startX, this.startY, this.startWidth, this.endHeight, this.strokeStyle, 3);
}

CarBody.prototype.update = function () {
  if (this.x >= this.startX) {
    this.isStartToEndMode = true;
  }
  if (this.x <= this.endX) {
    this.isStartToEndMode = false;
  }

  if (this.isStartToEndMode) {
    this.x = this.x - this.differenceX;
    this.y = this.y - this.differenceY;
    this.width = this.width - this.differenceWidth;
    this.height = this.height - this.differenceHeight;
  }
  else {
    this.x = this.x + this.differenceX;
    this.y = this.y + this.differenceY;
    this.width = this.width + this.differenceWidth;
    this.height = this.height + this.differenceHeight;
  }

}

CarBody.prototype.draw = function () {
  strokeRect(ctx, this.x, this.y, this.width, this.height, this.strokeStyle, 3);
}



function CarWheel(
  startX,
  endX,
  startY,
  endY,
  startRadius,
  endRadius
) {
  this.frameNumber = 20;
  this.startX = startX;
  this.endX = endX;
  this.startY = startY;
  this.endY = endY;
  this.startRadius = startRadius;
  this.endRadius = endRadius;
  this.strokeStyle = 'black';
  this.isStartToEndMode = true;

  this.x = this.startX;
  this.y = this.startY;
  this.radius = this.startRadius;

  this.differenceX = (this.startX - this.endX) / this.frameNumber;
  this.differenceY = (this.startY - this.endY) / this.frameNumber;
  this.differenceRadius = (this.startRadius - this.endRadius) / this.frameNumber;

}

CarWheel.prototype.initial = function () {
  strokeCircle(ctx, this.startX, this.startY, this.startRadius, this.strokeStyle, 3);
}

CarWheel.prototype.update = function () {
  if (this.radius >= this.startRadius) {
    this.isStartToEndMode = true;
  }
  if (this.radius <= this.endRadius) {
    this.isStartToEndMode = false;
  }

  if (this.isStartToEndMode) {
    this.x = this.x - this.differenceX;
    this.y = this.y - this.differenceY;
    this.radius = this.radius - this.differenceRadius;
  }
  else {
    this.x = this.x + this.differenceX;
    this.y = this.y + this.differenceY;
    this.radius = this.radius + this.differenceRadius;
  }

}

CarWheel.prototype.draw = function () {
  strokeCircle(ctx, this.x, this.y, this.radius, this.strokeStyle, 3);
}

function initial() {
  carHead = new CarBody(
    100,
    90,
    100,
    120,
    50,
    70,
    50,
    50
  );

  carBody = new CarBody(
    75,
    60,
    160,
    170,
    100,
    130,
    50,
    50
  );

  cardWheel1 = new CarWheel(
    100,
    100,
    225,
    230,
    15,
    10
  );

  cardWheel2 = new CarWheel(
    150,
    150,
    225,
    230,
    15,
    10
  );


  carHead.initial();
  carBody.initial();
  cardWheel1.initial();
  cardWheel2.initial();

}
function animate() {



  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  carHead.update();
  carHead.draw();

  carBody.update();
  carBody.draw();


  cardWheel1.update();
  cardWheel1.draw();


  cardWheel2.update();
  cardWheel2.draw();

  window.requestAnimationFrame(animate);


}

initial();
animate();

function fillEllipse(context, x, y, a, b, fillStyle) {
  context.save();
  var r = (a > b) ? a : b;
  var ratioX = a / r;
  var ratioY = b / r;
  context.scale(ratioX, ratioY);
  context.beginPath();
  context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false);
  context.fillStyle = fillStyle;
  context.closePath();
  context.fill();
  context.restore();
}

function fillCircle(context, x, y, radius, fillStyle) {
  context.save();
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fillStyle = fillStyle;
  context.closePath();
  context.fill();
  context.restore();
}

function strokeCircle(context, x, y, radius, strokeStyle, lineWidth) {
  context.save();
  context.beginPath();
  context.strokeStyle = strokeStyle;
  context.lineWidth = lineWidth;
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.closePath();
  context.stroke();
  context.restore();
}

function fillRect(context, x, y, width, height, fillStyle) {
  context.save();
  context.fillStyle = fillStyle;
  context.fillRect(x, y, width, height);
  context.restore();
}

function strokeRect(context, x, y, width, height, strokeStyle, lineWidth) {
  context.save();
  context.strokeStyle = strokeStyle;
  context.lineWidth = lineWidth;
  context.strokeRect(x, y, width, height);

  context.restore();
}


function fillTriange(context, pointA, pointB, pointC, fillStyle, rotateAngle) {
  context.save();
  var path = new Path2D();
  path.moveTo(pointA.x, pointA.y);
  path.lineTo(pointB.x, pointB.y);
  path.lineTo(pointC.x, pointC.y);
  path.lineTo(pointA.x, pointA.y);
  context.fillStyle = fillStyle;

  context.setTransform(1, 0, 0, 1, 250, 150);
  context.rotate(rotateAngle * Math.PI / 180);
  context.opacity
  context.fill(path);
  context.restore();

}
