<?
include "connect.php";
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];
$newname=$_POST['newname'];
$id=$_POST['id'];
$newtext=$_POST['newtext'];
$query = "SELECT доступ FROM аккаунт WHERE логин='$login' AND пароль='$pass'";
$result = $conn->query($query);
if ($result->num_rows < 1) {
    echo json_encode("", JSON_UNESCAPED_UNICODE);
    exit;
};
$query = "UPDATE отзывы SET имя='$newname', текст='$newtext' WHERE ид='$id'";
$conn->query($query);
