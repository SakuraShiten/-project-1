<?
include "connect.php";
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];
$id = $_POST["id"];
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
$query = "DELETE FROM аккаунт WHERE ид='$id'";
$conn->query($query);