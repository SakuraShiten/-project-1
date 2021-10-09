$(document).ready(function () {
  let viewheight = $(window).height();
  let viewwidth = $(window).width();
  let viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute(
    "content",
    "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0"
  );
  window.addEventListener(
    "orientationchange",
    function () {
      let viewheight = $(window).height();
      let viewwidth = $(window).width();
      let viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute(
        "content",
        "height=" +
          viewwidth +
          "px, width=" +
          viewheight +
          "px, initial-scale=1.0"
      );
    },
    false
  );
  checkCookie();
  $(".exit-btn").on("click ", function () {
    $.post("/php/delCookie.php").done(function () {
      callAlert(true, "Вы вышли из аккаунта");
      window.location.href = "admin.php";
    });
  });
  $(".admin-nav-bar-btn-acc").on("click ", function () {
    $.post("/php/checkAdmin.php").done(function (result) {
 
      if (result == 1) {
        console.log(result);
        clearNavBarHover();
        $(this).removeClass("nav-bar-btn-hover");
        $(this).addClass("nav-bar-btn-hover-active");
        iniBlockAccounts();
      }else{
        callAlert(false,"У вас нет доступа");
      }
    });
  });
  $(".authorization-logo").on("click ", function () {
    window.location.href = "index.php";
  });
  $(".authorization-btn").on("click ", function () {
    checkAuthorization();
  });
  $(".admin-nav-bar-btn-gallery").on("click ", function () {
    clearNavBarHover();
    $(this).removeClass("nav-bar-btn-hover");
    $(this).addClass("nav-bar-btn-hover-active");
    galleryIni();
  });
  $(".admin-nav-bar-btn-email").on("click ", function () {
    clearNavBarHover();
    $(this).removeClass("nav-bar-btn-hover");
    $(this).addClass("nav-bar-btn-hover-active");
    $.post("/php/viewListEmail.php").done(function (result) {
      iniEmails(JSON.parse(result));
    });
  });
  $(".admin-nav-bar-btn-email-reviews").on("click ", function () {
    clearNavBarHover();
    $(this).removeClass("nav-bar-btn-hover");
    $(this).addClass("nav-bar-btn-hover-active");
    $.post("/php/viewListReviews.php").done(function (result) {
      iniReviews(JSON.parse(result));
    });
  });
  $(".admin-nav-bar-btn-konstr").on("click ", function () {
    clearNavBarHover();
    $(this).removeClass("nav-bar-btn-hover");
    $(this).addClass("nav-bar-btn-hover-active");
    $(".block-konstr").fadeIn(300);
    iniKonstr();
  });
});
function clearNavBarHover() {
  $(".admin-nav-bar").find("div").removeClass("nav-bar-btn-hover-active");
  $(".admin-nav-bar").find("div").removeClass("nav-bar-btn-hover");
  $(".admin-nav-bar").find("div").addClass("nav-bar-btn-hover");
  $(".admin-accounts").hide();
  $(".block-gallery").hide();
  $(".block-emails").hide();
  $(".block-reviews").hide();
  $(".block-konstr").hide();
}
function checkAuthorization() {
  let login = $(".authorization-login").val();
  let pass = $(".authorization-pass").val();
  if (login.length < 1 || pass.length < 1) {
    callAlert(false, "Заполните все поля");
    return;
  }
  $.post("/php/authorization.php", {
    login: login,
    pass: pass,
  }).done(function (result) {
    if (JSON.parse(result) !== "done") callAlert(false, JSON.parse(result));
    else {
      callAlert(true, "Авторизация прошла успешно");
      checkCookie();
    }
  });
}
function checkCookie() {
  $.post("/php/checkCookie.php").done(function (result) {
    if (JSON.parse(result) == "done") {
      $(".block-authorization").remove();
      $(".block-main").show();
    } else {
      $(".block-authorization").show();
    }
  });
}
function iniBlockAccounts() {
  $.post("/php/viewAllAccounts.php").done(function (result) {
    $(".admin-accounts").fadeIn(300);
    $(".admin-accounts").empty();
    for (let object of JSON.parse(result)) {
      let st = "Модератор";
      if (object[2] == 10) {
        st = "Администратор";
      }
      let html = `<div id="acc-${object[0]}" accname="${object[1]}" style="display:none;">
        <div class="accounts-info">
            <p>Логин: ${object[1]}</p>
            <p>Статус: ${st}</p>
        </div>
        <div class="accounts-btns">`;
      if (object[2] != 10)
        html += ` <p class="accounts-btns-delete">удалить аккаунт</p>`;
      html += `
            <p class="accounts-btns-new-pass">изменить пароль</p>
        </div>
        </div>`;
      $(".admin-accounts").append(html);
      $(".admin-accounts").find("div").fadeIn(300);
    }
    $(".accounts-btns-delete").on("click ", function () {
      let name = $(this).parent().parent().attr("accname");
      let id = $(this).parent().parent().attr("id");
      let html = `<div class="block-overfon" style="display: none;">
        <div class="delete-acc-access">
            <div class="delete-acc-access-info">
                <h2>Вы уверены, что хотите удалить аккаунт, <span>${name}</span>
                </h2>
            </div>
            <div class="delete-acc-access-btn">
                <div class="delete-acc-access-btn-no">
                    <p>Нет</p>
                </div>
                <div class="delete-acc-access-btn-yes" iddel="${id}"> 
                    <p >Да</p>
                </div>
            </div>
        </div>
        </div>`;
      $("body").append(html);
      $(".block-overfon").fadeIn(300);
      $(".delete-acc-access-btn-no").on("click ", function () {
        $(".block-overfon").remove();
      });
      $(".delete-acc-access-btn-yes").on("click ", function () {
        deleteAcc($(this).attr("iddel").split("-")[1]);
      });
    });

    $(".accounts-btns-new-pass").on("click ", function () {
      let name = $(this).parent().parent().attr("accname");
      let id = $(this).parent().parent().attr("id");
      let html = `<div class="block-overfon" style="display: none;">
      <div class="new-password-acc">
          <h1>Изменение пароля для <span>${name}</span></h1>
          <input class="new-password-input" placeholder="Новый пароль" type="text">
          <div>
              <div class="new-password-no">
                  <p>Отменить</p>
              </div>
              <div idnewpass="${id}" class="new-password-yes">
                  <p>Применить изменение</p>
              </div>
          </div>
      </div>
      </div>`;
      $("body").append(html);
      $(".block-overfon").fadeIn(300);
      $(".new-password-no").on("click ", function () {
        $(".block-overfon").remove();
      });
      $(".new-password-yes").on("click ", function () {
        let pass = $(".new-password-input").val();
        let id = $(this).attr("idnewpass").split("-")[1];
        if (pass == "") {
          callAlert(false, "Введите новый пароль");
          return;
        }
        newPassAcc(id, pass);
      });
    });

    html = `<div class="create-new-acc-btn">
    <p>Добавить новый аккаунт</p>
    </div>`;
    $(".admin-accounts").append(html);
    $(".create-new-acc-btn").on("click ", function () {
      let html = `<div class="block-overfon" style="display: none;">
      <div class="add-acc-check">
          <h1>Добавить новый аккаунт</h1>
          <div class="add-acc-inputs">
              <input class="add-acc-login-input" type="text" placeholder="Логин" type="text">
              <input class="add-acc-pass-input" type="text" placeholder="Пароль" type="text">
          </div>
          <div class="add-acc-btns">
              <div class="add-acc-no">
                  <p>Отменить</p>
              </div>
              <div class="add-acc-yes">
                  <p>Добавить</p>
              </div>
          </div>
      </div>
     </div>`;
      $("body").append(html);
      $(".block-overfon").fadeIn(300);
      $(".add-acc-no").on("click ", function () {
        $(".block-overfon").remove();
      });
      $(".add-acc-yes").on("click ", function () {
        let login = $(".add-acc-login-input").val();
        let pass = $(".add-acc-pass-input").val();
        if (login == "" || pass == "") {
          callAlert(false, "Заполните все поля");
          return;
        }
        newAccCreate(login, pass);
      });
    });
  });
}
function deleteAcc(id) {
  $.post("/php/deleteAcc.php", {
    id: id,
  }).done(function (result) {
    callAlert(true, "Аккаунт успешно удалён");
    $(".block-overfon").remove();
    $(`#acc-${id}`).remove();
  });
}
function newPassAcc(id, pass) {
  $.post("/php/newPassAcc.php", {
    id: id,
    pass: pass,
  }).done(function (result) {
    callAlert(true, "Пароль успешно изменён");
    $(".block-overfon").remove();
  });
}
function newAccCreate(login, pass) {
  $.post("/php/newAccCreate.php", {
    newlogin: login,
    newpass: pass,
  }).done(function (result) {
    callAlert(true, "Новый аккаунт успешно создан");
    $(".block-overfon").remove();
    iniBlockAccounts();
  });
}
function galleryIni() {
  $(".block-gallery-navbar-btn").unbind("click ");
  $(".block-gallery-image").empty();
  $(".block-gallery").fadeIn(300);
  $(".block-gallery-navbar-btn").on("click ", function () {
    $(".block-gallery-navbar-btn").removeClass("block-gallery-navbar-active");
    $(this).addClass("block-gallery-navbar-active");
    let idFolder = $(this).attr("idblockgallery");
    $.post("/php/checkCountImageGallery.php", {
      id: idFolder,
    }).done(function (result) {
      galleryAddBlockForIdFolder(JSON.parse(result), idFolder);
    });
  });
  $(".block-gallery-navbar-btn").first().click();
}
function galleryAddBlockForIdFolder(mass, idFolder) {
  let timeFade = 300;
  $(".block-gallery-image").empty();
  for (let obj in mass) {
    let html = `<div class="block-gallery-mass-image" style="display: none;">
   <div style="background-image: url(../gallery/${idFolder}/${mass[obj]});">
   </div ">
   <p class="delete-image" linkimage="${mass[obj]}">Удалить изображение</p>
  </div>`;
    $(".block-gallery-image").append(html);
    $(".block-gallery-mass-image").fadeIn(timeFade);
    timeFade += 50;
  }
  $(".delete-image").on("click ", function () {
    $(this).parent().remove();
    $.post("/php/deleteImage.php", {
      id: idFolder,
      name: $(this).attr("linkimage"),
    }).done(function () {
      callAlert(true, "Изображение удалено");
    });
  });
  let html = `<div class="block-gallery-image-add-image" style="display:none;">
  <div></div>
  </div>`;
  $(".block-gallery-image").append(html);
  $(".block-gallery-image-add-image").fadeIn(300);
  $(".block-gallery-image-add-image").on("click ", function () {
    $("#uploadimage").click();
  });
  html = `<input id="uploadimage" onchange="handleFiles('${idFolder}')" type="file" multiple="multiple" accept=".jpg,.png" style="display: none;">`;
  $(".block-gallery-image").append(html);
}

function handleFiles(idfolder) {
  var file_data = $("#uploadimage").prop("files")[0];
  var form_data = new FormData();
  form_data.append("file", file_data);
  form_data.append("idfolder", idfolder);
  $.ajax({
    url: "/php/uploadNewImage.php",
    dataType: "text",
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: "post",
    success: function () {
      callAlert(true, "Изображение загружено");
      $(".block-gallery-navbar-active").click();
    },
  });
}
function iniEmails(result) {
  $(".block-emails-list").empty();

  $(".block-emails").fadeIn(300);
  $(".block-emails-btn-new-email").unbind("click ");
  $(".block-emails-btn-new-email").on("click ", function () {
    let html = `<div class="block-overfon" style="display: none;">
      <div class="add-acc-check">
          <h1>Добавить новую почту</h1>
          <div class="add-acc-inputs">
              <input class="add-acc-pass-input" type="text" placeholder="Почта" type="text">
          </div>
          <div class="add-acc-btns">
              <div class="add-acc-no">
                  <p>Отменить</p>
              </div>
              <div class="add-acc-yes">
                  <p>Добавить</p>
              </div>
          </div>
      </div>
     </div>`;
    $("body").append(html);
    $(".block-overfon").fadeIn(300);
    $(".add-acc-no").on("click ", function () {
      $(".block-overfon").remove();
    });
    $(".add-acc-yes").on("click ", function () {
      let nameemail = $(".add-acc-pass-input").val();
      if (nameemail == "") {
        callAlert(false, "Заполните поле");
        return;
      }
      $.post("/php/addNewEmail.php", {
        nameemail: nameemail,
      }).done(function () {
        $(".block-overfon").remove();
        callAlert(true, "Почта добавлена");
        $(".admin-nav-bar-btn-email").click();
      });
    });
  });
  if (result == "empty") return;
  console.log(result.length);
  for (let obj of result) {
    let html = `<div>
    <h1 style="word-break:break-all;">Почта: ${obj}</h1>`;
    if (result.length > 1)
      html += `<p class="del-email" emailname="${obj}">удалить почту</p>`;
    html += `</div>`;
    $(".block-emails-list").append(html);
  }
  $(".del-email").on("click ", function () {
    let obj = $(this).attr("emailname");
    let html = `<div class="block-overfon" style="display: none;">
        <div class="delete-acc-access">
            <div class="delete-acc-access-info">
                <h2 style=" padding:3vw;">Вы уверены, что хотите удалить почту, <span style="word-break:break-all;">${obj}</span>
                </h2>
            </div>
            <div class="delete-acc-access-btn">
                <div class="delete-acc-access-btn-no">
                    <p>Нет</p>
                </div>
                <div class="delete-acc-access-btn-yes" namedel="${obj}"> 
                    <p>Да</p>
                </div>
            </div>
        </div>
        </div>`;
    $("body").append(html);
    $(".block-overfon").fadeIn(300);
    $(".delete-acc-access-btn-no").on("click ", function () {
      $(".block-overfon").remove();
    });
    $(".delete-acc-access-btn-yes").on("click ", function () {
      $.post("/php/deleteEmail.php", {
        nameemail: obj,
      }).done(function () {
        $(".block-overfon").remove();
        callAlert(true, "Почта удалена");
        $(".admin-nav-bar-btn-email").click();
      });
    });
  });
}
function iniReviews(result) {
  $(".block-reviews").fadeIn(300);
  $(".block-reviews-navbar-btn").unbind("click ");
  $(".block-reviews-navbar-btn").on("click ", function () {
    $(".block-reviews-navbar-btn").removeClass("block-reviews-navbar-active");
    $(this).addClass("block-reviews-navbar-active");
    let id = $(this).attr("idreviews");
    $(".block-reviews-about-text-name")
      .find("input")
      .val(`${result[id - 1][1]}`);
    $(".block-reviews-about-text")
      .find("textarea")
      .val(`${result[id - 1][2]}`);
    $(".block-reviews-about-img").find("div").remove();
    $(".block-reviews-about-img").prepend(`<div ></div>`);
    $(".block-reviews-about-img")
      .find("div")
      .css(`background-image`, `url(../imageReviews/${id}.jpg?${makeid()})`);

    $(".block-reviews-about-text-btn").unbind("click ");
    let c = $(this);
    $(".block-reviews-about-img").find("p").unbind("click ");
    $("#uploadimageReviews").remove();
    let html = `<input id="uploadimageReviews" onchange="handleFilesReviews(${id})" type="file" multiple="multiple" accept=".jpg,.png" style="display: none;">`;
    $(".block-reviews-about-img").append(html);
    $(".block-reviews-about-img")
      .find("p")
      .on("click ", function () {
        $("#uploadimageReviews").click();
      });

    $(".block-reviews-about-text-btn").on("click ", function () {
      let newname = $(".block-reviews-about-text-name").find("input").val();
      let newtext = $(".block-reviews-about-text").find("textarea").val();
      if (newname == "" || newtext == "") {
        callAlert(false, "Заполните поля");
        return;
      }
      $.post("/php/updateReviews.php", {
        newname: newname,
        newtext: newtext,
        id: id,
      }).done(function () {
        callAlert(true, "Текст отзыва обновлён");
        $(".admin-nav-bar-btn-email-reviews").click();
        setTimeout(function () {
          $(c).click();
        }, 400);
      });
    });
  });
  $(".block-reviews-navbar-btn").first().click();
}
function handleFilesReviews(id) {
  var file_data = $("#uploadimageReviews").prop("files")[0];
  var form_data = new FormData();
  form_data.append("file", file_data);
  form_data.append("id", id);
  $.ajax({
    url: "/php/newImageReviews.php",
    dataType: "text",
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: "post",
    success: function () {
      callAlert(true, "Изображение изменено");
      $(".admin-nav-bar-btn-email-reviews").click();
      setTimeout(function () {
        $(`.block-reviews-navbar-btn[idreviews="${id}"]`).click();
      }, 400);
    },
  });
}
function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
let startKonstrAddItemPos = 0;
function iniKonstr() {
  $(".konstr-add-item-over").remove();
  $(".block-konstr").append(
    '<p class="konstr-add-item-over">Загрузить еще заявки</p>'
  );
  $(".konstr-list").empty();
  startKonstrAddItemPos = 0;
  addItemKonstr(startKonstrAddItemPos);
  $(".konstr-add-item-over").on("click ", function () {
    startKonstrAddItemPos += 10;
    addItemKonstr(startKonstrAddItemPos);
  });
}
function addItemKonstr(start) {
  $.post("/php/viewKonstr.php", {
    start: start,
  }).done(function (result) {
    if (JSON.parse(result).length < 10) {
      $(".konstr-add-item-over").remove();
    }
    for (let obj of JSON.parse(result)) {
      konstrIniItem(obj);
    }
  });
}
function konstrIniItem(obj) {
  let html = `<div class="konstr-list-item" idkonstr="${obj[0]}">
  <h1>Заявка №<span>${obj[0]}</span> на <span>${obj[1]}</span></h1>
  <div>
      <div class="konstr-list-item-text" idkonstr="${obj[0]}">
          <p>ФИО: <span>${obj[2]}</span></p>
          <p>Телефон: <span>${obj[3]}</span></p>
          <p>Статус: <span>${obj[4]}</span></p>
          <hr>
      </div>
      <div>
          <div class="konstr-list-item-btn-status" idkonstr="${obj[0]}">
              <p>Установить статус “Заявка обработана”</p>
          </div>
      </div>
  </div>
  </div>`;

  $(".konstr-list").append(html);
  if (obj[4] == "обработана") {
    $(`.konstr-list-item[idkonstr="${obj[0]}"]`)
      .find("div")
      .css("background-color", "#E1E1E1");
    $(`.konstr-list-item-btn-status[idkonstr="${obj[0]}"]`).remove();
  }
  $(`.konstr-list-item-btn-status[idkonstr="${obj[0]}"]`).on(
    "click ",
    function () {
      $.post("/php/konstrUpdateStatus.php", {
        id: obj[0],
      }).done(function () {
        callAlert(true, "Статус обновлён");
        $(`.konstr-list-item[idkonstr="${obj[0]}"]`)
          .find("div")
          .css("background-color", "#E1E1E1");
        $(`.konstr-list-item-btn-status[idkonstr="${obj[0]}"]`).remove();
      });
    }
  );
  for (let it of obj[5]) {
    $(`.konstr-list-item-text[idkonstr="${obj[0]}"]`).append(
      `<p>${it[0]}: <span>${it[1]}</span></p>`
    );
  }
}
