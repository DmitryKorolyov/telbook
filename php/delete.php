<?php 
	$number=$_GET["number"];

    $user="u100866";
    $pass=" ";
	$connect_string = "pgsql:host=localhost;port=5432;dbname=u100866_base";
    $query = "SELECT * FROM info";
    try {
        $dbh= new PDO($connect_string,$user,$pass);
    }
    catch(PDOException $e) {  
        echo $e->getMessage();  
    }

    $query = "DELETE FROM info WHERE number = '$number'";

    $stmt = $dbh->query($query);
    $result = $stmt->fetchAll();

	header('Location: https://vhost100866.cpsite.ru/admin.html');

?>
