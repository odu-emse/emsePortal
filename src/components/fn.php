<?php

function loginCheck(){
    if($_SESSION['logged_in'] == true AND isset($_SESSION['username']) AND !empty($_SESSION['username'])){
        echo '<script>console.log("Session load successful.");</script>';
    }
    else{
        echo '<script>console.log("Session failure. Check function loginCheck()");</script>';
    }
}

function search($conn){
    if(isset($_POST['search'])){
        $response = "<ul class='search--list'><li class='search--list--item'>No data found</li></ul>";

        $q = $conn->real_escape_string($_POST['q']);

        $sql = $conn->query("SELECT * FROM module WHERE name LIKE '%$q%'");

        if($sql->num_rows > 0){
            $response = "<ul class='search--list'>";
            while($data  = $sql->fetch_array()){
                $response .= "<li class='search--list--item'>". $data['name'];
            }
            $response .= "</ul>";
        }

        exit($response);
    }
}

function completion($x, $conn){
    $module = $_GET['module' . $x];

    if($module == true){
        $sql = $conn -> query('UPDATE module SET done = 1 WHERE uid = ' . $x);
        if(mysqli_query($conn, $sql)){
            echo "<script> console.log('Record updated successfully')</script>";
        }
        else {
            echo "<script> console.log('Error updating record: " . $conn->error . "');</script>";
        }
    }
    return $module;
}

function access($x, $conn){
    $mod = $_GET['access' . $x];
    if($mod == true){
        echo "<script> console.log('test')</script>";
        $sql = $conn -> query('SELECT link FROM module WHERE uid = ' . $x);
        if(mysqli_query($conn, $sql)){
            echo "<script> console.log('yes')</script>";
        }
        else {
            echo "<script> console.log('error: " . $conn->error . "');</script>";
        }
    }
    return $mod;
}

function timeConversion($time){
    if($time >= 60){
        $time = $time / 60;
        echo "Approximately " .  round($time, 1, PHP_ROUND_HALF_UP) . " hours";
    }
    else {
        echo "Approximately " . $time . " minutes";
    }
}

//TODO: turn sql fetches into functions and return the fetched array and get it to display
function fetchModule($conn){
    $sql = "SELECT * FROM module";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {        //fetch data if there are any rows
        while ($row = mysqli_fetch_assoc($result)) {            //loop will run until we reach the end of db rows
            $moduleData[] = $row;
        }
    }
    return $moduleData;
}