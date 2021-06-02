var canvasWidth = 765;
var canvasHeight = 450;
var snowList = [];
var canvas = $('.heartbeat')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var hearbeatList = [];
var segmenthearbeatList = [];
var currentSegmentHearBeatIndex = 1;

var HeartBeat = function (x, y) {
  this.x = x;
  this.y = y;
}

function calcWaypoints(vertices, segmentNumber) {
  var waypoints = [];
  for (var i = 1; i < vertices.length; i++) {
    var pt0 = vertices[i - 1];
    var pt1 = vertices[i];
    var dx = pt1.x - pt0.x;
    var dy = pt1.y - pt0.y;
    for (var j = 0; j < segmentNumber; j++) {
      var x = pt0.x + dx * j / segmentNumber;
      var y = pt0.y + dy * j / segmentNumber;
      waypoints.push({ x: x, y: y });
    }
  }
  return (waypoints);
}

function initial() {

  var heartBeatXList = [30, 105, 120, 150, 165, 180, 195, 210, 225, 255, 270, 285, 330, 330, 435, 450, 480, 495, 510, 525, 540, 555, 585, 600, 615, 660, 735];
  var hearBeatYList = [195, 195, 150, 240, 210, 240, 210, 240, 90, 360, 225, 240, 195, 195, 195, 150, 240, 210, 240, 210, 240, 90, 360, 225, 240, 195, 195];

  for (var i = 0; i < heartBeatXList.length; i++) {
    hearbeatList.push(new HeartBeat(heartBeatXList[i], hearBeatYList[i]));
  }

  segmenthearbeatList = calcWaypoints(hearbeatList, 8);
}

function animate() {

  if (currentSegmentHearBeatIndex >= segmenthearbeatList.length - 1) {
    setTimeout(function () {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      currentSegmentHearBeatIndex = 0;
    }, 5000);
  }

  var currentHearBeat = segmenthearbeatList[currentSegmentHearBeatIndex];
  var nextHearBeat = segmenthearbeatList[currentSegmentHearBeatIndex + 1];

  ctx.beginPath();
  ctx.moveTo(currentHearBeat.x, currentHearBeat.y);
  ctx.lineTo(nextHearBeat.x, nextHearBeat.y);
  ctx.strokeStyle = 'black';
  ctx.stroke();

  currentSegmentHearBeatIndex++;

  window.requestAnimationFrame(animate);

}

function animate2() {
  var delay = 0;
  if (currentSegmentHearBeatIndex >= segmenthearbeatList.length) {
    delay = 1000;
    setTimeout(function () {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      currentSegmentHearBeatIndex = 1;
    }, delay);
  }

  setTimeout(function () {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    for (var i = 1; i <= currentSegmentHearBeatIndex; i++) {

      // first
      if (i === 1) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        var startPoint = segmenthearbeatList[0];
        var secondPoint = segmenthearbeatList[i];
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(secondPoint.x, secondPoint.y);
      }
      // last
      else if (i === currentSegmentHearBeatIndex) {
        var lastPoint = segmenthearbeatList[i];
        ctx.strokeStyle = 'rgb(138,236,117)';
        ctx.stroke();


        ctx.fillStyle = 'rgb(138,236,117)';
        ctx.strokeStyle = 'rgba(138,236,117, 0.5)';
        ctx.lineWidth = 40;
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();

      }
      else {
        var betweenPoint = segmenthearbeatList[i];
        ctx.lineTo(betweenPoint.x, betweenPoint.y);
      }
    }

    currentSegmentHearBeatIndex++;

    window.requestAnimationFrame(animate2);
  }, delay);


}

initial();
animate2();


