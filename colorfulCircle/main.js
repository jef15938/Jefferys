var Square = function (selector, left, top, width, height) {
  this.selector = selector;
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
}

var squareList = [
  new Square('.main__circle--1', '0vw', '35vh', '15vh', '15vh'),
  new Square('.main__circle--2', '5vw', '65vh', '15vh', '15vh'),
  new Square('.main__circle--3', '15vw', '5vh', '30vh', '30vh'),
  new Square('.main__circle--4', '30vw', '50vh', '40vh', '40vh'),
  new Square('.main__circle--5', '50vw', '20vh', '25vh', '25vh'),
  new Square('.main__circle--6', '75vw', '70vh', '25vh', '25vh'),
  new Square('.main__circle--7', '85vw', '15vh', '50vh', '50vh'),
]

squareList.forEach(function (value, index) {
  $(value.selector).css({ 'left': value.left });
  $(value.selector).css({ 'top': value.top });
  $(value.selector).css({ 'width': value.width });
  $(value.selector).css({ 'height': value.height });
  $(value.selector).css({ 'transform': 'translate(0px, 0px)' });
});


$(window).on('mousemove', function (e) {
  var x = e.pageX;
  var Y = e.pageY;

  // 滑鼠在中間
  if (x === halfWindowWidth) {
    $('.main__circle').css({ 'transform': 'translate(0px, 0px)' });
  }

  else {

    $('.main__circle').each(function (index, element) {
      var translateXIndex = Math.abs(index - 3) % 4;
      var translateX = (translateXIndex + 1) * 150;
      var middleDistance = Math.abs(x - halfWindowWidth);

      // 滑鼠在左邊
      if (x < halfWindowWidth) {
        translateX = translateX * middleDistance * 0.0003
      }
      // 滑鼠在右邊
      else if (x > halfWindowWidth) {
        translateX = translateX * middleDistance * -0.0003;
      }
      $(element).css({ 'transform': 'translateX(' + translateX + 'px)' });
    });
  }
});

var oneThirdWindowWidth = Math.floor(window.innerWidth / 3);
var halfWindowWidth = Math.floor(window.innerWidth / 2);
$(window).on('resize', function () {
  oneThirdWindowWidth = Math.floor(window.innerWidth / 3);
  halfWindowWidth = Math.floor(window.innerWidth / 2);
})