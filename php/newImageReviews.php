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

if (0 < $_FILES['file']['error']) {
} else {
    move_uploaded_file($_FILES['file']['tmp_name'], "../imageReviews/" . "$id" . ".jpg");
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
