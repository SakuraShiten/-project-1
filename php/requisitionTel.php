<?
include "connect.php";
$FIO = $_POST["FIO"];
$tel = $_POST["tel"];
if (!preg_match("/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/", $tel)) {
	exit;
};
if (!preg_match("/^[А-Яа-я\s]/i", $FIO)) {
    exit;
};

$query = "INSERT INTO заявка_конструктор VALUES(NULL,'телефонный звонок','$FIO','$tel','на рассмотрении')";
$conn->query($query);
$query = "SELECT MAX(ид) FROM заявка_конструктор";
$result = $conn->query($query);
$row = $result->fetch_assoc();
$id = $row['MAX(ид)'];
$mailtext="Заявка №$id на телефонный звонок\nФИО: $FIO\nТелефон: $tel\n";
$query = "SELECT почта FROM почта";
$result = $conn->query($query);
while ($row = $result->fetch_assoc()) {
    $mail = $row['почта'];
    mail($mail, "Заявка", "", $mailtext, "-f info@interierdomufa.ru");
}