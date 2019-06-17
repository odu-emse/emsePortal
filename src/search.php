<?php
session_start();

require_once '../build/components/header.php';
require_once '../build/components/globals.php';

$searchTerm = $_GET['term'];

$sql  = 'SELECT * FROM `module` WHERE `name` LIKE "%'.$searchTerm.'%" ORDER BY `uid` DESC';

$query = $conn->query($sql);

$skillData = array();

if($query->num_rows > 0){
    while($row = $query->fetch_assoc()){
        $termData['uid'] = $row['uid'];
        $termData['value'] = $row['name'];
        array_push($skillData, $termData);
    }
}

echo json_encode($skillData);

require_once '../build/components/footer.php'
?>