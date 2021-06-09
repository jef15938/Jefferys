var mainCanvasWidth = Math.min(window.innerWidth, 944);
var mainCanvasHeight = Math.ceil(window.innerHeight / 6) * 5;
var mainCanvas = $('.main__canvas')[0];
var mainCtx = mainCanvas.getContext('2d');



mainCanvas.width = mainCanvasWidth;
mainCanvas.height = mainCanvasHeight;

var numberOfAnswer = 1000;
var showAnswerRows = 5;
var answerList = [];
var correctCount = 0;
var numberOfcolumns = 3;
var xGap = Math.ceil(mainCanvasWidth / 3);
var yGap = Math.ceil(mainCanvasHeight / showAnswerRows);


function initial() {
  for (var i = 0; i < numberOfAnswer; i++) {
    answerList.push(Math.floor((Math.random() * 3)) + 1);
  }
  drawCanvas();

}
function drawCanvas() {


  mainCtx.clearRect(0, 0, mainCanvasWidth, mainCanvasHeight);


  mainCtx.fillStyle = 'black';
  mainCtx.lineWidth = 5;
  mainCtx.strokeStyle = 'white';

  for (var i = 0; i < showAnswerRows; i++) {
    var answer = answerList[i];
    var x = (answer - 1) * xGap;
    var y = (showAnswerRows - i - 1) * yGap;
    mainCtx.fillRect(x, y, xGap, yGap);
    mainCtx.strokeRect(x, y, xGap, yGap);
  }


}

function bindClickEvent() {
  $('.main-control-board').on('click', '.main-control-board__button', function (event) {
    var currentTarget = $(event.currentTarget);
    var id = Number(currentTarget.attr('id'));

    console.log(id);
    console.log(answerList[0]);
    if (id === answerList[0]) {
      correctCount++;
      answerList = answerList.slice(1);
      drawCanvas();
    }

  });
}

initial();
bindClickEvent()
