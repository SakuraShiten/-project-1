<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <title>Админ панель</title>
 
    <link rel="stylesheet" href="/css/admin.css">
    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <script src="/js/admin.js"></script>
    <script src="/js/alert.js"></script>

</head>

<body>
    <div class="block-authorization" style="display: none;">
        <div class="authorization-logo">
            <div></div>
        </div>
        <h1>Личный кабинет</h1>
        <input class="authorization-login" maxlength="50" type="text" placeholder="Логин" type="text">
        <input class="authorization-pass" maxlength="50" type="password" placeholder="Пароль" type="text">
        <div class="authorization-btn">
            <p>Войти</p>
        </div>
    </div>
    <div class="block-main" style="display: none;">
        <div>
            <div class="admin-nav-bar">
                <div class="admin-nav-bar-btn-acc nav-bar-btn-hover">
                    <p>Аккаунты</p>
                </div>
                <div class="admin-nav-bar-btn-gallery nav-bar-btn-hover">
                    <p>Галерея</p>
                </div>
                <div class="admin-nav-bar-btn-konstr nav-bar-btn-hover">
                    <p>Заявки</p>
                </div>
                <div class="admin-nav-bar-btn-email nav-bar-btn-hover">
                    <p>Почта для уведомлений</p>
                </div>
                <div class="admin-nav-bar-btn-email-reviews nav-bar-btn-hover">
                    <p>Отзывы</p>
                </div>
                <div class="exit-btn">
                    <p>Выйти</p>
                </div>
            </div>
            <div class="admin-accounts" style="display: none;">

            </div>
            <div class="block-gallery" style="display: none;">
                <hr>
                <div class="block-gallery-navbar">
                    <div idblockgallery="1" class="block-gallery-navbar-btn">
                        <p>Шкафы</p>
                    </div>
                    <div idblockgallery="2" class="block-gallery-navbar-btn">
                        <p>Кухни</p>
                    </div>
                    <div idblockgallery="3" class="block-gallery-navbar-btn">
                        <p>Детские</p>
                    </div>
                    <div idblockgallery="4" class="block-gallery-navbar-btn">
                        <p>Комоды/столы/кровати</p>
                    </div>
                    <div idblockgallery="5" class="block-gallery-navbar-btn">
                        <p>Прихожие</p>
                    </div>
                    <div idblockgallery="6" class="block-gallery-navbar-btn">
                        <p>Гостиные</p>
                    </div>

                </div>
                <div class="block-gallery-image">
                </div>
            </div>

            <div class="block-emails" style="display: none;">
                <div class="block-emails-list">
                </div>
                <div class="block-emails-btn-new-email">
                    <p>Добавить новую почту</p>
                </div>
            </div>
            <div class="block-reviews" style="display: none;">
                <hr>
                <div class="block-reviews-navbar">
                    <div idreviews="1" class="block-reviews-navbar-btn">
                        <p>Отзыв №1</p>
                    </div>
                    <div idreviews="2" class="block-reviews-navbar-btn">
                        <p>Отзыв №2</p>
                    </div>
                    <div idreviews="3" class="block-reviews-navbar-btn">
                        <p>Отзыв №3</p>
                    </div>
                    <div idreviews="4" class="block-reviews-navbar-btn">
                        <p>Отзыв №4</p>
                    </div>
                    <div idreviews="5" class="block-reviews-navbar-btn">
                        <p>Отзыв №5</p>
                    </div>
                </div>
                <div class="block-reviews-about">
                    <div class="block-reviews-about-text">
                        <div class="block-reviews-about-text-name">
                            <p>Имя: </p>
                            <input type="text">
                        </div>
                        <p>Текст отзыва:</p>
                        <textarea class="weswap-new" maxlength="500"></textarea>
                        <div class="block-reviews-about-text-btn">
                            <p>Сохранить изменения текста</p>
                        </div>
                    </div>
                    <div class="block-reviews-about-img">

                        <p>Заменить изображение</p>

                    </div>
                </div>
            </div>

            <div class="block-konstr" style="display: none;">
                <div class="konstr-list">

                </div>


            </div>
        </div>
    </div>


</body>

</html>