$(document).ready(function () {
  $(".request-btn").on("click ", function () {
    let FIO = $(".request-name").val();
    let tel = $(".request-phone").val();
    let regexp = /^[А-Яа-я\s]+$/i;
    let testFIO = FIO.replace(/\s/g, "");

    if (!regexp.test(testFIO) || testFIO.length < 4) {
      callAlert(false, "Введите корректное ФИО");
      return;
    }
    regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    if (!regexp.test(tel)) {
      callAlert(false, "Введите корректный телефон");
      return;
    }
    callAlert(true, "Заявка отправлена");
    $.post("/php/requisitionTel.php", {
      FIO: FIO,
      tel: tel,
    });
    $(".request-btn").off('click ');
    $(".request-btn").on("click ", function () {
        callAlert(false, "Вы уже оставили заявку");
    });
  });
});
