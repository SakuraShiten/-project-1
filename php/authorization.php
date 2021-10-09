<?
include "connect.php";
$login = $_POST["login"];
$pass = $_POST["pass"];
$pass=md5($pass);
$query = "SELECT ид FROM аккаунт WHERE логин='$login' AND пароль='$pass'";
$result = $conn->query($query);

if($result->num_rows<1){ 
    echo json_encode("Пользователь не найден", JSON_UNESCAPED_UNICODE);
    exit;
};
setCookie('login', $login, time()+60*60*24*365, '/');
setCookie('pass', $pass, time()+60*60*24*365, '/');
echo json_encode("done", JSON_UNESCAPED_UNICODE);