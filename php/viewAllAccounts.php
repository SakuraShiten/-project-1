<?
include "connect.php";
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];
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
$query = "SELECT * FROM аккаунт";
$result = $conn->query($query);
$mas = [];
while ($row = $result->fetch_assoc()) {
    array_push($mas, [$row['ид'], $row['логин'], $row['доступ']]);
};
echo json_encode($mas, JSON_UNESCAPED_UNICODE);
