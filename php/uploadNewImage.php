<?
include "connect.php";
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];
$idfolder = $_POST["idfolder"];
$query = "SELECT доступ FROM аккаунт WHERE логин='$login' AND пароль='$pass'";
$result = $conn->query($query);
if ($result->num_rows < 1) {
    echo json_encode("", JSON_UNESCAPED_UNICODE);
    exit;
};
$c = explode('.', $_FILES['file']['name']);
$s = generatePassword();
$newName = "$s." . $c[1];
if (0 < $_FILES['file']['error']) {
} else {
    move_uploaded_file($_FILES['file']['tmp_name'], "../gallery/$idfolder/" . "$newName");
}
function generatePassword($length = 8)
{
    $chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
    $numChars = strlen($chars);
    $string = '';
    for ($i = 0; $i < $length; $i++) {
        $string .= substr($chars, rand(1, $numChars) - 1, 1);
    }
    return $string;
}
