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
$query = "SELECT почта FROM почта";
$result = $conn->query($query);
$mas = [];
while ($row = $result->fetch_assoc()) {
    array_push($mas, $row['почта']);
};
if(count($mas)==0){
    echo json_encode("empty", JSON_UNESCAPED_UNICODE);
}else{
    echo json_encode($mas, JSON_UNESCAPED_UNICODE);
}