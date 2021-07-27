var colorLightBlue = '#00aedc';
var colorGray = '#eeeee8';

var fireworks;
var fireworksCanvas = $('#fireworks')[0];
var fireworksCtx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = 300;
fireworksCanvas.height = 300;
$(fireworksCanvas).width(300);
$(fireworksCanvas).height(300);

var flower;
var flowerdCanvas = $('#flower')[0];
var flowerCtx = flowerdCanvas.getContext('2d');
flowerdCanvas.width = 300;
flowerdCanvas.height = 300;
$(flowerdCanvas).width(300);
$(flowerdCanvas).height(300);

var ring;
var ringCanvas = $('#ring')[0];
var ringCtx = ringCanvas.getContext('2d');
ringCanvas.width = 300;
ringCanvas.height = 300;
$(ringCanvas).width(300);
$(ringCanvas).height(300);

var donut;
var donutCanvas = $('#donut')[0];
var donutCtx = donutCanvas.getContext('2d');
donutCanvas.width = 300;
donutCanvas.height = 300;
$(donutCanvas).width(300);
$(donutCanvas).height(300);

var circleGroup;
var circleGroupCanvas = $('#circleGroup')[0];
var circleGroupCtx = circleGroupCanvas.getContext('2d');
circleGroupCanvas.width = 650;
circleGroupCanvas.height = 650;
$(circleGroupCanvas).width(650);
$(circleGroupCanvas).height(650);

// 0. 判斷 requestAnimationFrame 支援度
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

// fireworks
var Fireworks = function (ctx, lineNumbers) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.lineNumbers = lineNumbers;
  this.centerX = 150;
  this.centerY = 150;
  this.lineFromRadius = 50
  this.lineToRadius = 70;
  this.lineToMinRadius = 70;
  this.lineToMaxRadius = 100;
  this.isRadiusAdding = true;
}

Fireworks.prototype.drawLine = function () {
  var ctx = this.ctx;

  ctx.save();
  ctx.strokeStyle = colorGray;
  ctx.lineCap = "round";
  ctx.beginPath();

  var perAdd = 360 / this.lineNumbers;

  for (i = 0; i < 360; i += perAdd) {
    const startOffsetX = this.lineFromRadius * Math.cos((Math.PI / 180) * i);
    const startOffsetY = this.lineFromRadius * Math.sin((Math.PI / 180) * i);

    const endOffsetX = this.lineToRadius * Math.cos((Math.PI / 180) * i);
    const endOffsetY = this.lineToRadius * Math.sin((Math.PI / 180) * i);

    ctx.lineWidth = 5;
    ctx.moveTo(this.centerX + startOffsetX, this.centerY + startOffsetY);
    ctx.lineTo(this.centerX + endOffsetX, this.centerY + endOffsetY);
  }

  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

Fireworks.prototype.update = function () {
  if (this.isRadiusAdding) {
    this.lineToRadius++;
  } else {
    this.lineToRadius--;
  }

  if (this.lineToRadius > this.lineToMaxRadius) {
    this.isRadiusAdding = false;
    return 'ToMax';
  }
  if (this.lineToRadius < this.lineToMinRadius) {
    this.isRadiusAdding = true;
    return 'ToMin';
  }

  return '';

}

Fireworks.prototype.clear = function () {
  this.ctx.clearRect(0, 0, 300, 300);
}

Fireworks.prototype.explosion = function (explosionTimes) {
  if (explosionTimes === 0 || !explosionTimes) {
    return;
  }

  var paramater;
  this.clear();
  var updateRes = this.update();
  if (explosionTimes && explosionTimes > 0) {
    paramater = updateRes === 'ToMin' ? explosionTimes - 1 : explosionTimes;
  }

  this.drawLine();
  this.rafId = requestAnimationFrame(this.explosion.bind(this, paramater));
}

Fireworks.prototype.stopAnimation = function () {
  if (this.rafId) {
    window.cancelAnimationFrame(this.rafId);
    this.rafId = undefined;
  }
}


// flower
var Flower = function (ctx, petalNumbers) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.petalNumbers = petalNumbers;
  this.centerX = 150;
  this.centerY = 150;
  this.innerRadius = 30;
  this.outerRadius = 80;
  this.petalRadius = 25;
  this.flowerScale = 1;
  this.flowerMinScale = 1;
  this.flowerMaxScale = 1.2;
  this.scaleVelocity = 0.009;
  this.isScaleAdding = true;
}

Flower.prototype.clear = function () {
  this.ctx.clearRect(0, 0, 300, 300);
}

Flower.prototype.update = function () {
  if (this.isScaleAdding) {
    this.flowerScale += this.scaleVelocity;
  } else {
    this.flowerScale -= this.scaleVelocity;
  }

  if (this.flowerScale > this.flowerMaxScale) {
    this.isScaleAdding = false;
    return 'ToMax';
  }
  if (this.flowerScale < this.flowerMinScale) {
    this.isScaleAdding = true;
    return 'ToMin';
  }

  return '';

}

Flower.prototype.draw = function () {
  var ctx = this.ctx;
  ctx.save();

  // 處理 scale
  var translateX = this.centerX;
  var translateY = this.centerY;
  ctx.translate(translateX, translateY);
  ctx.scale(this.flowerScale, this.flowerScale);

  // 畫 outer
  ctx.fillStyle = '#ec6d45';
  ctx.arc(this.centerX - translateX, this.centerY - translateY, this.outerRadius, 0, Math.PI * 2);
  ctx.fill();

  // 畫花瓣
  var perAdd = 360 / this.petalNumbers;
  for (i = 0; i < 360; i += perAdd) {
    ctx.beginPath();
    const startOffsetX = this.outerRadius * Math.cos((Math.PI / 180) * i);
    const startOffsetY = this.outerRadius * Math.sin((Math.PI / 180) * i);
    ctx.arc(this.centerX + startOffsetX - translateX, this.centerY + startOffsetY - translateY, this.petalRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  // 畫中心
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(this.centerX - translateX, this.centerY - translateY, this.innerRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  ctx.restore();
}

Flower.prototype.bloom = function (bloomTimes) {
  if (bloomTimes === 0 || !bloomTimes) {
    return;
  }

  var paramater;
  this.clear();
  var updateRes = this.update();
  if (bloomTimes && bloomTimes > 0) {
    paramater = updateRes === 'ToMin' ? bloomTimes - 1 : bloomTimes;
  }

  this.draw();
  this.rafId = requestAnimationFrame(this.bloom.bind(this, paramater));
}


// ring
var Ring = function (ctx) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.centerX = 150;
  this.centerY = 150;
  this.strokeWidth = 30;
  this.radius = 100;
  this.rotateAngle = 0;
  this.rotateVelocity = 2;
  this.isRotateAdding = true;
  this.sourceVirtualCanvas = this.getSourceVirtualCanvas();
}

Ring.prototype.clear = function () {
  this.ctx.clearRect(0, 0, 300, 300);
}

Ring.prototype.update = function () {
  if (this.isRotateAdding) {
    this.rotateAngle += this.rotateVelocity;
  } else {
    this.rotateAngle -= this.rotateVelocity;
  }

  if (this.rotateAngle > this.rotateMaxScale) {
    this.isRotateAdding = false;
    return 'ToMax';
  }
  if (this.rotateAngle < this.rotateMaxScale) {
    this.isRotateAdding = true;
    return 'ToMin';
  }

  return '';

}

Ring.prototype.getSourceVirtualCanvas = function () {
  var virtualCanvas = document.createElement('canvas');
  var virtualCanvasCtx = virtualCanvas.getContext('2d');
  virtualCanvas.width = 300;
  virtualCanvas.height = 300;
  var ctx = virtualCanvasCtx;
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = colorLightBlue;
  ctx.lineWidth = this.strokeWidth;
  ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = colorGray;
  ctx.arc(this.centerX, this.centerY, this.radius, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();

  ctx.beginPath();
  ctx.fillStyle = colorGray;
  ctx.arc(this.centerX + this.radius, this.centerY, this.strokeWidth / 2, 0, Math.PI);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = colorLightBlue;
  ctx.arc(this.centerX - this.radius, this.centerY, this.strokeWidth / 2, 0, Math.PI, true);
  ctx.fill();
  ctx.closePath();

  return virtualCanvas;
}

Ring.prototype.draw = function () {
  this.ctx.drawImage(this.sourceVirtualCanvas, 0, 0);
}

Ring.prototype.rotate = function (rotateAngle, countRotateAngle) {
  if (rotateAngle === 0 || countRotateAngle === 0 || rotateAngle === countRotateAngle) {
    return;
  }

  if (countRotateAngle === undefined) {
    countRotateAngle = 0;
  }

  this.ctx.save();
  var paramater;
  var translateX = this.centerX;
  var translateY = this.centerY;
  this.ctx.translate(translateX, translateY);
  this.ctx.rotate(Math.PI / 180 * countRotateAngle);
  this.clear();
  this.ctx.drawImage(this.sourceVirtualCanvas, -translateX, -translateY);

  this.ctx.restore();


  if (rotateAngle > 0) {
    paramater = countRotateAngle + this.rotateVelocity;
  }
  else if (rotateAngle < 0) {
    paramater = countRotateAngle - this.rotateVelocity;
  }

  this.rafId = requestAnimationFrame(this.rotate.bind(this, rotateAngle, paramater));
}


// StrokeCircle
var StrokeCircle = function (ctx, centerX, centetY, radius, lineWidth) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.centerX = centerX;
  this.centerY = centetY;
  this.radius = radius;
  this.lineWidth = lineWidth;

  this.globalAlpha = 0;
  this.minGlobalAlpha = 0;
  this.maxGlobalAlpha = 1;
  this.globalAlphaVelocity = 0.05;
  this.isGlobalAlphaAdding = true;
}

StrokeCircle.prototype.clear = function () {
  clearCircle(this.ctx, this.centerX, this.centerY, this.radius, this.lineWidth);
}

StrokeCircle.prototype.update = function () {
  if (this.isGlobalAlphaAdding) {
    this.globalAlpha += this.globalAlphaVelocity;
    this.globalAlpha = Math.min(this.globalAlpha, this.maxGlobalAlpha);
    if (this.globalAlpha >= this.maxGlobalAlpha) {
      this.isGlobalAlphaAdding = false;
      return 'ToMax';
    }

  } else {
    this.globalAlpha -= this.globalAlphaVelocity;
    this.globalAlpha = Math.max(this.globalAlpha, this.minGlobalAlpha);
    if (this.globalAlpha <= this.minGlobalAlpha) {
      this.isGlobalAlphaAdding = true;
      return 'ToMin';
    }
  }

  return '';

}

StrokeCircle.prototype.draw = function (strokeColor, isUseGlobalAlpha) {
  var ctx = this.ctx;
  ctx.save();
  this.clear();

  if (isUseGlobalAlpha) {
    ctx.globalAlpha = this.globalAlpha;
  }
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = this.lineWidth;
  ctx.beginPath();
  ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}

StrokeCircle.prototype.fillColor = function (strokeColor, isResetGlobalAlpha) {
  if (isResetGlobalAlpha) {
    this.globalAlpha = 0;
  }
  this.isGlobalAlphaAdding = true;

  this.clear();
  var updateRed = this.update();
  this.draw(strokeColor, true);

  if (updateRed === 'ToMax') {
    return;
  }

  this.rafId = requestAnimationFrame(this.fillColor.bind(this, strokeColor, false));
}


// CircleGroup
var CircleGroup = function (ctx, centerX, centerY, minRadius, maxRadius, lineNumber) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.centerX = centerX;
  this.centerY = centerY;
  this.minRadius = minRadius;
  this.maxRadius = maxRadius;
  this.lineNumber = lineNumber;
  this.changeLineColorIndex = 0;
  this.changeLineColorUnit = 30;
  this.backGroundStrokeCircleList = this.getStrokeCircleList();
  this.strokeCircleList = this.getStrokeCircleList();
}

CircleGroup.prototype.getStrokeCircleList = function () {
  var circleList = [];
  var totalGapNumber = this.lineNumber * 2 - 1;
  console.log('totalGapNumber: ', totalGapNumber);
  var lineRadiusGap = Math.ceil((this.maxRadius - this.minRadius) / totalGapNumber);
  console.log('lineRadiusGap: ', lineRadiusGap);
  // 11
  for (var i = 0; i < this.lineNumber; i++) {
    let circle = new StrokeCircle(circleGroupCtx, this.centerX, this.centerY, this.minRadius + (i * 2 * lineRadiusGap), lineRadiusGap);
    circleList.push(circle);
  }

  return circleList;
}


CircleGroup.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.maxRadius * 2, this.maxRadius * 2);
}

CircleGroup.prototype.update = function () {
  // if (this.isScaleAdding) {
  //   this.flowerScale += this.scaleVelocity;
  // } else {
  //   this.flowerScale -= this.scaleVelocity;
  // }

  // if (this.flowerScale > this.flowerMaxScale) {
  //   this.isScaleAdding = false;
  //   return 'ToMax';
  // }
  // if (this.flowerScale < this.flowerMinScale) {
  //   this.isScaleAdding = true;
  //   return 'ToMin';
  // }

  // return '';

}

CircleGroup.prototype.drawBackground = function () {
  for (var i = 0; i < this.backGroundStrokeCircleList.length; i++) {
    this.backGroundStrokeCircleList[i].draw(colorGray);
  }
}


CircleGroup.prototype.fillCircleGroup = function (time, fillColor) {

  if (this.changeLineColorIndex === this.strokeCircleList.length) {
    this.changeLineColorIndex = 0;
    return;
  }

  var currentTime = new Date().getTime();
  if (time) {
    const timeGap = currentTime - this.startTime;
    if (timeGap >= this.changeLineColorUnit) {
      this.startTime = currentTime;
      this.strokeCircleList[this.changeLineColorIndex].fillColor(fillColor, true);
      this.changeLineColorIndex++;
    }
  }
  else {
    this.startTime = currentTime;
    this.changeLineColorIndex = 0;
  }

  this.rafId = requestAnimationFrame(this.fillCircleGroup.bind(this, this.startTime, fillColor));
}


// donuts
// var Donut = function (ctx) {

//   this.rafId = undefined;
//   this.ctx = ctx;
//   this.centerX = 150;
//   this.centerY = 150;
//   this.outerRadius = 150;
//   this.innerRadius = 100;
//   this.innerScale = 1;
//   this.innerMinScale = 0.5;
//   this.innerMaxScale = 1;
//   this.scaleVelocity = 0.008;
//   this.isScaleAdding = true;
// }

// Donut.prototype.clear = function () {
//   this.ctx.clearRect(0, 0, 300, 300);
// }

// Donut.prototype.update = function () {
//   if (this.isScaleAdding) {
//     this.innerScale += this.scaleVelocity;
//   } else {
//     this.innerScale -= this.scaleVelocity;
//   }

//   if (this.innerScale > this.innerMaxScale) {
//     this.isScaleAdding = false;
//     return 'ToMax';
//   }
//   if (this.innerScale < this.innerMinScale) {
//     this.isScaleAdding = true;
//     return 'ToMin';
//   }

//   return '';

// }

// Donut.prototype.draw = function () {
//   var ctx = this.ctx;
//   ctx.save();

//   // 畫 outer
//   ctx.fillStyle = colorLightBlue;
//   ctx.beginPath();
//   ctx.arc(this.centerX, this.centerY, this.outerRadius, 0, Math.PI * 2);
//   ctx.fill();
//   ctx.closePath();

//   // 處理 scale
//   var translateX = this.centerX;
//   var translateY = this.centerY;
//   ctx.translate(translateX, translateY);
//   ctx.scale(this.innerScale, this.innerScale);

//   // 畫 inner
//   ctx.fillStyle = 'white';
//   ctx.beginPath();
//   ctx.arc(this.centerX - translateX, this.centerY - translateY, this.innerRadius, 0, Math.PI * 2);
//   ctx.fill();
//   ctx.closePath();

//   ctx.restore();
// }

// Donut.prototype.scaleCenter = function (scaleTimes, calculateMode) {
//   if (scaleTimes === 0) {
//     return;
//   }

//   var paramater;
//   this.clear();
//   var updateRes = this.update();
//   if (scaleTimes === undefined) {
//     paramater = undefined;
//   }
//   else if (scaleTimes && scaleTimes > 0) {
//     paramater = updateRes === calculateMode ? scaleTimes - 1 : scaleTimes;
//   }

//   this.draw();
//   this.rafId = requestAnimationFrame(this.scaleCenter.bind(this, paramater, calculateMode));
// }


function initial() {
  fireworks = new Fireworks(fireworksCtx, 12);
  fireworks.drawLine();

  flower = new Flower(flowerCtx, 12);
  flower.draw();

  ring = new Ring(ringCtx);
  ring.draw();

  // donut = new Donut(donutCtx);
  // donut.draw();

  circleGroup = new CircleGroup(circleGroupCtx, 325, 325, 30, 300, 11);
  circleGroup.drawBackground();
}


function bindMouseEvent() {
  $(fireworksCanvas).on('mouseenter', function () {
    fireworks.explosion(2);
  });

  $(flowerdCanvas).on('mouseenter', function () {
    flower.bloom(2);
  });

  $(ringCanvas).on('mouseenter', function () {
    ring.rotate(90);
  });

  $(circleGroupCanvas).on('mouseenter', function () {
    circleGroup.fillCircleGroup(new Date().getTime(), colorLightBlue);
  });

  $(circleGroupCanvas).on('mouseleave', function () {
    circleGroup.fillCircleGroup(new Date().getTime(), colorGray);
  });

  // $(donutCanvas).on('mouseenter', function () {
  //   donut.scaleCenter(1, 'ToMin');
  // });

  // $(donutCanvas).on('mouseleave', function () {
  //   donut.scaleCenter(1, 'ToMax');
  // });
}


// 主程式
initial();
bindMouseEvent();


function clearCircle(context, x, y, radius, strokeLineWidth) {
  context.save();
  context.beginPath();
  context.globalCompositeOperation = 'destination-out';
  if (strokeLineWidth) {
    context.lineWidth = strokeLineWidth;
  }
  context.arc(x, y, radius, 0, Math.PI * 2, true);

  if (strokeLineWidth) {
    context.stroke();
  }
  else {
    context.fill();
  }
  context.closePath();
  context.restore();
}
