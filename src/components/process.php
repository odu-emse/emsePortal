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

$mysqli = @new mysqli($host, $user, $password, $db);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$sql = "INSERT INTO module (number, name, descr, duration, link, numSlides, author) VALUES ('$number', '$name', '$descr','$duration', '$link', '$numSlides', '$author')";

if (mysqli_query($conn, $sql)) {//this happens if it's correct
    echo "New record created successfully....";
} 
else {//error handling
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

header('Location: ../index.php');
require_once 'footer.php'
?>