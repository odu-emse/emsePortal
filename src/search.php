<?php
session_start();

require_once '../build/components/header.php';
require_once '../build/components/globals.php';
require_once '../build/components/fn.php';

loginCheck();
include_once '../build/components/nav.php';

$searchTerm = $_GET['term'];

//select all columns from table where the name column matches the searched term
$sql  = "SELECT * FROM module WHERE name LIKE '%$searchTerm%'";

//connect or die
$query = $conn->query($sql) or die("MySQL error, query error");

if($query->num_rows > 0){
    while($row = $query->fetch_assoc()){

        //if link is present in the row add link to module
        if($row['link'] != NULL){
            echo "<a href=".$row['link']." target='_blank'>";
        }

        //display module ID and name of the module
        echo $row['uid'] . " " . $row['name'];

        //if author is present in the row display it
        if($row['author'] != NULL){
            echo " by " . $row['author'];
        }

        //if link is available close tag
        if($row['link'] != NULL) {
            echo "</a>";
        }

        //add break
        echo "<br>";
    }
}

?>