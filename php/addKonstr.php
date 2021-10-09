<?
include "connect.php";
$mass = $_POST['mass'];
$type = $mass[2];
$fio = $mass[1];
$tel = $mass[0];
$query = "INSERT INTO заявка_конструктор VALUES (NULL,'$type','$fio','$tel','на рассмотрении')";
$conn->query($query);
$query = "SELECT MAX(ид) FROM заявка_конструктор";
$result = $conn->query($query);
$row = $result->fetch_assoc();
$id = $row['MAX(ид)'];
$mailtext="Заявка №$id на $type\nФИО: $fio\nТелефон: $tel\n";
unset($mass[0]);
unset($mass[1]);
unset($mass[2]);
foreach ($mass as $value) {
    $c1 = $value[0];
    $c2 = $value[1];
    if($c1=="Ширина"||$c1=="Высота"||$c1=="Глубина"){
        $mailtext = $mailtext . "$c1: $c2 см\n";      
    }else{
        $mailtext = $mailtext . "$c1: $c2\n";
    }
    $query = "INSERT INTO вопросы_конструктор VALUES (NULL,'$id','$c1','$c2')";
    $conn->query($query);
}
$query = "SELECT почта FROM почта";
$result = $conn->query($query);
while ($row = $result->fetch_assoc()) {
    $mail = $row['почта'];
    mail($mail, "Заявка", "", $mailtext, "-f info@interierdomufa.ru");
}
