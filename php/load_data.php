<?php 

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
    $stmt = $dbh->query($query);
    $result = $stmt->fetchAll();

	print_r(json_encode($result));
?>
