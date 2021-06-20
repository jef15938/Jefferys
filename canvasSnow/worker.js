var canvasWidth;
var canvasHeight;
var intervalTime = 1000 / 60;
self.onmessage = function (e) {
  if (e.data.canvasWidth && e.data.canvasHeight) {
    canvasWidth = e.data.canvasWidth;
    canvasHeight = e.data.canvasHeight;
  }
  else {
    var snowList = e.data;
    updateSnowList(snowList);
    self.postMessage(snowList);
    setInterval(() => {
      updateSnowList(snowList);
      self.postMessage(snowList);
    }, intervalTime);
  }
}


function updateSnowList(snowList) {
  for (var i = 0; i < snowList.length; i++) {
    updateSnow(snowList[i]);
  }
}

function updateSnow(snow) {

  // 往下飄落
  snow.y += snow.velocity;

  // 4. 設定終止條件(雪花已經飄到畫面外)
  if (snow.y > canvasHeight) {
    snow.y = 0;
    snow.x = Math.random() * canvasWidth;
  }

}