// ES5 Class
var Clock = function (clockConfig) {
  this.target = $(clockConfig.target)[0];
  this.ctx = this.target.getContext('2d');
  this.width = clockConfig.width;
  this.height = clockConfig.height;
  this.clockStyle = clockConfig.clockStyle;
  this.clockScaleStyle = clockConfig.clockScaleStyle;
  this.hourHandStyle = clockConfig.hourHandStyle;
  this.minuteHandStyle = clockConfig.minuteHandStyle;
  this.secondHandStyle = clockConfig.secondHandStyle;
}

// 畫時鐘
Clock.prototype.draw = function () {

  var ctx = this.ctx;
  this.target.width = this.width;
  this.target.height = this.height;

  ctx.save();
  ctx.clearRect(0, 0, this.width, this.height);

  ctx.translate(this.width / 2, this.height / 2);
  ctx.rotate(2 * Math.PI * (-1 / 4)); // 將圓校正, 12 點鐘方向為圓的 0 度

  // 畫時鐘外框
  var clockRadius = Math.round((this.width * 0.7) / 2);
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = this.clockStyle;
  ctx.arc(0, 0, clockRadius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();

  // 時針刻度 start
  var hourRadius = clockRadius - 20; // 圓形往內縮 20px 開始畫刻度
  //第二層save
  ctx.save();
  ctx.lineWidth = 5;
  ctx.strokeStyle = this.clockScaleStyle;

  // 畫 12 個刻度
  for (var i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(hourRadius, 0);
    ctx.lineTo(hourRadius - 30, 0);
    ctx.stroke();
    ctx.rotate(2 * Math.PI / 12);
  }
  ctx.restore();

  var now = new Date();
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr = now.getHours();
  hr = hr % 12;
  // 時針刻度 end

  // 時針 start
  ctx.save();
  ctx.lineWidth = 20;
  ctx.lineCap = 'round';
  ctx.strokeStyle = this.hourHandStyle;
  ctx.rotate((hr * (2 * Math.PI / 12)) + ((2 * Math.PI / 12) / 60 * min) + ((2 * Math.PI / 12) / 60 / 60 * sec));
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.restore();
  // 時針 end

  // 分針 start
  ctx.save();
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.strokeStyle = this.minuteHandStyle;
  ctx.rotate(((2 * Math.PI / 60) * min) + ((2 * Math.PI / 60) / 60 * sec));
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(180, 0);
  ctx.stroke();
  ctx.restore();
  // 分針 end

  // 秒針 start
  ctx.save();
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.strokeStyle = this.secondHandStyle;
  ctx.rotate(2 * Math.PI / 60 * sec);
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(140, 0);
  ctx.stroke();
  ctx.restore();
  // 秒針 end

  // 圓心小圓點
  ctx.save();
  ctx.fillStyle = this.clockStyle;
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
  ctx.restore();

}

// 畫座標網格
Clock.prototype.grid = function () {

  var ctx = this.ctx;

  var viewPortWidth = this.width,
    viewPortHeight = this.width;

  ctx.save();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "rgba(100,100,100,0.2)";
  for (let i = 0; i < viewPortWidth; i += 10) {
    ctx.beginPath()
    ctx.moveTo(i, 0);
    ctx.lineTo(i, viewPortHeight);
    ctx.fillText(i, i, i);
    ctx.closePath();
    ctx.stroke();

  }
  for (let i = 0; i < viewPortHeight; i += 10) {
    ctx.beginPath()
    ctx.moveTo(0, i);
    ctx.lineTo(viewPortWidth, i);
    ctx.fillText(i, 0, i);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
}

// 初始化時鐘
Clock.prototype.initial = function () {
  var _this = this;
  _this.draw();
  _this.grid();
  setInterval(function () {
    _this.draw();
    _this.grid();
  }, 1000);

}

// 初始化
function initial() {
  var clockConfig = {
    target: '#clock',
    width: 700,
    height: 700,
    clockStyle: '#CC887B',
    clockScaleStyle: '#CC887B',
    hourHandStyle: '#333333',
    minuteHandStyle: '#333333',
    secondHandStyle: 'red'
  }
  var clock = new Clock(clockConfig);
  clock.initial();
}

// 主程式
initial();
