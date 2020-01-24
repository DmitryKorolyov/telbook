
<?php 

	$surname=pg_escape_string(htmlspecialchars($_POST["surname"]));
	$name=pg_escape_string(htmlspecialchars($_POST["name"]));
	$patronymic=pg_escape_string(htmlspecialchars($_POST["patronymic"]));
	$number=pg_escape_string(htmlspecialchars($_POST["number"]));
	$address=pg_escape_string(htmlspecialchars($_POST["address"]));
	$old_num=pg_escape_string(htmlspecialchars($_POST["old_num"]));

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

    $uploaddir = '/home/u100866/public_html/img/';
    $link = "https://vhost100866.cpsite.ru/img/".$number.".jpg";

    if($old_num==''){
    	$query = "INSERT INTO info VALUES ('$surname','$name','$patronymic','$number','$address','$link')";
    	$stmt = $dbh->query($query);
        $result = $stmt->fetchAll();
    	


		$_FILES['uploader']['name']=$number.".jpg";
		$uploadfile = $uploaddir . basename($_FILES['uploader']['name']);
		move_uploaded_file($_FILES['uploader']['tmp_name'], $uploadfile);
    }
    else{
    	$query = "UPDATE info SET surname='$surname',name='$name',patronymic='$patronymic',number='$number',address='$address' WHERE number = '$old_num'";
    	$stmt = $dbh->query($query);
        $result = $stmt->fetchAll();

		if ((is_uploaded_file($_FILES['uploader']['tmp_name']) && $number==$old_num) || (is_uploaded_file($_FILES['uploader']['tmp_name']) && $number!=$old_num)){
			unlink($uploaddir.$old_num.".jpg");
			$_FILES['uploader']['name']=$number.".jpg";
			$uploadfile = $uploaddir . basename($_FILES['uploader']['name']);
			move_uploaded_file($_FILES['uploader']['tmp_name'], $uploadfile);
			}
		elseif (!(is_uploaded_file($_FILES['uploader']['tmp_name'])) && $number!=$old_num){
			rename($uploaddir.$old_num.".jpg",$uploaddir.$number.".jpg");
			
		}
	}

	header('Location: https://vhost100866.cpsite.ru/admin.html');

?>
