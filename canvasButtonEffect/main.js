var requestId = undefined;
var canvasWidth = 150;
var canvasHeight = 80;
var canvasCenterX = canvasWidth / 2;
var canvasCenterY = canvasHeight / 2;
var numberOfParticles = 100;
var particleList = [];
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomGreenColor() {

  var color = 'rgb(0, green, 0)';
  var randomGreen = Math.floor(Math.random() * 155) + 100;
  return color.replace('green', randomGreen);
}


var Particle = function () {
  this.x = canvasCenterX;
  this.y = canvasCenterY;
  this.opacity = 1;
  this.velocityX = (Math.random() * 2) - 1;
  this.velocityY = (Math.random() * 2) - 1;
  this.velocityOpacity = (Math.random() * 0.1) * -1;
  this.size = Math.random() * 1.5 + 5;
  this.fillColor = getRandomGreenColor();
}

Particle.prototype.update = function () {
  this.x += this.velocityX;
  this.y += this.velocityY;
  this.opacity += this.velocityOpacity;
  if (this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight || this.opacity < 0) {
    this.x = canvasCenterX;
    this.y = canvasCenterY;
    this.opacity = 1;
    this.velocityX = (Math.random() * 2) - 1;
    this.velocityY = (Math.random() * 2) - 1;
    this.velocityOpacity = (Math.random() * 0.1) * -1;
    this.size = Math.random() * 1.5 + 5;
    this.fillColor = getRandomGreenColor();
  }
}

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.save();
  ctx.globalAlpha = this.opacity;
  // ctx.fillStyle = this.fillColor;
  // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  // ctx.fill();

  ctx.strokeStyle = this.fillColor;
  ctx.strokeRect(this.x, this.y, this.size * 1.5, this.size * 1.5);


  ctx.restore();
}

function initial() {
  particleList = [];
  for (var i = 0; i < numberOfParticles; i++) {
    particleList.push(new Particle());
  }
}

function animate() {
  requestId = undefined;
  if (!requestId) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < particleList.length; i++) {
      particleList[i].update();
      particleList[i].draw();
    }

    requestId = window.requestAnimationFrame(animate);
  }
}

function stopAnimate() {

  if (requestId) {
    window.cancelAnimationFrame(requestId);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    requestId = undefined;
  }

}

var bindButtonEvent = function () {
  $('.button-container__btn').on('mouseenter', function () {
    initial();
    animate();
  })

  $('.button-container__btn').on('mouseleave', function () {
    stopAnimate();
  });
}

bindButtonEvent();