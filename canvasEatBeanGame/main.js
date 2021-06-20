
var mapHeight = window.innerHeight;
var mapWidth = mapHeight * 19 / 22;

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
var mapWallPositionList = [];
var mapBeanPositionList = [];
var mapImageDate = null;

var smile;

// ES5 Class
var Coordinate = function (x, y, fillStyle) {
  this.x = x;
  this.y = y;
  this.fillStyle = fillStyle;
}

var Smile = function (x, y, size, velocity) {
  this.x = x;
  this.y = y;
  this.direction = 'right';
  this.nextDirection = this.direction;
  this.size = size;
  this.velocity = velocity;
  this.canMoveRange = 0.2;
  this.isMouseOpen = false;
  this.toggleMouseCount = 0;
  this.toggleMouseMax = 8;
}

Smile.prototype.update = function () {

  var loop = [
    ['right', 'x', 'plus'],
    ['left', 'x', 'minus'],
    ['down', 'y', 'plus'],
    ['up', 'y', 'minus'],
  ];



  loop.forEach(per => {
    var direction = per[0];
    var xy = per[1];
    var calculateSymbol = per[2];

    if (this.nextDirection === direction) {
      var origin = this[xy];
      if (calculateSymbol === 'plus') {
        this[xy] += (this.velocity + this.canMoveRange);
      }
      else if (calculateSymbol === 'minus') {
        this[xy] -= (this.velocity + this.canMoveRange);
      }
      var isCollide = judgeSmileIsCollideWall();

      if (isCollide) {
        this[xy] = origin;
        this.nextDirection = this.direction;
      }
      else {
        this.direction = this.nextDirection;
        if (calculateSymbol === 'plus') {
          this[xy] -= this.canMoveRange;
        }
        else if (calculateSymbol === 'minus') {
          this[xy] += this.canMoveRange;
        }
      }

      if (xy === 'x') {
        if (this.x > mapXNumber) {
          this.x = 0;
        }

        if (this.x < 0) {
          this.x = mapXNumber;
        }
      }
      else if (xy === 'y') {
        if (this.y > mapYNumber - 1) {
          this.y = 0;
        }

        if (this.y < 0) {
          this.y = mapXYumber - 1;
        }
      }

    }
  });





}

Smile.prototype.draw = function () {

  mapCtx.save();
  mapCtx.fillStyle = 'yellow';
  var realX = this.x * mapWidthPerX;
  var realY = this.y * mapWidthPerY;
  mapCtx.beginPath();
  mapCtx.moveTo(realX, realY);

  if (this.isMouseOpen) {
    mapCtx.arc(realX, realY, this.size, 0, Math.PI * 2);
  }
  else {
    var mouseAngle = Math.PI / 5;
    var quarter = Math.PI / 2;

    if (this.direction === 'right') {
      mapCtx.arc(realX, realY, this.size, mouseAngle, Math.PI * 2 - mouseAngle);
    }
    if (this.direction === 'down') {
      mapCtx.arc(realX, realY, this.size, mouseAngle + quarter, Math.PI * 2 - mouseAngle + quarter);
    }
    if (this.direction === 'left') {
      mapCtx.arc(realX, realY, this.size, mouseAngle + quarter * 2, Math.PI * 2 - mouseAngle + quarter * 2);
    }
    if (this.direction === 'up') {
      mapCtx.arc(realX, realY, this.size, mouseAngle + quarter * 3, Math.PI * 2 - mouseAngle + quarter * 3);
    }
  }

  mapCtx.fill();
  mapCtx.closePath();


  this.toggleMouseCount++;
  if (this.toggleMouseCount === this.toggleMouseMax) {
    this.isMouseOpen = !this.isMouseOpen;
    this.toggleMouseCount = 0;
  }
  mapCtx.restore();

}



function initialMap(isFirstTime) {

  if (!mapImageDate) {


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
      var realX = x * mapWidthPerX;
      var realY = y * mapWidthPerY;
      mapWallPositionList.push({ x: realX, y: realY, width: mapWidthPerX, height: mapWidthPerY });
    });

    if (isFirstTime) {
      for (var x = 0; x < mapXNumber; x++) {
        for (var y = 0; y < mapYNumber; y++) {
          var findWall = mapWallCoordinateList.find(wall => (wall[0] === x && wall[1] === y));
          if (!findWall) {
            var beanRadius = mapWidthPerX / 6;
            var realX = x * mapWidthPerX + beanRadius * 3;
            var realY = y * mapWidthPerY + beanRadius * 3;
            mapBeanPositionList.push({ x: realX, y: realY, width: beanRadius, height: beanRadius })
          }
        }
      }
    }

    mapCtx.save();
    mapCtx.fillStyle = '#61A8B0';
    mapWallPositionList.forEach(wall => {
      mapCtx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
    mapCtx.restore();



    mapImageDate = mapCtx.getImageData(0, 0, mapWidth, mapHeight);

  }


  mapCtx.putImageData(mapImageDate, 0, 0);


  mapCtx.save();

  mapBeanPositionList.forEach(bean => {

    mapCtx.fillStyle = 'orange';
    mapCtx.beginPath();
    var beanRealX = bean.x;
    var beanRealY = bean.y;
    mapCtx.arc(beanRealX, beanRealY, bean.width, 0, Math.PI * 2);
    mapCtx.fill();
    mapCtx.closePath();
  });
  mapCtx.restore();



}

function inititalSmile() {
  smile = new Smile(9.5, 12.5, 15, 0.05);
  animateSmile();
}

function animateSmile() {

  initialMap();

  smile.update(smile.direction);
  smile.draw();
  judgeSmileIsCollideBean();


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

    var keyCode = e.key;
    if (keyCode === 'ArrowRight') {
      // smile.update('right');
      smile.nextDirection = 'right';
    }
    else if (keyCode === 'ArrowLeft') {
      // smile.update('left');
      smile.nextDirection = 'left';
    }
    else if (keyCode === 'ArrowDown') {
      // smile.update('down');
      smile.nextDirection = 'down';
    }
    else if (keyCode === 'ArrowUp') {
      // smile.update('up');
      smile.nextDirection = 'up';
    }
  }, false);
}


function judgeSmileIsCollideWall() {
  var mapWallPositionListLength = mapWallPositionList.length;
  var isCollide = false;
  var smilePosition = {
    x: smile.x * mapWidthPerX - smile.size,
    y: smile.y * mapWidthPerY - smile.size,
    width: smile.size * 2,
    height: smile.size * 2
  }
  for (var i = 0; i < mapWallPositionListLength && !isCollide; i++) {
    var eachWall = mapWallPositionList[i];

    var result = didRectCollide(smilePosition, eachWall);
    if (result) {
      isCollide = true;
    }
  }

  return isCollide;
}

/* 判断是否两个矩形发生碰撞 */
function didRectCollide(rect1, rect2) {
  let horizontal = rect1.x + rect1.width > rect2.x && rect1.x < rect2.x + rect2.width;
  let vertical = rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
  return horizontal && vertical;
}

function judgeSmileIsCollideBean() {
  var mapBeanPositionListLength = mapBeanPositionList.length;
  var isCollide = false;
  var smilePosition = {
    x: smile.x * mapWidthPerX - smile.size,
    y: smile.y * mapWidthPerY - smile.size,
    width: smile.size * 2,
    height: smile.size * 2
  }
  for (var i = 0; i < mapBeanPositionListLength && !isCollide; i++) {
    var eachBean = mapBeanPositionList[i];

    var result = didRectCollide(smilePosition, eachBean);
    if (result) {
      console.log('碰撞痘痘');
      isCollide = true;
      mapBeanPositionList = mapBeanPositionList.filter((value, index) => index !== i);

      mapCtx.save();
      mapCtx.fillStyle = 'black';
      var realX = eachBean.x * mapWidthPerX;
      var realY = eachBean.y * mapWidthPerY;
      mapCtx.fillRect(realX, realY, mapWidthPerX, mapWidthPerY);
      mapCtx.restore();
    }
  }

  return isCollide;
}




initialMap(true);
inititalSmile();
bindKeyboardEvent();

