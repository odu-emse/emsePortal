<?php
session_start();

require_once '../build/components/header.php';
require_once '../build/components/globals.php';
require_once '../build/components/fn.php';

//fetching data
$sql = "SELECT * FROM module";
$result = $conn->query($sql);
loginCheck();
search($conn);

include_once '../build/components/nav.php';

if ($result->num_rows > 0) {//output data of each row & opening fetch
    while ($row = $result->fetch_assoc()) {//running the amount of times the while loop is gonna run which equals to the amount of rows we have in the db
        print_r($row['link']);
        //TODO: include the file from DB fetch
    }

}
