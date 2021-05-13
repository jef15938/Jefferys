$(document).on("click", "#switch-checkbox", (event) => {

  const isCheck = $(event.currentTarget).is(":checked");

  // checked (黑夜)
  if (isCheck) {
    $(".main").addClass("night");
    $(".main__center-circle").addClass("night");
    $(".moon").addClass("down");
    $(".sun").addClass("down");

    $(".main").removeClass("day");
    $(".main__center-circle").removeClass("day");
    $(".moon").removeClass("up");
    $(".sun").removeClass("up");

    // not checked (白天)
  } else {
    $(".main").removeClass("night");
    $(".main__center-circle").removeClass("night");
    $(".moon").removeClass("down");
    $(".sun").removeClass("down");

    $(".main").addClass("day");
    $(".main__center-circle").addClass("day");
    $(".moon").addClass("up");
    $(".sun").addClass("up");
  }
});
