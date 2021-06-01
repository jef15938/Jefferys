var canvasWidth = 500;
var canvasHeight = 100;

var Rectangle = function (x, y, width, height, fillStyle, strokeStyle, lineWidth, velocity) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fillStyle = fillStyle;
  this.strokeStyle = strokeStyle;
  this.lineWidth = lineWidth;
  this.velocity = velocity;
}

Rectangle.prototype.update = function () {
  this.x += this.velocity;
  if (this.x > canvasWidth) {
    this.x = this.width * -1;
  }
}

Rectangle.prototype.draw = function (context) {
  // 4. Draw grahpics.
  context.fillStyle = this.fillStyle;
  context.fillRect(this.x, this.y, this.width, this.height);

  context.strokeStyle = this.strokeStyle;
  context.lineWidth = this.lineWidth;
  context.strokeRect(this.x, this.y, this.width, this.height);
}


var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var rectangleList = [];

function initial() {
  rectangleList.push(new Rectangle(0, 35, 100, 30, '#F8FA15', '#F8FA15', 1, 3));
  rectangleList.push(new Rectangle(200, 35, 100, 30, '#F8FA15', '#F8FA15', 1, 3));
  rectangleList.push(new Rectangle(400, 35, 100, 30, '#F8FA15', '#F8FA15', 1, 3));
}
function animate() {

  ctx.fillStyle = '#7F7F7F';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  for (var i = 0; i < rectangleList.length; i++) {
    rectangleList[i].update();
    rectangleList[i].draw(ctx);
  }

  window.requestAnimationFrame(animate);


}

initial();
animate();
