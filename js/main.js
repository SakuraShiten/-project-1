$(document).ready(function () {
  let viewheight = $(window).height();
  let viewwidth = $(window).width();
  let viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute(
    "content",
    "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0"
  );
  $('.footer-udev').on('click',function(){
    window.open('https://www.instagram.com/udev.ru/');
  });
  $('.header-tel').on("click", function () {
    $('.block-overfon').fadeIn(300);
  });
  $('.block-overfon-btn-close').on("click", function () {
    $('.block-overfon').fadeOut(300);
  });
  $('.block-overfon').on("click", function () {
    $('.block-overfon').fadeOut(300);
  });
  $('.block-overfon-tel1').on("click", function () {
    window.location.href="tel:+7 (347) 227-16-16";
  });
  $('.block-overfon-tel2').on("click", function () {
    window.location.href="tel:+7 (347) 227-15-15";
  });
  $('.block-overfon-tel3').on("click", function () {
    window.location.href="tel:+7 (347) 973-33-65";
  });
  $('.header-tel-smart').on("click ", function (){
    $('.header-tel').click();
  });
   $('.footer-pol').on("click", function () {
    window.open("/polic.pdf");
  });
  $('.block-request').find('h3').on("click", function () {
    window.open("/polic.pdf");
  });
  $('.main-block-konstr-right').find('h3').on("click", function () {
    window.open("/polic.pdf");
  });
  if (window.matchMedia("(max-width: 500px)").matches) {
    $(".block-header-smart").show();
    $("#hamburger").on("click", function () {
      if (smartT == false) {
        smartT = true;
        $(this).removeClass("hamburger");
        $(this).addClass("close-hamburger");
        $(".block-header-smart-content").css("height", "0");
        $(".block-header-smart-content").show();
        $(".block-header-smart-content").animate(
          {
            height: "35vh",
          },
          300
        );
      } else {
        smartT = false;
        $(this).removeClass("close-hamburger");
        $(this).addClass("hamburger");
        $(".block-header-smart-content").animate(
          {
            height: "0vh",
          },
          300,
          function () {
            $(".block-header-smart-content").hide();
          }
        );
      }
    });
  }

  $(".location-adress")
    .find("h5")
    .each(function () {
      $(this).on("click ", function () {
          window.location.href=`tel:${$(this).text()}`;
      });
    });
  $("#nav-1").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-about-us").offset().top,
      },
      600
    );
  });

  $("#nav-2").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-about-us").offset().top,
      },
      600
    );
  });

  $("#nav-3").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-review").offset().top,
      },
      600
    );
  });

  $("#nav-4").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-location").offset().top,
      },
      600
    );
  });

  $("#navv-1").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-about-us").offset().top,
      },
      600
    );
  });

  $("#navv-2").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-about-us").offset().top,
      },
      600
    );
  });

  $("#navv-3").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-review").offset().top,
      },
      600
    );
  });

  $("#navv-4").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-location").offset().top,
      },
      600
    );
  });

  $("#btn-header-nav-order").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-construct").offset().top,
      },
      600
    );
  });

  $("#navf-1").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-about-us").offset().top,
      },
      600
    );
  });

  $("#navf-2").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-about-us").offset().top,
      },
      600
    );
  });

  $("#navf-3").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-review").offset().top,
      },
      600
    );
  });

  $("#navf-4").on("click ", function () {
    $("html, body").animate(
      {
        scrollTop: $(".block-location").offset().top,
      },
      600
    );
  });
});
let smartT = false;
function setCursorPosition(pos, e) {
  e.focus();
  if (e.setSelectionRange) e.setSelectionRange(pos, pos);
  else if (e.createTextRange) {
    var range = e.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
}

function mask(e) {
  var matrix = this.placeholder,
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, "");
  def.length >= val.length && (val = def);
  matrix = matrix.replace(/[_\d]/g, function (a) {
    return val.charAt(i++) || "_";
  });
  this.value = matrix;
  i = matrix.lastIndexOf(val.substr(-1));
  i < matrix.length && matrix != this.placeholder
    ? i++
    : (i = matrix.indexOf("_"));
  setCursorPosition(i, this);
}
window.addEventListener("DOMContentLoaded", function () {
  var input = document.querySelector("#online_phone");
  input.addEventListener("input", mask, false);
  input1 = document.querySelector("#online_phone_1");
  input1.addEventListener("input", mask, false);
});
