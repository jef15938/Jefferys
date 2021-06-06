var canvasWidth = 500;
var canvasHeight = 500;
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var requestAnimationFrame = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }
);
var $d = $.Deferred();

var backgroundAngle = 0;
var gradient = ctx.createConicalGradient(canvasWidth / 2, canvasHeight / 2, -Math.PI, Math.PI);
gradient.addColorStop(0, '#FF0000');
gradient.addColorStop(0.9, 'white');
gradient.addColorStop(1, '#FF0000');
var filterImage = null;


function animate() {

  // 60 ~ 180, 240 ~ 360 要旋轉加快
  if (
    (backgroundAngle >= 60 && backgroundAngle <= 180) ||
    (backgroundAngle >= 240 && backgroundAngle <= 360)
  ) {
    backgroundAngle += 12;
  }
  else {
    backgroundAngle += 5;
  }

  // 旋轉超過 360, 歸 0
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

  // 新光 logo image
  ctx.drawImage(filterImage, 0, 159, 500, 189);

  // 將 canvas 非 logo 區塊用白色擋住
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, 159);
  ctx.fillRect(0, 348, canvasWidth, 500);

  requestAnimationFrame(animate);
}

function initial() {

  // 拿到新光 logo 圖片, 存在本地
  fetchImage(500, 189, './exclude.png').done(function (res) {
    filterImage = res;
    animate();
  });
}

// 拿到圖片, return image
function fetchImage(imageWidth, imageHeight, imageSrc) {
  var image = new Image(imageWidth, imageHeight);
  image.onload = drawImageActualSize;

  image.src = imageSrc;

  function drawImageActualSize() {

    $d.resolve(image);
  }

  return $d.promise();
}

// 主程式
initial();

