<?
include "connect.php";
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];
$id = $_POST["id"];
$newpass = md5($_POST["pass"]);
$query = "SELECT доступ FROM аккаунт WHERE логин='$login' AND пароль='$pass'";
$result = $conn->query($query);
if ($result->num_rows < 1) {
    echo json_encode("", JSON_UNESCAPED_UNICODE);
    exit;
};
$row = $result->fetch_assoc();
if ($row['доступ'] != 10) {
    echo json_encode("", JSON_UNESCAPED_UNICODE);
    exit;
}
$query = "UPDATE аккаунт SET пароль='$newpass' WHERE ид='$id'";
$conn->query($query);