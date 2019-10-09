<?php
//sends data to the database
require_once 'header.php';

$number = $_POST['number'];
$name = $_POST['title'];
$descr = $_POST['descr'];
$duration = $_POST['duration'];
$link = $_POST['link'];
$numSlides = $_POST['numSlides'];
$author = $_POST['author'];
$hash = hash('md5', $name);
$str = "_topics";

$sql = "INSERT INTO module (number, name, descr, duration, link, numSlides, author, difficulty, done, cnt, hash) VALUES ('$number','$name','$descr','$duration','$link','$numSlides','$author',0,0,0,'$hash')";

if (mysqli_query($conn, $sql)) {//this happens if it's correct
    $sql = "CREATE TABLE ".$hash.$str." (topics tinytext NOT NULL)";
    if (mysqli_query($conn, $sql)) {//this happens if it's correct
        echo "New record created successfully....";
        header('Location: ../index.php');
        exit();
    }
} 
else {//error handling
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
require_once 'footer.php'
?>