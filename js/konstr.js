$(document).ready(function () {
  massObj.push(obj1);
  massObj.push(obj2);
  massObj.push(obj3);
  massObj.push(obj4);
  massObj.push(obj5);
  massObj.push(obj6);
  massObj.push(obj7);
  massObj.push(obj8);
  massObj.push(obj9);

  step1();
});
function step1() {
  massSelected = [];
  $(".konst-step-text").text("");
  $(".konst-q-back").unbind("click");
  $(".konst-item-icon").unbind("click");
  $(".konst-q-next").unbind("click");
  selectObject = null;
  let html = `<div class="konst-item-icon konst-item-icon-i-1" konstrselectstart="0">
  <div></div>
  <p>Шкафы-купе</p>
</div>
<div class="konst-item-icon konst-item-icon-i-2" konstrselectstart="1">
  <div></div>
  <p>Прихожие</p>
</div>
<div class="konst-item-icon konst-item-icon-i-3" konstrselectstart="2">
  <div></div>
  <p>Кухни на заказ</p>
</div>
<div class="konst-item-icon konst-item-icon-i-4" konstrselectstart="3">
  <div></div>
  <p>Гостиные</p>
</div>
<div class="konst-item-icon konst-item-icon-i-5" konstrselectstart="4">
  <div></div>
  <p>Детская мебель</p>
</div>
<div class="konst-item-icon konst-item-icon-i-6" konstrselectstart="5">
  <div></div>
  <p>Спальни и кровати</p>
</div>
<div class="konst-item-icon konst-item-icon-i-7" konstrselectstart="6">
  <div></div>
  <p>Косметические столы</p>
</div>
<div class="konst-item-icon konst-item-icon-i-8" konstrselectstart="7">
  <div></div>
  <p>Комоды</p>
</div>
<div class="konst-item-icon konst-item-icon-i-9" konstrselectstart="8">
  <div></div>
  <p>Офисная мебель</p>
</div>`;
  $(".konstr-content").append(html);
  $(".konst-item-icon").on("click", function () {
    selectObject = $(this).attr("konstrselectstart");
    $(".konst-item-icon").removeClass("konst-item-icon-active");
    $(this).addClass("konst-item-icon-active");
  });
  $(".konst-q-next").on("click", function () {
    if (selectObject == null) {
      callAlert(false, "Выберите один из вариантов");
      return;
    }
    massSelected.push(
      $(`.konst-item-icon[konstrselectstart="${selectObject}"]`)
        .find("p")
        .text()
    );
    $(".konstr-content").children().fadeOut(300);
    setTimeout(function () {
      $(".konstr-content").empty();
      step2();


      
    }, 300);
  });
}
function step2() {
  $("html, body").animate(
    {
      scrollTop: $(".main-block-konstr").offset().top-80,
    },
    600
  );
  maxPosStep = massObj[selectObject]["questions"].length;
  $(".konst-q-back").unbind("click");
  $(".konst-q-next").unbind("click");
  posStep++;
  if (posStep == 1) {
    $(".konst-q-back").on("click", function () {
      $(".konst-q-back").unbind("click");
      posStep = 0;
      $(".konstr-content").children().fadeOut(300);
      $(".konstr-header-q").fadeOut(300);
      setTimeout(function () {
        $(".konstr-content").empty();
        $(".konstr-header-q").text("Какой тип мебели Вам необходим?");
        $(".konst-item-icon").fadeIn(300);
        $(".konstr-header-q").fadeIn(300);
        step1();
      }, 300);
    });
  } else {
    $(".konst-q-back").on("click", function () {
      $(".konst-q-back").unbind("click");
      massSelected.pop();
      posStep--;
      posStep--;
      $(".konstr-content").children().fadeOut(300);
      setTimeout(function () {
        $(".konstr-content").empty();
        step2();
      }, 300);
    });
  }
  if (posStep == maxPosStep) {
    $(".konstr-header-q").fadeOut(300);
    $(".konstr-content").children().fadeOut(300);
    setTimeout(function () {
      $(".konstr-header-q").text("Габариты места установки (см)");
      $(".konstr-header-q").fadeIn(300);
      $(".konstr-content").empty();
      step3();
    }, 300);
    return;
  }
  $(".konst-step-text").text(`Шаг ${posStep} из ${maxPosStep + 1}`);
  $(".konstr-header-q").fadeOut(300);
  setTimeout(function () {
    $(".konstr-header-q").text(
      massObj[selectObject]["questions"][posStep - 1]["header"]
    );
    $(".konstr-header-q").fadeIn(300);
  }, 300);
  for (let obj of massObj[selectObject]["questions"][posStep - 1]["answers"]) {
    let html = `<div class="konst-item-icon" konstrselectstart="0"><p>${obj}</p></div>`;
    $(".konstr-content").append(html);
  }
  let selectAnswer = null;
  $(".konst-item-icon").on("click", function () {
    selectAnswer = $(this).find("p").text();
    $(".konst-item-icon").removeClass("konst-item-icon-active");
    $(this).addClass("konst-item-icon-active");
  });
  $(".konst-q-next").on("click", function () {
    if (selectAnswer == null) {
      callAlert(false, "Выберите один из вариантов");
      return;
    }
    $(".konstr-content").children().fadeOut(300);
    setTimeout(function () {
      massSelected.push([
        massObj[selectObject]["questions"][posStep - 1]["header"],
        selectAnswer,
      ]);
      $(".konstr-content").empty();
      step2();
    }, 300);
  });
}
function step3() {
  $("html, body").animate(
    {
      scrollTop: $(".main-block-konstr").offset().top-80,
    },
    600
  );
  $(".konst-step-text").text(`Шаг ${maxPosStep} из ${maxPosStep + 1}`);
  $(".konst-q-next").unbind("click");
  $(".konst-q-back").unbind("click");
  $(".konst-q-back").on("click", function () {
    $(".konst-q-back").unbind("click");
    massSelected.pop();
    posStep--;
    posStep--;
    $(".konstr-content").children().fadeOut(300);
    setTimeout(function () {
      $(".konstr-content").css("flex-direction", "row");
      $(".konstr-content").empty();
      step2();
    }, 300);
  });
  $(".konstr-content").css("flex-direction", "column");
  let html = `<input id='konstr-1' class="konstr-input" oninput="konstrInput(event)" maxlength="50" placeholder="Ширина" type="text">`;
  $(".konstr-content").append(html);
  html = `<input id='konstr-2' class="konstr-input" oninput="konstrInput(event)" maxlength="50" placeholder="Глубина" type="text">`;
  $(".konstr-content").append(html);
  html = `<input id='konstr-3' class="konstr-input" oninput="konstrInput(event)" maxlength="50" placeholder="Высота" type="text">`;
  $(".konstr-content").append(html);
  $(".konst-q-next").on("click", function () {
    let k1 = $("#konstr-1").val();
    let k2 = $("#konstr-2").val();
    let k3 = $("#konstr-3").val();
    if (k1 == "" || k2 == "" || k3 == "") {
      callAlert(false, "Заполните все поля");
      return;
    }
    $(".konstr-header-q").fadeOut(300);
    $(".konstr-content").children().fadeOut(300);
    setTimeout(function () {
      $(".konstr-header-q").text("Оставьте свои контактные данные");
      $(".konstr-header-q").fadeIn(300);
      $(".konstr-content").empty();
      posStep++;
      $(".konst-step-text").text(`Шаг ${posStep} из ${maxPosStep + 1}`);
      massSelected.push(["Ширина", k1]);
      massSelected.push(["Глубина", k2]);
      massSelected.push(["Высота", k3]);
      step4();
    });
  });
}

function step4() {
  $('.main-block-konstr-right').find('h3').fadeIn(300);
  $("html, body").animate(
    {
      scrollTop: $(".main-block-konstr").offset().top-80,
    },
    600
  );
  $(".konst-q-next").unbind("click");
  $(".konst-q-back").unbind("click");
  $(".konst-q-back").on("click", function () {
    $(".konst-q-back").unbind("click");
    massSelected.pop();
    massSelected.pop();
    massSelected.pop();
    posStep--;
    posStep--;
    $('.main-block-konstr-right').find('h3').fadeOut(300);
    $(".konstr-header-q").fadeOut(300);
    $(".konstr-content").children().fadeOut(300);
    $("#online_phone_1").hide();
    setTimeout(function () {
      $(".konstr-header-q").text("Габариты места установки (см)");
      $(".konstr-header-q").fadeIn(300);
      $(".konstr-content").empty();
      step3();
    }, 300);
  });
  let html = `<input id='konstr-fio' class="konstr-input" oninput="konstrInput(event)" maxlength="50" placeholder="ФИО" type="text">`;
  $(".konstr-content").append(html);
  $("#online_phone_1").show();
  $(".konst-q-next").on("click", function () {
    let FIO = $("#konstr-fio").val();
    let tel = $("#online_phone_1").val();
    regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    if (!regexp.test(tel)) {
      callAlert(false, "Введите корректный телефон");
      return;
    }
    if (FIO == "") {
      callAlert(false, "Введите ФИО");
      return;
    }
    massSelected.unshift(FIO);
    massSelected.unshift(tel);
    $(".main-block-konstr-left").remove();
    $(".main-block-konstr-right").remove();
    $(".konst-end").fadeIn(300);
    $.post("/php/addKonstr.php", {
      mass: massSelected,
    }).done(function (result) {
      console.log(result);
    });
  });
}

let posStep = 0; 
let maxPosStep = null; 
let massSelected = []; 
let selectObject = null; 
let massObj = []; 
let obj1 = {
  header: "Шкафы-купе",
  questions: [
    {
      header: "Подбор помещения",
      answers: ["В квартиру", "В частный дом", "В сад"],
    },
    {
      header: "Подбор комнаты",
      answers: ["В зал", "В прихожую", "В спальню", "Другое"],
    },
    {
      header: "Наличие зеркала",
      answers: ["С зеркалом", "Без зеркала", "С зеркалом во весь рост"],
    },
    {
      header: "Способ установки",
      answers: ["Встроенный", "В нишу", "Стационарный"],
    },
    {
      header: "Габариты места установки",
      answers: ["Ширина", "Глубина", "Высота"],
    },
  ],
};

let obj2 = {
  header: "Прихожие",
  questions: [
    {
      header: "Подбор помещения",
      answers: ["В квартиру", "В частный дом", "В сад"],
    },
    {
      header: "Наличие зеркала",
      answers: ["С зеркалом", "Без зеркала", "С зеркалом во весь рост"],
    },
    {
      header: "Тип сидушки",
      answers: ["С мягкой сидушкой", "Без мягкой сидушки"],
    },
    {
      header: "Наличие дверей и вешалок",
      answers: [
        "Все закрыто дверьми",
        "На половину открытые вешалки",
        "Только открытые вешалки и снизу тумба",
      ],
    },
    {
      header: "Габариты места установки",
      answers: ["Ширина", "Глубина", "Высота"],
    },
  ],
};

let obj3 = {
  header: "Кухни на заказ",
  questions: [
    {
      header: "Подбор помещения",
      answers: ["В квартиру", "В частный дом", "В сад"],
    },
    {
      header: "Форма кухни",
      answers: ["Прямая", "Угловая", "П-образная"],
    },
    {
      header: "Вид столешницы",
      answers: [
        "Постформинг (пластик) 26мм",
        "Постформинг (пластик) 38мм",
        "Искуственный камень",
      ],
    },
    {
      header: "Вид фасадов",
      answers: ["МДФ плёнка ПВХ", "МДФ крашенные", "Массив"],
    },
    {
      header: "Срочность изготовления",
      answers: ["Срочно", "Через месяц", "Прицениваюсь на будущее"],
    },
    {
      header: "Габариты места установки",
      answers: ["Ширина", "Глубина", "Высота"],
    },
  ],
};

let obj4 = {
  header: "Гостиные",
  questions: [
    {
      header: "Подбор помещения",
      answers: ["В квартиру", "В частный дом", "Другое"],
    },
    {
      header: "Форма изделия",
      answers: [
        "В виде стенки",
        "Тумба только внизу",
        "Набор тумб снизу и сверху",
      ],
    },
    {
      header: "Вид фасадов",
      answers: ["МДФ плёнка ПВХ", "МДФ крашенные", "Массив"],
    },
    {
      header: "Габариты места установки",
      answers: ["Ширина", "Глубина", "Высота"],
    },
  ],
};

let obj5 = {
  header: "Детская мебель",
  questions: [
    {
      header: "Подбор помещения",
      answers: ["В квартиру", "В частный дом", "Другое"],
    },
    {
      header: "Форма изделия",
      answers: ["Кровать", "Стол", "Набор"],
    },
    {
      header: "Вид фасадов",
      answers: ["МДФ плёнка ПВХ", "МДФ крашенные", "Массив"],
    },
    {
      header: "Габариты места установки",
      answers: ["Ширина", "Глубина", "Высота"],
    },
  ],
};

let obj6 = {
  header: "Спальни и кровати",
  questions: [
    {
      header: "Подбор помещения",
      answers: ["В квартиру", "В частный дом", "Другое"],
    },
    {
      header: "Форма изделия",
      answers: ["Односпальные", "Двухспальные", "Спальный гарнитур"],
    },
    {
      header: "Материалы",
      answers: ["МДФ плёнка ПВХ", "МДФ крашенные", "Обивка тканью"],
    },
    {
      header: "Габариты места установки",
      answers: ["Ширина", "Глубина", "Высота"],
    },
  ],
};

let obj7 = {
  header: "Косметические столы",
  questions: [
    {
      header: "Подбор помещения",
      answers: ["В квартиру", "В частный дом", "Другое"],
    },
    {
      header: "Форма изделия",
      answers: ["Зеркало с подсветкой", "Зеркало без подсветки", "Без зеркала"],
    },
    {
      header: "Материалы",
      answers: ["МДФ плёнка ПВХ", "МДФ крашенные", "ЛДСП"],
    },
    {
      header: "Габариты места установки",
      answers: ["Ширина", "Глубина", "Высота"],
    },
  ],
};

let obj8 = {
  header: "Комоды",
  questions: [
    {
      header: "Подбор комнаты",
      answers: ["Зал", "Прихожая", "Спальня"],
    },
    {
      header: "Количество ящиков",
      answers: ["3 ящика", "4-5 ящиков", "Другое"],
    },
    {
      header: "Материалы",
      answers: ["МДФ плёнка ПВХ", "МДФ крашенные", "ЛДСП"],
    },
    {
      header: "Габариты места установки",
      answers: ["Ширина", "Глубина", "Высота"],
    },
  ],
};

let obj9 = {
  header: "Офисная мебель",
  questions: [
    {
      header: "Подбор помещения",
      answers: ["Приёмная", "Офис", "Кабинет директора"],
    },
    {
      header: "Ценовая категория",
      answers: ["Не дорого", "Среднее", "Премиум"],
    },
    {
      header: "Материалы",
      answers: ["МДФ плёнка ПВХ", "МДФ крашенные", "ЛДСП"],
    },
    {
      header: "Габариты места установки",
      answers: ["Ширина", "Глубина", "Высота"],
    },
  ],
};
function konstrInput(event) {
  let text = $(event.target).val();
  if (text == "") {
    $(event.target).removeClass("konstr-input-active");
    $(event.target).addClass("konstr-input");
  } else {
    $(event.target).removeClass("konstr-input");
    $(event.target).addClass("konstr-input-active");
  }
}
