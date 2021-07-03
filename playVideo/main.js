var playButton = $('.main-block__play-button');
var buttonLeft = Math.ceil(window.innerWidth / 4 * 3 - 150);
var buttonTop = Math.ceil(window.innerHeight / 10 * 7);
var isIframeMovie = false;

playButton.css('transition', 'none');
playButton.css('transform', `translate(${buttonLeft}px, ${buttonTop}px)`);
setTimeout(function () {
  playButton.css('transition', 'transform .2s ease-out');
}, 0);


$('.main-block__left').on('mousemove', function (e) {
  if (isIframeMovie) {
    return;
  }
  var x = e.offsetX;
  var y = e.offsetY;
  playButton.css('transform', `translate(${x - 25}px, ${y - 25}px)`);
  playButton.addClass('circle-active');

});

$('.main-block__left').on('mouseleave', function (e) {
  if (isIframeMovie) {
    return;
  }
  playButton.removeClass('circle-active');
  playButton.css('transform', `translate(${buttonLeft}px, ${buttonTop}px)`);
});

$('.main-block__play-button, .main-block__left').on('click', function () {
  if (isIframeMovie) {
    return;
  }
  $('.main-block__left').trigger('mouseleave');
  isIframeMovie = true;
  $('iframe').attr('src', 'https://www.youtube.com/embed/qm0IfG1GyZU?autoplay=1&mute=1');
  $('iframe').css('pointer-events', 'all');
})


// https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com