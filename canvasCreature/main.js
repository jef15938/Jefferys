var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var canvas = $('#creature')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var cuteCreature;

// ES5 Class
var Creature = function () {

  this.size = 100;
  this.whiteEyesSize = 20;
  this.blackEyesSize = 10;
  this.mouseSize = 6;

  this.centerX = canvasWidth / 2;
  this.centerY = canvasHeight / 2;
  this.leftEyesCenterX = canvasWidth / 2 - this.size / 2;
  this.leftEyesCenterY = canvasHeight / 2 - this.size / 3;
  this.rightEyesCenterX = canvasWidth / 2 + this.size / 2;
  this.rightEyesCenterY = canvasHeight / 2 - this.size / 3;

  this.mouseCenterX = canvasWidth / 2;
  this.mouseCenterY = canvasHeight / 2 + this.size / 2;
}

Creature.prototype.draw = function () {

  // body
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(canvasWidth / 2, canvasHeight / 2, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();




  // mouse
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(this.mouseCenterX, this.mouseCenterY, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();



  ctx.restore();
}


Creature.prototype.drawEyes = function () {
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(this.leftEyesCenterX, this.leftEyesCenterY, this.whiteEyesSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(this.rightEyesCenterX, this.rightEyesCenterY, this.whiteEyesSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();


  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(this.leftEyesCenterX, this.leftEyesCenterY, this.blackEyesSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(this.rightEyesCenterX, this.rightEyesCenterY, this.blackEyesSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

}



Creature.prototype.drawHair = function (rotateHairAngle) {

  ctx.save();

  ctx.strokeStyle = 'black';
  ctx.lineCap = "round";
  ctx.beginPath();

  for (i = 0; i < 360; i += 8) {
    ctx.strokeStyle = 'black';
    ctx.lineCap = "round";
    const startOffsetX = 100 * Math.cos((Math.PI / 180) * i + rotateHairAngle);
    const startOffsetY = 100 * Math.sin((Math.PI / 180) * i + rotateHairAngle);

    const endOffsetX = 120 * Math.cos((Math.PI / 180) * i);
    const endOffsetY = 120 * Math.sin((Math.PI / 180) * i);

    ctx.lineWidth = 5;
    ctx.moveTo(canvasWidth / 2 + startOffsetX, canvasHeight / 2 + startOffsetY);
    ctx.lineTo(canvasWidth / 2 + endOffsetX, canvasHeight / 2 + endOffsetY);
  }


  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}


Creature.prototype.blink = function () {

  return new Promise((res, rej) => {

    // 閉全眼
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.leftEyesCenterX, this.leftEyesCenterY, this.whiteEyesSize + 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(this.rightEyesCenterX, this.rightEyesCenterY, this.whiteEyesSize + 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.leftEyesCenterX, this.leftEyesCenterY, this.whiteEyesSize + 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(this.rightEyesCenterX, this.rightEyesCenterY, this.whiteEyesSize + 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();


    setTimeout(() => {
      this.drawEyes();
      res();
    }, 300);



  })



}

// 初始化
function initial() {

  animateHair();

}

var angle = 0;
var addMode = true;
function animateHair() {

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  if (addMode) {
    angle += 0.05;
  }
  else {
    angle -= 0.05;
  }

  if (angle > 1) {
    addMode = false;
  }

  if (angle === 0) {
    addMode = true;
  }

  cuteCreature = new Creature();
  cuteCreature.drawHair(angle);
  cuteCreature.draw();
  cuteCreature.drawEyes();


  window.requestAnimationFrame(animateHair);

}

// 主程式
initial();

bindMouseEvent();


function bindMouseEvent() {
  $(canvas).on('mousemove', function (e) {
    console.log(e);
  })
}