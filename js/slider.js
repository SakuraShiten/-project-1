$(document).ready(function () {
  if (window.matchMedia("(max-width: 500px)").matches) {
    let wb = $(".gallery-header").height();

    $(".gallery-header").css("height", "0px");
    $(".mob-btn-gallery").on("click", function () {
      if (sshow) {
        $(".gallery-header").animate(
          {
            height: "0px",
          },
          300
        );
        sshow = false;
      } else {
        $(".gallery-header").animate(
          {
            height: `${wb}px`,
          },
          300
        );
        sshow = true;
      }
    });
  }
  for (let i = 1; i < 7; i++) {
    $.post("/php/checkCountImageGallery.php", {
      id: i,
    }).done(function (result) {
      
      let endR = JSON.parse(result);
      for (let obj in endR) {
        masUrl[i - 1].push(endR[obj]);
      }
      if (i == 6) {
        getUrlImage();
      }
    });
  }
  setTimeout(function () {
      responsive();
    },250);
  $('.gallery-main-slider').find('img').on("mousemove",function () {
    $(".hover-zoom").show();
      $(".hover-zoom").css("width", $(".gallery-main-slider").find('img').css("width"));
    });
   $('.gallery-main-slider').find('.hover-zoom').on("mousemove",function () {
    
      $(".hover-zoom").css("width", $(".gallery-main-slider").find('img').css("width"));
    });
});
let sshow = false;
let masUrl = [[],[],[],[],[],[]];
let posUrl = 0;
let posBlock = 1;
function getUrlImage() {
  gLoader(posBlock, posUrl);
  hoverR();
  $(".gallery-btn-left").on("click", function () {
    let maxCountImage = masUrl[posBlock - 1].length;
    maxCountImage--;
    posUrl--;
    posUrl = posUrl > maxCountImage ? 0 : posUrl;
    posUrl = posUrl < 0 ? maxCountImage : posUrl;
    gLoader(posBlock, posUrl);
  });
  $(".gallery-btn-right").on("click", function () {
    let maxCountImage = masUrl[posBlock - 1].length;
    maxCountImage--;
    posUrl++;
    posUrl = posUrl > maxCountImage ? 0 : posUrl;
    posUrl = posUrl < 0 ? maxCountImage : posUrl;
    gLoader(posBlock, posUrl);
  });
  $(".gallery-header-btn-hover").on("click", function () {
    if (window.matchMedia("(max-width: 500px)").matches) {
      $(".gallery-header").animate(
        {
          height: "0px",
        },
        300
      );
      sshow = false;
    }
    $(".mob-btn-gallery").find("p").text($(this).find("p").text());
    $(".gallery-header-btn-active").removeClass("gallery-header-btn-active");
    $(this).addClass("gallery-header-btn-active");
    posBlock = $(this).attr("idgallerypos");
    posUrl = 0;
    gLoader(posBlock, posUrl);
    setTimeout(function () {
      responsive();
    },250);
  });
}
function gLoader(posBlock, posUrl) {
  $(".gallery-main-slider").find("img").fadeOut(500);
  $(".gallery-images-footer-1").find("img").fadeOut(500);
  $(".gallery-images-footer-2").find("img").fadeOut(500);
  $(".gallery-images-footer-3").find("img").fadeOut(500);
 setTimeout(function () {
    let maxCountImage = masUrl[posBlock - 1].length;
    maxCountImage--;
    $(".gallery-main-slider")
      .find("img")
      .attr("src", `../gallery/${posBlock}/${masUrl[posBlock - 1][posUrl]}?${makeid()}`);
    posUrl++;
    posUrl = posUrl > maxCountImage ? 0 : posUrl;
    posUrl = posUrl < 0 ? maxCountImage : posUrl;
    $(".gallery-images-footer-1")
      .find("img")
      .attr("src", `../gallery/${posBlock}/${masUrl[posBlock - 1][posUrl]}?${makeid()}`);
    posUrl++;
    posUrl = posUrl > maxCountImage ? 0 : posUrl;
    posUrl = posUrl < 0 ? maxCountImage : posUrl;
    $(".gallery-images-footer-2")
      .find("img")
      .attr("src", `../gallery/${posBlock}/${masUrl[posBlock - 1][posUrl]}?${makeid()}`);
    posUrl++;
    posUrl = posUrl > maxCountImage ? 0 : posUrl;
    posUrl = posUrl < 0 ? maxCountImage : posUrl;
    $(".gallery-images-footer-3")
      .find("img")
      .attr("src", `../gallery/${posBlock}/${masUrl[posBlock - 1][posUrl]}?${makeid()}`);
    hoverR();
   },250);
   setTimeout(function () {
    $(".gallery-main-slider").find("img").fadeIn(500);
    $(".gallery-images-footer-1").find("img").fadeIn(500);
    $(".gallery-images-footer-2").find("img").fadeIn(500);
    $(".gallery-images-footer-3").find("img").fadeIn(500);
},450);
  setTimeout(function () {
      responsive();
    },250);
}
function hoverR() {
  $(".hover-zoom").css("width", $(".gallery-main-slider").find('img').css("width"));
  setTimeout(function () {
    $(".hover-zoom-footer").each(function () {
      $(this).css("width", $(this).siblings("img").css("width"));
    });
  }, 250);
  
}
function responsive() {
 

  $(".hover-zoom").click(function () {
    let html =
      '<div class="block-zoom-all-screen"><div></div>  <span class="close"></span></div>';
    $("body").append(html);
    $(".close").on("click", function () {
      $(".block-zoom-all-screen").remove();
    });
    $(".block-zoom-all-screen").on("click", function () {
      $(".block-zoom-all-screen").remove();
    });
    $(".block-zoom-all-screen")
      .find("div")
      .css(
        "background-image",
        `url(${$(".gallery-main-slider").find("img").attr("src")})`
      );
  });

  $(".hover-zoom-footer").css(
    "height",
    $(".gallery-images-footer-1").css("height")
  );

  $(".hover-zoom-footer").click(function () {
    let html =
      '<div class="block-zoom-all-screen"><div></div>  <span class="close"></span></div>';
    $("body").append(html);
    $(".close").on("click", function () {
      $(".block-zoom-all-screen").remove();
    });
    $(".block-zoom-all-screen").on("click", function () {
      $(".block-zoom-all-screen").remove();
    });
    $(".block-zoom-all-screen")
      .find("div")
      .css("background-image", `url(${$(this).siblings("img").attr("src")})`);
  });
  $(".hover-zoom").css(
    "width",
    $(".gallery-main-slider").find("img").css("width")
  );
  setTimeout(function () {
    $(".hover-zoom-footer").each(function () {
      $(this).css("width", $(this).siblings("img").css("width"));
    });
  }, 250);
}
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}