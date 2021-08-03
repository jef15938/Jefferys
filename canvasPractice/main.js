var colorLightBlue = '#00aedc';
var colorGray = '#eeeee8';
var colorOrange = '#ec6d45';
var colorYellow = '#ffe100';

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

var lifebuoy;
var lifebuoyCanvas = $('#lifebuoy')[0];
var lifebuoyCtx = lifebuoyCanvas.getContext('2d');
lifebuoyCanvas.width = 600;
lifebuoyCanvas.height = 600;
$(lifebuoyCanvas).width(600);
$(lifebuoyCanvas).height(600);

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
  ctx.fillStyle = colorOrange;
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

  this.clear();
  this.ctx.save();
  var paramater;
  var translateX = this.centerX;
  var translateY = this.centerY;
  this.ctx.translate(translateX, translateY);
  this.ctx.rotate(Math.PI / 180 * countRotateAngle);
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
  this.minGapIndex = 0;
  this.globalAlphaVelocity = 1;
  this.isGapIndexAdding = true;
  this.colorList = [];
}

StrokeCircle.prototype.clear = function () {
  clearCircle(this.ctx, this.centerX, this.centerY, this.radius, this.lineWidth);
}

StrokeCircle.prototype.update = function (gapNumber) {
  if (this.isGapIndexAdding) {
    this.globalAlpha += this.globalAlphaVelocity;
    this.globalAlpha = Math.min(this.globalAlpha, gapNumber - 1);
    if (this.globalAlpha >= gapNumber - 1) {
      this.isGapIndexAdding = false;
      return 'ToMax';
    }

  } else {
    this.globalAlpha -= this.globalAlphaVelocity;
    this.globalAlpha = Math.max(this.globalAlpha, this.minGapIndex);
    if (this.globalAlpha <= this.minGapIndex) {
      this.isGapIndexAdding = true;
      return 'ToMin';
    }
  }

  return '';

}

StrokeCircle.prototype.draw = function (strokeColor) {
  var ctx = this.ctx;
  ctx.save();
  this.clear();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = this.lineWidth;
  ctx.beginPath();
  ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}

StrokeCircle.prototype.fillColor = function (strokeColorStart, strokeColorEnd, gapNumber, isReset) {
  if (isReset) {
    this.globalAlpha = this.minGapIndex;
    this.colorList = getColorListBetweenColor(strokeColorStart, strokeColorEnd, gapNumber);
    this.strokeColor = this.colorList[0];
  }
  this.isGapIndexAdding = true;

  this.clear();
  var updateRed = this.update(gapNumber);
  this.draw(this.colorList[this.globalAlpha]);

  if (updateRed === 'ToMax') {
    return;
  }

  this.rafId = requestAnimationFrame(this.fillColor.bind(this, strokeColorStart, strokeColorEnd, gapNumber, false));
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
  var lineRadiusGap = Math.ceil((this.maxRadius - this.minRadius) / totalGapNumber);
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


CircleGroup.prototype.fillCircleGroup = function (time, fillColorStart, fillColorEnd, fillColorGapNumber) {

  if (this.changeLineColorIndex === this.strokeCircleList.length) {
    this.changeLineColorIndex = 0;
    return;
  }

  var currentTime = new Date().getTime();
  if (time) {
    const timeGap = currentTime - this.startTime;
    if (timeGap >= this.changeLineColorUnit) {
      this.startTime = currentTime;
      this.strokeCircleList[this.changeLineColorIndex].fillColor(fillColorStart, fillColorEnd, fillColorGapNumber, true);
      this.changeLineColorIndex++;
    }
  }
  else {
    this.startTime = currentTime;
    this.changeLineColorIndex = 0;
  }

  this.rafId = requestAnimationFrame(this.fillCircleGroup.bind(this, this.startTime, fillColorStart, fillColorEnd, fillColorGapNumber));
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


// Lifebuoy
var Lifebuoy = function (ctx, colorList, innerRadius, outerRadius, maxScaleRadius) {

  this.rafId = undefined;
  this.ctx = ctx;
  this.colorList = colorList;
  this.centerX = 300;
  this.centerY = 300;
  this.innerRadius = innerRadius;
  this.outerRadius = outerRadius;
  this.minScaleRadius = this.outerRadius;
  this.maxScaleRadius = maxScaleRadius;
  this.isScaleAdding = true;
  this.scaleVelocity = 8;
  this.rotateVelocity = 2;
  this.stageAngle = 0;
  this.rotateAngle = 90;
  this.originDegree = 0;
  this.colorItemPathList = [];


  this.initial();
}

Lifebuoy.prototype.initial = function () {

  // ctx.save();
  // ctx.translate(this.centerX, this.centerY);

  var unitDegree = 360 / this.colorList.length;

  for (i = 0; i < this.colorList.length; i++) {
    let colorItemPath = new Path2D();
    colorItemPath.fillStyle = this.colorList[i];
    colorItemPath.moveTo(0, 0);
    colorItemPath.arc(0, 0, this.outerRadius, Math.PI / 180 * (i * unitDegree) + this.originDegree, Math.PI / 180 * ((i + 1) * unitDegree) + this.originDegree);
    this.colorItemPathList.push(colorItemPath);
  }

  // ctx.restore();

}

Lifebuoy.prototype.draw = function () {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.centerX, this.centerY);

  var unitDegree = 360 / this.colorList.length;


  var radiusDiff = this.outerRadius - this.minScaleRadius;
  for (i = 0; i < this.colorList.length; i++) {
    var pathCenterDegree = (unitDegree * 0.5) + (i * unitDegree);
    ctx.save();
    var offsetX = radiusDiff * Math.cos((Math.PI / 180) * pathCenterDegree);
    var offsetY = radiusDiff * Math.sin((Math.PI / 180) * pathCenterDegree);

    ctx.translate(offsetX, offsetY);
    ctx.beginPath();
    ctx.fillStyle = this.colorList[i];
    ctx.fill(this.colorItemPathList[i]);
    ctx.closePath();
    ctx.restore();
  }

  ctx.beginPath();
  ctx.fillStyle = '#ffffff';
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, this.innerRadius + radiusDiff, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  ctx.restore();

}

Lifebuoy.prototype.clear = function () {
  this.ctx.clearRect(0, 0, 600, 600);
}

Lifebuoy.prototype.stopAnimation = function () {
  if (this.rafId) {
    window.cancelAnimationFrame(this.rafId);
    this.rafId = undefined;
  }
}

Lifebuoy.prototype.rotate = function () {
  if (this.originDegree >= 135) {
    return;
  }

  this.originDegree += this.rotateVelocity;
  this.clear();
  this.draw();

  this.rafId = requestAnimationFrame(this.rotate.bind(this));
}

Lifebuoy.prototype.updateBloom = function () {

  if (this.isScaleAdding) {
    this.outerRadius += this.scaleVelocity;
  } else {
    this.outerRadius -= this.scaleVelocity;
  }

  if (this.outerRadius > this.maxScaleRadius) {
    this.outerRadius = this.maxScaleRadius;
    this.isScaleAdding = false;
    return 'ToMax';
  }
  if (this.outerRadius < this.minScaleRadius) {
    this.outerRadius = this.minScaleRadius;
    this.isScaleAdding = true;
    return 'ToMin';
  }

  return '';

}

Lifebuoy.prototype.bloom = function (bloomTimes, endRes) {
  if (bloomTimes === 0 || !bloomTimes) {
    return;
  }

  var paramater;
  this.clear();
  var updateRes = this.updateBloom();
  if (bloomTimes && bloomTimes > 0) {
    paramater = updateRes === endRes ? bloomTimes - 1 : bloomTimes;
  }

  this.draw();
  this.rafId = requestAnimationFrame(this.bloom.bind(this, paramater, endRes));
}


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

  lifebuoy = new Lifebuoy(lifebuoyCtx, [colorOrange, colorYellow, colorGray, colorLightBlue, colorOrange, colorYellow, colorGray, colorLightBlue], 100, 200, 300);
  lifebuoy.draw();
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
    circleGroup.fillCircleGroup(new Date().getTime(), colorGray, colorLightBlue, 10);
  });

  $(circleGroupCanvas).on('mouseleave', function () {
    circleGroup.fillCircleGroup(new Date().getTime(), colorLightBlue, colorGray, 10);
  });

  // $(donutCanvas).on('mouseenter', function () {
  //   donut.scaleCenter(1, 'ToMin');
  // });

  // $(donutCanvas).on('mouseleave', function () {
  //   donut.scaleCenter(1, 'ToMax');
  // });

  $(lifebuoyCanvas).on('mouseenter', function () {
    lifebuoy.bloom(1, 'ToMax');
  });

  $(lifebuoyCanvas).on('mouseleave', function () {
    lifebuoy.bloom(1, 'ToMin');
  });


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

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getColorListBetweenColor(color1Hex, color2Hex, gapNumber) {
  if (gapNumber < 2) {
    return [];
  }
  var rgb1 = hexToRgb(color1Hex);
  var rgb2 = hexToRgb(color2Hex);
  var r1 = rgb1.r;
  var g1 = rgb1.g;
  var b1 = rgb1.b;
  var r2 = rgb2.r;
  var g2 = rgb2.g;
  var b2 = rgb2.b;

  var rGap = (r2 - r1) / (gapNumber - 1);
  var gGap = (g2 - g1) / (gapNumber - 1);
  var bGap = (b2 - b1) / (gapNumber - 1);

  const colorList = [];

  for (var i = 0; i < gapNumber; i++) {
    var resultR = Math.ceil(r1 + (i * rGap));
    var resultG = Math.ceil(g1 + (i * gGap));
    var resultB = Math.ceil(b1 + (i * bGap));
    colorList.push(`rgb(${resultR}, ${resultG}, ${resultB})`);
  }

  return colorList;

}