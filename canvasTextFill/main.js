var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var topX = 0;
var bottomX = 50;
var backGroundCanvas = $('.background-canvas')[0];
var bgCtx = backGroundCanvas.getContext("2d");
var textCanvas = $('.text-canvas')[0];
var textCtx = textCanvas.getContext("2d");
var speed = 15;
var fillColor = 'black';
var lastDraw = false;
backGroundCanvas.width = canvasWidth;
backGroundCanvas.height = canvasHeight;
textCanvas.width = canvasWidth;
textCanvas.height = canvasHeight;
function drawBackground() {
  if ((topX > canvasWidth && bottomX > canvasWidth) || lastDraw) {
    if (fillColor === 'black') {
      fillColor = 'white';
      topX = 0;
      bottomX = 50;
      lastDraw = false;
    }
    else {
      return;
    }
  }
  else if (topX === canvasWidth && bottomX === canvasWidth) {
    lastDraw = true;
  }
  var path = new Path2D();
  path.moveTo(0, 0);
  path.lineTo(topX, 0);
  path.lineTo(bottomX, canvasHeight);
  path.lineTo(0, canvasHeight);
  path.lineTo(0, 0);
  bgCtx.fillStyle = fillColor;
  bgCtx.fill(path);
  topX += speed;
  bottomX += speed;
  if (topX > canvasWidth) {
    topX = canvasWidth;
  }
  if (bottomX > canvasWidth) {
    bottomX = canvasWidth;
  }
  window.requestAnimationFrame(drawBackground);
}

// drawBackground();



function drawTextImage() {



  var image = new Image();
  image.crossOrigin = 'anonymous'
  image.onload = function () {
    image.width = 1920 / 1.5;
    image.height = 1262 / 1.5;
    textCtx.drawImage(image, 0, 0, image.width, image.height);
    convertText();
  };

  image.src = "./OU2.svg";

}

function convertText() {
  var getImageData = textCtx.getImageData(0, 0, canvasWidth, canvasHeight);
  convertPixcels(getImageData);
}

function convertPixcels(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    const red = pixels.data[i];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];
    const isBlack = !red && !green && !blue && pixels.data[i + 3] === 255;

    if (isBlack) {
      pixels.data[i + 3] = 0;
    }
    else {
      pixels.data[i] = 255;
      pixels.data[i + 1] = 255;
      pixels.data[i + 2] = 255;
      pixels.data[i + 3] = 255;
    }



  }
  textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  textCtx.putImageData(pixels, 0, 0);
  $(document.body).addClass('move-background');
}


drawTextImage();


