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
$topicCount = $_POST['hiddenCounter'];
$topicValue = $_POST['topic'];
$recCount = $_POST['hiddenCounterRec'];
$recName = $_POST['recName'];
$recLink = $_POST['recLink'];
$hash = hash('md5', $name);
$str = "_topics";
$str2 = "_rec";

$sql = "INSERT INTO module (number, name, descr, duration, link, numSlides, author, difficulty, done, cnt, hash) VALUES ('$number','$name','$descr','$duration','$link','$numSlides','$author',0,0,0,'$hash')";

if (mysqli_query($conn, $sql)) {//this happens if it's correct
    $tblNameTopic = $hash . $str;
    $tblNameRec = $hash . $str2;
    $createTable = " CREATE TABLE `".$tblNameTopic."` (topicUid INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY, topics tinytext NOT NULL); ";
    $createTable .= " CREATE TABLE `".$tblNameRec."` (recUid INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY, recName tinytext NOT NULL, recLink tinytext NOT NULL); ";
    $conn->multi_query($createTable);
        do{
            if (0 !== $conn->errno) {
                echo "Multi query failed: (" . $conn->errno . ") " . $conn->error;
                break;
            }
            foreach( $topicValue as $key => $n ) {
                $insertTopicValue = $conn -> query("INSERT INTO `$tblNameTopic` (topics) VALUES ('$n')");
            }
            for ($dummy = 0; $dummy < $recCount; $dummy++) {
                $insertRecValue = $conn->query("INSERT INTO `$tblNameRec` (recName, recLink) VALUES ('$recName[$dummy]', '$recLink[$dummy]')");
            }
            if($conn->more_results() === false){
                header('Location: ../index.php');
                break;
            }
            $conn->next_result();
        }
        while(true);
} 
else {//error handling
    echo "Error: <br>" . mysqli_error($conn);
}

require_once 'footer.php';