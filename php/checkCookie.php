<?
include "connect.php";
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];
$query = "SELECT ид FROM аккаунт WHERE логин='$login' AND пароль='$pass'";
$result = $conn->query($query);
if($result->num_rows<1){ 
    echo json_encode("", JSON_UNESCAPED_UNICODE);
    exit;
};
echo json_encode("done", JSON_UNESCAPED_UNICODE);