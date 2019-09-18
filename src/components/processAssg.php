<?php
require_once 'header.php';

//handing the inputs here
$name = mysqli_real_escape_string($conn, $_POST['name']);
$desc = mysqli_real_escape_string($conn, $_POST['desc']);
$num_q = mysqli_real_escape_string($conn, $_POST['num_q']);
$est_time = mysqli_real_escape_string($conn, $_POST['est_time']);
$author = mysqli_real_escape_string($conn, $_POST['author']);
$hash = hash('md5', $name);


$sql = "INSERT INTO assg (name, descr, num_q, est_time, author, hash) VALUES ('$name', '$desc', '$num_q', '$est_time', '$author', '$hash')";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$sql_array = "CREATE TABLE `{$hash}` (uid INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(250) NOT NULL)";

if ($conn->query($sql_array) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql_array . "<br>" . $conn->error;
}


if(isset($_POST['related'])){
    $related = $_POST['related'];
    echo 'Selected options: ';
    foreach($related as $key => $value){
        echo $value . '</br>';
        $sql_related = "INSERT INTO `{$hash}` (name) VALUES ('$value')";
        if ($conn->query($sql_related) === TRUE) {
            echo "Added new row </br>";
        } else {
            echo "Error: " . $sql_related . "<br>" . $conn->error;
        }
    }
}

header('Location: ../index.php');