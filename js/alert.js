function callAlert(check, text) {
  let html = `<div class="alert-box" style="display:none"><p>${text}</p></div>`;
  $("body").append(html);
  if (check) {
    $(".alert-box").css("background-color", `rgb(0, 146, 7)`);
    $(".alert-box").css("color", `#rgb(0, 146, 7)`);
  } else {
    $(".alert-box").css("background-color", `rgb(204, 0, 0)`);
    $(".alert-box").css("color", `#rgb(0, 146, 7)`);
  }
  $(".alert-box").fadeIn(300);
  setTimeout(() => {
    $(".alert-box").fadeOut(300);
  }, 2000);
}
