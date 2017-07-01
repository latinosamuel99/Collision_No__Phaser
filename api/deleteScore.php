<?php
$code = $_GET['code'];
$servername = 'localhost:3308';
$username = 'root';
$password = '';
$dbname = "jogo_tm";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (mysqli_connect_errno()) {
    die("Connection failed.");
} 

// sql to delete a record
$sql = "DELETE FROM game WHERE code = $code"; 

if (mysqli_query($conn, $sql)) {
    mysqli_close($conn);
    header('Location: readScore.php'); //lista de todos os jogos (volta atras)
    exit;
} else {
    echo "Erro ao eliminar registo !";
}
mysqli_close($conn);
exit();
?>