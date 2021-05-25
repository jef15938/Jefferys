var canvasWidth = 1920;
var canvasHeight = 1080;
var numberOfParticles = 1000;
var particleList = [];

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
  const snow = document.createElement('div');
  snow.style.background = 'white';
  snow.style.width = this.size * 2 + 'px';
  snow.style.height = this.size * 2 + 'px';
  snow.style.transform = 'translate(' + this.x + 'px, ' + this.y + 'px)';
  snow.style.borderRadius = '50%';
  snow.style.position = 'absolute';
  snow.style.left = '0px';
  snow.style.top = '0px';
  document.body.appendChild(snow);
}

function initial() {
  for (var i = 0; i < numberOfParticles; i++) {
    particleList.push(new Particle());
  }
}

function animate() {

  $(document.body).empty();
  for (var i = 0; i < particleList.length; i++) {
    particleList[i].update();
    particleList[i].draw();
  }

  window.requestAnimationFrame(animate);
}

initial();
animate();
