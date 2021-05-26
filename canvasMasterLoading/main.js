
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
var canvasHeight = 300;
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var triangleList = [];
var triangleNumber = 10;

var point1A = new Coordinate(-3000 - 250, -50 - 150);
var point1B = new Coordinate(5000 - 250, -50 - 150);
var point1C = new Coordinate(250 - 250, 150 - 150);

var point2A = new Coordinate(-2000 - 250, -50 - 150);
var point2B = new Coordinate(4000 - 250, -50 - 150);
var point2C = new Coordinate(250 - 250, 150 - 150);

var point3A = new Coordinate(-1500 - 250, -50 - 150);
var point3B = new Coordinate(3500 - 250, -50 - 150);
var point3C = new Coordinate(250 - 250, 150 - 150);

var point4A = new Coordinate(-1000 - 250, -50 - 150);
var point4B = new Coordinate(3000 - 250, -50 - 150);
var point4C = new Coordinate(250 - 250, 150 - 150);

var point5A = new Coordinate(-500 - 250, -50 - 150);
var point5B = new Coordinate(2500 - 250, -50 - 150);
var point5C = new Coordinate(250 - 250, 150 - 150);


var point6A = new Coordinate(0 - 250, -50 - 150);
var point6B = new Coordinate(1200 - 250, -50 - 150);
var point6C = new Coordinate(250 - 250, 150 - 150);

var point7A = new Coordinate(100 - 250, -50 - 150);
var point7B = new Coordinate(1100 - 250, -50 - 150);
var point7C = new Coordinate(250 - 250, 150 - 150);

var point8A = new Coordinate(200 - 250, -50 - 150);
var point8B = new Coordinate(1000 - 250, -50 - 150);
var point8C = new Coordinate(250 - 250, 150 - 150);

var point9A = new Coordinate(400 - 250, -50 - 150);
var point9B = new Coordinate(900 - 250, -50 - 150);
var point9C = new Coordinate(250 - 250, 150 - 150);

var point10A = new Coordinate(500 - 250, -50 - 150);
var point10B = new Coordinate(800 - 250, -50 - 150);
var point10C = new Coordinate(250 - 250, 150 - 150);

var trangleRotateAngle = 0;
var trangleRotateSpeed = 8;


function animate() {
  trangleRotateAngle += trangleRotateSpeed;
  trangleRotateAngle = trangleRotateAngle % 360;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  fillEllipse(ctx, 250, 150, 200, 80, '#e31d1a');

  fillTriange(ctx, point1A, point1B, point1C, 'rgba(255, 255, 255, 0.05)', trangleRotateAngle);
  fillTriange(ctx, point2A, point2B, point2C, 'rgba(255, 255, 255, 0.1)', trangleRotateAngle);
  fillTriange(ctx, point3A, point3B, point3C, 'rgba(255, 255, 255, 0.2)', trangleRotateAngle);
  fillTriange(ctx, point4A, point4B, point4C, 'rgba(255, 255, 255, 0.2)', trangleRotateAngle);
  fillTriange(ctx, point5A, point5B, point5C, 'rgba(255, 255, 255, 0.2)', trangleRotateAngle);
  fillTriange(ctx, point6A, point6B, point6C, 'rgba(255, 255, 255, 0.2)', trangleRotateAngle);
  fillTriange(ctx, point7A, point7B, point7C, 'rgba(255, 255, 255, 0.2)', trangleRotateAngle);
  fillTriange(ctx, point8A, point8B, point8C, 'rgba(255, 255, 255, 0.2)', trangleRotateAngle);
  fillTriange(ctx, point9A, point9B, point9C, 'rgba(255, 255, 255, 0.2)', trangleRotateAngle);
  fillTriange(ctx, point10A, point10B, point10C, 'rgba(255, 255, 255, 0.5)', trangleRotateAngle);

  fillEllipse(ctx, 250, 150, 100, 65, 'white');

  window.requestAnimationFrame(animate);
}

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
