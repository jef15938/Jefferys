var request1Id = undefined;
var request2Id = undefined;
var canvasWidth = 150;
var canvasHeight = 80;
var canvasCenterX = canvasWidth / 2;
var canvasCenterY = canvasHeight / 2;
var numberOfParticles = 100;
var particle1List = [];
var particle2List = [];
var canvas1 = $('.button1-container__canvas')[0];
var canvas2 = $('.button2-container__canvas')[0];
var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');

canvas1.width = canvasWidth;
canvas1.height = canvasHeight;
canvas2.width = canvasWidth;
canvas2.height = canvasHeight;

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

function getRandomRedColor() {

  var color = 'rgb(red, 0, 0)';
  var randomRed = Math.floor(Math.random() * 155) + 100;
  return color.replace('red', randomRed);
}


var Particle = function (context, fillColor) {
  this.context = context;
  this.initial(fillColor);
}

Particle.prototype.initial = function (fillColor) {
  this.x = canvasCenterX;
  this.y = canvasCenterY;
  this.opacity = 1;
  this.velocityX = (Math.random() * 2) - 1;
  this.velocityY = (Math.random() * 2) - 1;
  this.velocityOpacity = (Math.random() * 0.1) * -1;
  this.size = Math.random() * 1.5 + 5;
  this.fillColor = fillColor;
}

Particle.prototype.update = function () {
  this.x += this.velocityX;
  this.y += this.velocityY;
  this.opacity += this.velocityOpacity;
  if (this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight || this.opacity < 0) {
    this.initial(this.fillColor);
  }
}

Particle.prototype.drawCircle = function () {
  this.context.save();

  this.context.beginPath();
  this.context.globalAlpha = this.opacity;
  this.context.fillStyle = this.fillColor;
  this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  this.context.fill();

  this.context.restore();
}

Particle.prototype.drawRectangle = function () {
  this.context.save();

  this.context.beginPath();
  this.context.save();
  this.context.globalAlpha = this.opacity;
  this.context.strokeStyle = this.fillColor;
  this.context.strokeRect(this.x, this.y, this.size * 1.5, this.size * 1.5);

  this.context.restore();
}

function initial1() {
  particle1List = [];
  for (var i = 0; i < numberOfParticles; i++) {
    const randomGreen = getRandomGreenColor();
    particle1List.push(new Particle(ctx1, randomGreen));
  }
}

function animate1() {
  request1Id = undefined;
  if (!request1Id) {
    ctx1.fillStyle = 'white';
    ctx1.fillRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < particle1List.length; i++) {
      particle1List[i].update();
      particle1List[i].drawCircle();
    }

    request1Id = window.requestAnimationFrame(animate1);
  }
}

function stopAnimate1() {

  if (request1Id) {
    window.cancelAnimationFrame(request1Id);
    ctx1.fillStyle = 'white';
    ctx1.fillRect(0, 0, canvasWidth, canvasHeight);
    request1Id = undefined;
  }

}

var bindButton1Event = function () {
  $('.button1-container__btn').on('mouseenter', function () {
    initial1();
    animate1();
  })

  $('.button1-container__btn').on('mouseleave', function () {
    stopAnimate1();
  });
}



function initial2() {
  particle2List = [];
  for (var i = 0; i < numberOfParticles; i++) {
    const randomRed = getRandomRedColor();
    particle2List.push(new Particle(ctx2, randomRed));
  }
}

function animate2() {
  request2Id = undefined;
  if (!request2Id) {
    ctx2.fillStyle = 'white';
    ctx2.fillRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < particle2List.length; i++) {
      particle2List[i].update();
      particle2List[i].drawRectangle();
    }

    request2Id = window.requestAnimationFrame(animate2);
  }
}

function stopAnimate2() {

  if (request2Id) {
    window.cancelAnimationFrame(request2Id);
    ctx2.fillStyle = 'white';
    ctx2.fillRect(0, 0, canvasWidth, canvasHeight);
    request2Id = undefined;
  }

}

var bindButton2Event = function () {
  $('.button2-container__btn').on('mouseenter', function () {
    initial2();
    animate2();
  })

  $('.button2-container__btn').on('mouseleave', function () {
    stopAnimate2();
  });
}

bindButton1Event();
bindButton2Event();