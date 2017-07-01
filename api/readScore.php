<?php
$servername = 'localhost:3308';
$username = 'root';
$password = '';
$dbname = "jogo_tm";

// Create connection
$con= mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (mysqli_connect_errno())
{
echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$result = mysqli_query($con,"SELECT code,nameGame,points FROM game");

echo "<table border='1'>
<tr>
<th>Codigo do Jogo</th>
<th>Nome do Jogo</th>
<th>Pontuacao</th>
<th>Eliminar Dados do Jogo</th>
</tr>";

while($row = mysqli_fetch_array($result))
{
echo "<tr>";
echo "<td>" . $row['code'] . "</td>";
echo "<td>" . $row['nameGame'] . "</td>";
echo "<td>" . $row['points'] . "</td>";
echo "<td><a href='deleteScore.php?id=".$row['code']."'>Eliminar</a></td>";
echo "</tr>";
}
echo "</table>";


echo "<img src='/phaser/Jogo/assets/logoESTG.png' alt='photo of my dog' />";
mysqli_close($con);
?>