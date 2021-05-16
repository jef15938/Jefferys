const loadingWidthElements = $("[loading-width]");
const loadingHeightElements = $("[loading-height]");
const loadingColorElements = $("[loading-color]");

function setLoadingSize() {
  loadingWidthElements.each(function (index, element) {
    const loadingWidth = $(element).attr("loading-width");
    $(element).css("width", loadingWidth);
  });

  loadingHeightElements.each(function (index, element) {
    const loadingHeight = $(element).attr("loading-height");
    $(element).css("height", loadingHeight);
  });
}

function setLoadingColor() {
  loadingColorElements.each(function (index, element) {
    const loadingColor = $(element).attr("loading-color");
    const originBackground = $(element).css("background");
    const originColor = $(element).css("color");
    $(element).data("origin-background", originBackground);
    $(element).data("origin-color", originColor);
    $(element).css("background", loadingColor);
    $(element).css("color", loadingColor);
  });
}

function setSizeAuto() {
  loadingWidthElements.each(function (index, element) {
    $(element).css("width", "auto");
  });

  loadingHeightElements.each(function (index, element) {
    $(element).css("height", "auto");
  });
}

function restoreColor() {
  loadingColorElements.each(function (index, element) {
    const originBackground = $(element).data("origin-background");
    const originColor = $(element).data("origin-color");
    $(element).css("background", originBackground);
    $(element).css("color", originColor);
  });
}

setLoadingSize();
setLoadingColor();


// fetchData
setTimeout(function () {
  // card1
  // img
  $(".main-card--1 .main-card__image img").attr(
    "src",
    "https://img.technews.tw/wp-content/uploads/2020/02/19193726/Crew-Dragon.jpg"
  );

  // title
  $(".main-card--1 .main-card__title").text("太空梭");

  // description
  $(".main-card--1 .main-card__description").text(
    "太空梭（英語：Space Shuttle）是美國國家航空暨太空總署1981至2011年運作的近地軌道太空載具，有一定重複使用空間，正式專案名稱「航太運輸系統」（Space Transportation System）。"
  );

  // card2
  // img
  $(".main-card--2 .main-card__image img").attr(
    "src",
    "https://cdn.unwire.pro/wp-content/uploads/2015/09/satellite.jpg"
  );

  // title
  $(".main-card--2 .main-card__title").text("人造衛星");

  // description
  $(".main-card--2 .main-card__description").text(
    "人造衛星（英語：Satellite），在不產生歧義的情況下亦稱衛星，是由人類建造的太空載具的一種，是數量最多的一種。人造衛星以太空飛行載具如運載火箭、太空梭等發射到太空中，像天然衛星一樣環繞地球或其它行星運行。通訊衛星就是在地球軌道上，放置衛星，以作為地面微波與廣播站間的通訊媒介。雖然通訊衛星的造價很高，但由於能傳輸大量的資訊，而且免除架設的費用，因此對於長距離的傳輸仍是最普遍與最經濟的方法；因為一個通訊衛星所傳播的地域相當的大，只要三個通訊衛星就能涵蓋地球上大部分的地域。人造衛星除了自身具備的功能以外，也衍伸出太空垃圾的隱憂，值得後人關注與解決。"
  );



  setSizeAuto();
  restoreColor();
  $(".main__card").removeClass("loading");
}, 5000);
