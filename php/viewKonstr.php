<?
include "connect.php";
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];
$start = $_POST["start"];
$query = "SELECT доступ FROM аккаунт WHERE логин='$login' AND пароль='$pass'";
$result = $conn->query($query);
if ($result->num_rows < 1) {
    echo json_encode("", JSON_UNESCAPED_UNICODE);
    exit;
};
$query = "SELECT * FROM заявка_конструктор ORDER BY ид DESC LIMIT $start, 10";
$result = $conn->query($query);
$mas = [];
while ($row = $result->fetch_assoc()) {
    array_push($mas, [$row['ид'],$row['тип_мебели'], $row['ФИО'], $row['телефон'], $row['статус']]);
};
$newmas=[];
foreach ($mas as $obj) {
    $idz=$obj[0];
    $query = "SELECT вопрос,ответ FROM вопросы_конструктор WHERE ид_заявки='$idz'";
    $result = $conn->query($query);
    $masc=[];
    while ($row = $result->fetch_assoc()) {
        array_push($masc,[$row['вопрос'],$row['ответ']]);
    }
    array_push($newmas,[$obj[0],$obj[1],$obj[2],$obj[3],$obj[4],$masc]);
}
echo json_encode($newmas, JSON_UNESCAPED_UNICODE);
