
// var canvasWidth = 300;
// var canvasHeight = 300;
var mapWidth = window.innerWidth / 2;
var mapHeight = window.innerHeight;
// var mapWidth = 760;
// var mapHeight = 880;
var mapXNumber = 19;
var mapYNumber = 22;
var mapWidthPerX = Math.ceil(mapWidth / mapXNumber);
var mapWidthPerY = Math.ceil(mapHeight / mapYNumber);
var mapCanvas = $('#map')[0];

var mapCtx = mapCanvas.getContext('2d');

mapCanvas.width = mapWidth;
mapCanvas.height = mapHeight;

var mapCoordinateList = [];
var mapWallCoordinateList = [];

var smile;

// ES5 Class
var Coordinate = function (x, y, fillStyle) {
  this.x = x;
  this.y = y;
  this.fillStyle = fillStyle;
}

var Smile = function (x, y, direction, velocity) {
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.velocity = velocity;
}


function initialMap() {
  mapCtx.fillStyle = 'black';
  mapCtx.fillRect(0, 0, mapWidth, mapHeight);

  mapWallCoordinateList = [

    [2, 2],
    [3, 2],
    [5, 2],
    [7, 2],
    [8, 2],
    [9, 2],
    [10, 2],
    [11, 2],
    [13, 2],
    [15, 2],
    [16, 2],


    [2, 3],
    [5, 3],
    [9, 3],
    [13, 3],
    [16, 3],

    [2, 4],
    [4, 4],
    [5, 4],
    [7, 4],
    [9, 4],
    [11, 4],
    [13, 4],
    [14, 4],
    [16, 4],

    [5, 5],
    [7, 5],
    [9, 5],
    [11, 5],
    [13, 5],

    [2, 6],
    [3, 6],
    [5, 6],
    [7, 6],
    [11, 6],
    [13, 6],
    [15, 6],
    [16, 6],

    [3, 7],
    [5, 7],
    [7, 7],
    [8, 7],
    [9, 7],
    [10, 7],
    [11, 7],
    [13, 7],
    [15, 7],

    [1, 8],
    [3, 8],
    [15, 8],
    [17, 8],

    [1, 9],
    [3, 9],
    [5, 9],
    [7, 9],
    [8, 9],
    [9, 9],
    [10, 9],
    [11, 9],
    [13, 9],
    [15, 9],
    [17, 9],

    [1, 10],
    [5, 10],
    [7, 10],
    [11, 10],
    [13, 10],
    [17, 10],

    [1, 11],
    [3, 11],
    [4, 11],
    [5, 11],
    [7, 11],
    [8, 11],
    [9, 11],
    [10, 11],
    [11, 11],
    [13, 11],
    [14, 11],
    [15, 11],
    [17, 11],

    [1, 12],
    [17, 12],


    [1, 13],
    [3, 13],
    [4, 13],
    [5, 13],
    [6, 13],
    [7, 13],
    [9, 13],
    [11, 13],
    [12, 13],
    [13, 13],
    [14, 13],
    [15, 13],
    [17, 13],

    [3, 14],
    [9, 14],
    [15, 14],

    [1, 15],
    [3, 15],
    [5, 15],
    [7, 15],
    [8, 15],
    [9, 15],
    [10, 15],
    [11, 15],
    [13, 15],
    [15, 15],
    [17, 15],

    [1, 16],
    [5, 16],
    [13, 16],
    [17, 16],

    [1, 17],
    [3, 17],
    [5, 17],
    [6, 17],
    [7, 17],
    [9, 17],
    [11, 17],
    [12, 17],
    [13, 17],
    [15, 17],
    [17, 17],


    [3, 18],
    [5, 18],
    [9, 18],
    [13, 18],
    [15, 18],


    [2, 19],
    [3, 19],
    [5, 19],
    [7, 19],
    [8, 19],
    [9, 19],
    [10, 19],
    [11, 19],
    [13, 19],
    [15, 19],
    [16, 19],

  ];

  // 畫直的邊框
  for (var x = 0; x < mapXNumber; x++) {
    if (x === 0 || x === mapXNumber - 1) {
      for (var y = 0; y < mapYNumber; y++) {
        if (y !== 14) {
          mapWallCoordinateList.push([x, y]);
        }
      }
    }
  }

  // 畫橫的邊框
  for (var y = 0; y < mapYNumber; y++) {
    if (y === 0 || y === mapYNumber - 1) {
      for (var x = 0; x < mapYNumber; x++) {
        mapWallCoordinateList.push([x, y]);
      }
    }
  }


  mapWallCoordinateList.forEach(wall => {
    var x = wall[0];
    var y = wall[1];
    mapCtx.fillStyle = '#61A8B0';
    var realX = x * mapWidthPerX;
    var realY = y * mapWidthPerY;
    mapCtx.fillRect(realX, realY, mapWidthPerX, mapWidthPerY);
  });


}

function inititalSmile() {
  smile = new Smile(9, 12, 'left', 0.1);
  animateSmile();
}

function animateSmile() {
  if (smile.direction === 'right') {
    smile.x += smile.velocity;
    if (smile.x > mapXNumber - 1) {
      smile.x = 0;
    }
  }
  else if (smile.direction === 'left') {
    smile.x -= smile.velocity;
    if (smile.x < 0) {
      smile.x = mapXNumber - 1;
    }
  }
  else if (smile.direction === 'down') {
    smile.y += smile.velocity;
    if (smile.y > mapYNumber - 1) {
      smile.y = 0;
    }
  }
  else if (smile.direction === 'up') {
    smile.y -= smile.velocity;
    if (smile.y < 0) {
      smile.y = mapYNumber - 1;
    }
  }

  mapCtx.save();
  initialMap();
  mapCtx.fillStyle = 'yellow';
  var realX = smile.x * mapWidthPerX;
  var realY = smile.y * mapWidthPerY;
  mapCtx.beginPath();
  mapCtx.arc(realX, realY, mapWidthPerX / 3, 0, Math.PI * 2);
  mapCtx.fill();
  mapCtx.closePath();
  // mapCtx.fillRect(realX, realY, mapWidthPerX, mapWidthPerY);
  mapCtx.restore();

  window.requestAnimationFrame(animateSmile);
}

function initial() {
  mapCtx.fillStyle = 'yellow';
  mapCtx.moveTo(100, 100);
  mapCtx.arc(100, 100, 100, 0, Math.PI * 2 * 2 / 3);
  mapCtx.fill();
}

function bindKeyboardEvent() {
  window.addEventListener('keydown', function (e) {
    var keyCode = e.code;
    if (keyCode === 'ArrowRight') {
      smile.direction = 'right';
    }
    else if (keyCode === 'ArrowLeft') {
      smile.direction = 'left';
    }
    else if (keyCode === 'ArrowDown') {
      smile.direction = 'down';
    }
    else if (keyCode === 'ArrowUp') {
      smile.direction = 'up';
    }
  }, false);
}


initialMap();
inititalSmile();
bindKeyboardEvent();

