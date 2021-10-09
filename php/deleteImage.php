<?
include "connect.php";
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];
$id = $_POST["id"];
$name = $_POST["name"];
$query = "SELECT доступ FROM аккаунт WHERE логин='$login' AND пароль='$pass'";
$result = $conn->query($query);
if ($result->num_rows < 1) {
    echo json_encode("", JSON_UNESCAPED_UNICODE);
    exit;
};
unlink("../gallery/$id/$name");