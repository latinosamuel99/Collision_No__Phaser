<?php
    if( isset( $_POST['points'] ) ){
        $points = $_POST['points'];
 }
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
echo "<h2>$points</h2>";
$sql = "INSERT INTO game (name,points)
VALUES ('Jogo','$points')";

if(!mysqli_query ($conn, $sql)){
	echo 'Informacao nao Inserida';
}else{
	echo 'Informacao Inserida';
}

mysqli_close($conn);
exit();
?>