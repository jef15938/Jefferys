var touchtime = 0;

$(document).ready(function () {
  setTimeout(function () {
    playLoading();
  }, 1000);
});

// double click playingLoading
$(window).on("click", function () {
  if (touchtime == 0) {
    // set first click
    touchtime = new Date().getTime();
  } else {
    // compare first click to this click and see if they occurred within double click threshold
    if (new Date().getTime() - touchtime < 300) {
      // double click occurred
      playLoading();
      touchtime = 0;
    } else {
      // not a double click so set as a new first click
      touchtime = new Date().getTime();
    }
  }
});

// playingLoading function
function playLoading() {
  // logo
  const lineJqueryDom = $(".main-logo-container-line-container__line");
  lineJqueryDom.css("transition-duration", "0s");
  lineJqueryDom.css("top", "100%");
  setTimeout(function () {
    lineJqueryDom.css("transition-duration", "5s");
    lineJqueryDom.css("top", "0px");
  }, 0);

  // border
  const borderJqueryDom = $(".svg-wrapper .shape");
  borderJqueryDom.css("transition-duration", "0s");
  borderJqueryDom.css("transition-delay", "0s");
  borderJqueryDom.css("stroke-width", "0px");
  borderJqueryDom.css("stroke-dashoffset", "-1320px");
  borderJqueryDom.css("stroke-dasharray", "0");
  setTimeout(function () {
    borderJqueryDom.css("transition-duration", "3s");
    borderJqueryDom.css("transition-delay", "2.5s");
    borderJqueryDom.css("stroke-width", "8px");
    borderJqueryDom.css("stroke-dashoffset", "0px");
    borderJqueryDom.css("stroke-dasharray", "1320px");
  }, 0);
}
