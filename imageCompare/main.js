var backImage = $($('.main__img-container')[0]);
var circleImage = $($('.main__img-container')[1]);
var circleRadius = 150;

var backImageOffsetTop = backImage.offset().top;
var backImageOffsetLeft = backImage.offset().left;
var backImageWidth = backImage.outerWidth();
var backImageHeight = backImage.outerHeight();

$(backImage).on('mousemove', function (e) {
  var x = e.pageX - backImageOffsetLeft;
  var y = e.pageY - backImageOffsetTop;
  if (x > circleRadius && x < backImageWidth - circleRadius && y > circleRadius && y < backImageHeight - circleRadius) {
    circleImage.css('clip-path', `circle(${circleRadius}px at ${x}px ${y}px)`);
  }
  else {
    circleImage.css('transition', 'clip-path 0.2s');
    circleImage.css('clip-path', `circle(0px at ${x}px ${y}px)`);
    setTimeout(function () {
      circleImage.css('transition', '');
    }, 250);
  }
});
