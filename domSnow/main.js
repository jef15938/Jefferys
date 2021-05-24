var canvasWidth = 1920;
var canvasHeight = 1080;
var numberOfParticles = 1000;
var particleList = [];

// class Particle
/*
class Particle {
  constructor() {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.velocity = Math.random() * 3.5;
    this.size = Math.random() * 3.5 + 1;
  }
  
  update() {
    this.y += this.velocity;
    if(this.y > canvasHeight) {
      this.y = 0;
      this.x = Math.random() * canvasWidth;
    }
  }
  
  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  
}
*/
// class Particle end

// for ie support class
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Particle = /*#__PURE__*/function () {
  function Particle() {
    _classCallCheck(this, Particle);

    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.velocity = Math.random() * 3.5 + 0.5;
    this.size = Math.random() * 3.5 + 1;
  }

  _createClass(Particle, [{
    key: "update",
    value: function update() {
      this.y += this.velocity;

      if (this.y > canvasHeight) {
        this.y = 0;
        this.x = Math.random() * canvasWidth;
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      // ctx.beginPath();
      // ctx.fillStyle = 'white';
      // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      // ctx.fill();
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
  }]);

  return Particle;
}();
// for ie support class end

function initial() {
  for (var i = 0; i < numberOfParticles; i++) {
    particleList.push(new Particle());
  }

  console.log(particleList);
}

function animate() {
  // ctx.globalAlpha = 1;
  // ctx.fillStyle = 'rgb(0, 0, 0)';
  // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  $(document.body).empty();
  for (var i = 0; i < particleList.length; i++) {
    particleList[i].update();
    particleList[i].draw();
  }

  window.requestAnimationFrame(animate);
}

initial();
animate();
