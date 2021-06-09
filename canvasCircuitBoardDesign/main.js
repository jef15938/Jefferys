var activePageId = '3';
$('.bottom-choose').on('click', '>.bottom-choose__item', function (event) {
  var eventTarget = $(event.currentTarget);
  var targetId = eventTarget.attr('id');

  if (activePageId === targetId) {
    return;
  }

  activePageId = targetId;


  $('.bottom-choose__item').removeClass('active');
  $('.bottom-choose__item[id="' + targetId + '"]').addClass('active');

  if (targetId === '1') {
    $('.main-block').css('transform', 'translate(0px, 0px)');
    var iframe = $('.main-block__1').find('iframe')[0];
    iframe.src = iframe.src;
  }
  else if (targetId === '2') {
    $('.main-block').css('transform', 'translate(-1440px, 0px)');
  }
  else if (targetId === '3') {
    $('.main-block').css('transform', 'translate(-720px, -766px)');
  }
  else if (targetId === '4') {
    $('.main-block').css('transform', 'translate(0px, -1532px)');
  }
  else if (targetId === '5') {
    $('.main-block').css('transform', 'translate(-1440px, -1532px)');
  }
});

// 總 Canvas
function initialMainCanvas() {
  var mainCanvasWidth = 1440 * 2;
  var mainCanvasHeight = 766 * 3;
  var mainCanvas = $('.main-block__canvas')[0];
  var mainCanvasCtx = mainCanvas.getContext('2d');
  mainCanvas.width = mainCanvasWidth;
  mainCanvas.height = mainCanvasHeight;


  // mainCanvasCtx.fillStyle = 'black';
  // 左上角
  mainCanvasCtx.beginPath();
  mainCanvasCtx.lineWidth = 15;
  var centerBlockX = 1440 / 2;
  var centerBlockY = 766;
  var circuitBoardX = centerBlockX + ((1440 - 400) / 2) + 50;
  var circuitBoardY = centerBlockY + ((766 - 400) / 2) + 50;
  mainCanvasCtx.moveTo(centerBlockX, centerBlockY + 5);
  mainCanvasCtx.lineTo(circuitBoardX + 5, circuitBoardY);
  mainCanvasCtx.closePath();
  mainCanvasCtx.stroke();

  // 右上
  mainCanvasCtx.beginPath();
  mainCanvasCtx.moveTo(centerBlockX + 1440, centerBlockY + 5);
  mainCanvasCtx.lineTo(circuitBoardX + 300 - 5, circuitBoardY);
  mainCanvasCtx.closePath();
  mainCanvasCtx.stroke();

  // 左下
  mainCanvasCtx.beginPath();
  mainCanvasCtx.moveTo(centerBlockX, centerBlockY + 766 - 5);
  mainCanvasCtx.lineTo(circuitBoardX + 5, circuitBoardY + 300);
  mainCanvasCtx.closePath();
  mainCanvasCtx.stroke();

  // 右下
  mainCanvasCtx.beginPath();
  mainCanvasCtx.moveTo(centerBlockX + 1440, centerBlockY + 766 - 5);
  mainCanvasCtx.lineTo(circuitBoardX + 300 - 5, circuitBoardY + 300);
  mainCanvasCtx.closePath();
  mainCanvasCtx.stroke();





}
// 中央電路板
function initialCenterCircuitBoardCanvas() {
  var circuitBoardWidth = 400;
  var circuitBoardHeight = 400;
  var canvasCircuitBoard = $('.circuit-board')[0];
  var circuitBoardCtx = canvasCircuitBoard.getContext('2d');
  canvasCircuitBoard.width = circuitBoardWidth;
  canvasCircuitBoard.height = circuitBoardHeight;

  circuitBoardCtx.fillStyle = 'black';
  circuitBoardCtx.fillRect(50, 50, circuitBoardWidth - 100, circuitBoardHeight - 100);

  circuitBoardCtx.lineWidth = 10;
  var numberOfNeedle = 15;
  var xGap = (circuitBoardWidth - 100) / numberOfNeedle;
  var yGap = (circuitBoardHeight - 100) / numberOfNeedle;
  for (var i = 0; i < numberOfNeedle; i++) {
    var verticalLineX = 50 + circuitBoardCtx.lineWidth + i * xGap;
    circuitBoardCtx.beginPath();
    circuitBoardCtx.moveTo(verticalLineX, 0);
    circuitBoardCtx.lineTo(verticalLineX, circuitBoardHeight);
    circuitBoardCtx.closePath();
    circuitBoardCtx.stroke();

    var horizontalY = 50 + circuitBoardCtx.lineWidth + i * yGap;
    circuitBoardCtx.beginPath();
    circuitBoardCtx.moveTo(0, horizontalY);
    circuitBoardCtx.lineTo(circuitBoardWidth, horizontalY);
    circuitBoardCtx.closePath();
    circuitBoardCtx.stroke();

  }

  circuitBoardCtx.fillStyle = 'white';
  circuitBoardCtx.arc(circuitBoardWidth / 2, circuitBoardHeight / 2, 40, 0, Math.PI * 2);
  circuitBoardCtx.fill();
}

initialCenterCircuitBoardCanvas();
initialMainCanvas();


