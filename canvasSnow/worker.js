var canvasWidth;
var canvasHeight;
self.onmessage = function (e) {
  if (e.data.canvasWidth && e.data.canvasHeight) {
    canvasWidth = e.data.canvasWidth;
    canvasHeight = e.data.canvasHeight;
  }
  else {
    var snowList = e.data;
    for (var i = 0; i < snowList.length; i++) {
      snowList[i] = update(snowList[i]);
    }
    self.postMessage(snowList);
  }
}


function update(self) {

  // 往下飄落
  self.y += self.velocity;

  // 4. 設定終止條件(雪花已經飄到畫面外)
  if (self.y > canvasHeight) {
    self.y = 0;
    self.x = Math.random() * canvasWidth;
  }

  return self;
}