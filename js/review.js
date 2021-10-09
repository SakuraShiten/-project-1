$(document).ready(function () {
  $.post("/php/review.php", {}).done(function (result) {
    reviewMassTextAndName = JSON.parse(result);
    $(".scroll-review-btn-center div").on("click ", function () {
      reviewCurrentPos = $(this).attr("sliderTarget");
      $(".scroll-review-btn-center div").css({
        width: "1.11vh",
        height: "1.11vh",
      });
      $(".scroll-review-btn-center div")
        .mouseover(function () {
          $(this).css({
            width: "2vh",
            height: "2vh",
          });
        })
        .mouseout(function () {
          $(this).css({
            width: "1.11vh",
            height: "1.11vh",
          });
        });
      $(this).unbind("mouseout mouseover");
      $(this).css({
        width: "2vh",
        height: "2vh",
      });
      reviewIni();
    });
    reviewIni();
  });
  $(".scroll-review-btn-left").on("click ", function () {
    reviewCurrentPos--;
    reviewCurrentPos = reviewCurrentPos < 0 ? 4 : reviewCurrentPos;
    reviewIni();
  });
  $(".scroll-review-btn-right").on("click ", function () {
    reviewCurrentPos++;
    reviewCurrentPos = reviewCurrentPos > 4 ? 0 : reviewCurrentPos;
    reviewIni();
  });
});
let reviewMassTextAndName;
let reviewCurrentPos = 0;
function reviewIni() {
  $(".scroll-review-btn-center div").css({
    width: "1.11vh",
    height: "1.11vh",
  });
  $(".scroll-review-btn-center div")
    .mouseover(function () {
      $(this).css({
        width: "2vh",
        height: "2vh",
      });
    })
    .mouseout(function () {
      $(this).css({
        width: "1.11vh",
        height: "1.11vh",
      });
    });
  $(".scroll-review-btn-center")
    .find(`div[sliderTarget='${reviewCurrentPos}']`)
    .unbind("mouseout mouseover");
  $(".scroll-review-btn-center")
    .find(`div[sliderTarget='${reviewCurrentPos}']`)
    .css({
      width: "2vh",
      height: "2vh",
    });
  $(".review-text").find("h3").fadeOut(200);
  $(".review-text").find("p").fadeOut(200);
  $(".review-image").find("img").fadeOut(200);
  $(".scroll-review").fadeOut(200);


  setTimeout(function () {
    
    $(".review-text").empty();
    htmlH3 = `<h3 style="display:none;"'>${reviewMassTextAndName[reviewCurrentPos][0]}</h3>`;
    htmlP = `<p style="display:none;">${reviewMassTextAndName[reviewCurrentPos][1]}</p>`;
    $(".review-text").append(htmlH3).append(htmlP);
    $(".review-text").find("h3").fadeIn(200);
    $(".review-text").find("p").fadeIn(200);
    $(".scroll-review").fadeIn(200);
    $(".review-image").find("img").fadeIn(200);
    
    $(".review-image img").attr(
      "src",
      `../imageReviews/${+reviewCurrentPos+1}.jpg`
    );
  }, 200);
}
