var card02 = $('.card-02');
var imageList = $('.card-02-top__img-list');
var imageContainer = $('.card-02-top__img-container');
var title = $('.card-02-bottom__title');
var description = $('.card-02-bottom__description');

$(card02).on('mousemove', function (event) {
  var x = (window.innerWidth / 2 - event.pageX) / 17;
  var y = (window.innerHeight / 2 - event.pageY) / 17;
  card02[0].style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
});

$(card02).on('mouseenter', function () {
  card02[0].style.transition = 'none';
  imageList[0].style.transform = `translateZ(150px)`;
  title[0].style.transform = `translateZ(100px)`;
  title.addClass('shadow-active');
  description[0].style.transform = `translateZ(100px)`;
  description.addClass('shadow-active');
  imageContainer.addClass('shadow-active');
});

$(card02).on('mouseleave', function () {
  card02[0].style.transition = 'all 0.5s ease-out';
  imageList[0].style.transform = `translateZ(0px)`;
  title[0].style.transform = `translateZ(0px)`;
  title.removeClass('shadow-active');
  description[0].style.transform = `translateZ(0px)`;
  description.removeClass('shadow-active');
  imageContainer.removeClass('shadow-active');

  card02[0].style.transform = `rotateX(0deg) rotateY(0deg)`;

});

