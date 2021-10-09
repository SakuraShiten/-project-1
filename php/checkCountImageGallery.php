<?
$id = $_POST["id"];
$dir= "../gallery/$id";
$files = scandir($dir);
unset($files[0]);
unset($files[1]);
echo json_encode($files, JSON_UNESCAPED_UNICODE);
