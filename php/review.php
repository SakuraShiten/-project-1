<?
include "connect.php";
$query = "SELECT имя,текст FROM отзывы";
$result = $conn->query($query);
$array = [];
while ($row = $result->fetch_assoc()) {
    array_push($array, [$row['имя'], $row['текст']]);
}
echo json_encode($array, JSON_UNESCAPED_UNICODE);
