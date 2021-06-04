var canvasWidth = 500;
var canvasHeight = 500;
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var $d = $.Deferred();

var backgroundAngle = 0;
var gradient = ctx.createConicalGradient(canvasWidth / 2, canvasHeight / 2, -Math.PI, Math.PI);
gradient.addColorStop(0, '#FF0000');
gradient.addColorStop(0.9, 'white');
gradient.addColorStop(1, '#FF0000');
var filterImage = null;


function animate() {


  backgroundAngle += 5;

  // 60 ~ 180
  // 240 ~ 360
  if (backgroundAngle >= 60 && backgroundAngle <= 180) {
    backgroundAngle += 8;
  }
  else if (backgroundAngle >= 240 && backgroundAngle <= 360) {
    backgroundAngle += 8;
  }

  if (backgroundAngle >= 360) {
    backgroundAngle = 0;
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 紅色漸層
  ctx.save();
  ctx.fillStyle = gradient.pattern;

  ctx.translate(canvasWidth / 2, canvasHeight / 2);
  ctx.rotate(backgroundAngle * Math.PI / 180);
  ctx.translate(-(canvasWidth / 2), -(canvasHeight / 2));
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.restore();


  // 中間白色圓圈
  fillEllipse2(ctx, canvasWidth / 2, canvasHeight / 2, 120, 65, 'white');

  ctx.drawImage(filterImage, 0, 159, 500, 189);


  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, 159);
  ctx.fillRect(0, 348, canvasWidth, 500);

  window.requestAnimationFrame(animate);
}

initial();

function initial() {

  // fetchImage
  fetchImage(500, 189, './exclude.png').done(function (res) {
    filterImage = res;
    animate();
  });
}

function fillEllipse2(context, x, y, a, b, fillStyle) {
  const step = (a > b) ? 1 / a : 1 / b;
  context.beginPath();
  context.moveTo(x + a, y);
  for (let i = 0; i < 2 * Math.PI; i += step) {
    context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
  }
  context.closePath();
  ctx.fillStyle = fillStyle;
  context.fill();
}

function fetchImage(imageWidth, imageHeight, imageSrc) {
  var image = new Image(imageWidth, imageHeight); // Using optional size for image
  image.onload = drawImageActualSize; // Draw when image has loaded

  // Load an image of intrinsic size 300x227 in CSS pixels
  image.src = imageSrc;

  function drawImageActualSize() {

    $d.resolve(image);
  }

  return $d.promise();
}

