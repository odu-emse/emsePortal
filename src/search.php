<?php
session_start();

require_once '../build/components/header.php';
require_once '../build/components/globals.php';

$searchTerm = $_GET['term'];

$sql  = "SELECT * FROM module WHERE name LIKE '%$searchTerm%'";

$query = $conn->query($sql) or die("MySQL error, query error");

if($query->num_rows > 0){
    while($row = $query->fetch_assoc()){
        echo $row['uid'] . " " . $row['name'];
        if($row['author'] != NULL){
            echo " by " . $row['author'] . "<br>";
        }
    }
}

// echo json_encode($skillData);

require_once '../build/components/footer.php'
?>