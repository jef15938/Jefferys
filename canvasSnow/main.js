var canvasWidth = 1920;
var canvasHeight = 1080;
var numberOfParticles = 1000;
var particleList = [];
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;


var Particle = function () {
  this.x = Math.random() * canvasWidth;
  this.y = Math.random() * canvasHeight;
  this.velocity = Math.random() * 3.5 + 0.5;
  this.size = Math.random() * 3.5 + 1;
}

Particle.prototype.update = function () {
  this.y += this.velocity;
  if (this.y > canvasHeight) {
    this.y = 0;
    this.x = Math.random() * canvasWidth;
  }
}

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
}

function initial() {
  for (var i = 0; i < numberOfParticles; i++) {
    particleList.push(new Particle());
  }

  console.log(particleList);
}

function animate() {
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  for (var i = 0; i < particleList.length; i++) {
    particleList[i].update();
    particleList[i].draw();
  }

  window.requestAnimationFrame(animate);
}

initial();
animate();