<?php
function loginCheck(){
    if($_SESSION['logged_in'] == true AND isset($_SESSION['username']) AND !empty($_SESSION['username'])){
        //echo '<script>console.log("Session load successful.");</script>';
    }
    else{
        //echo '<script>console.log("Session failure. Check function loginCheck()");</script>';
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

function disable($z){
    if($z == 1){
        echo 'disabled';
    }
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

function getRelated($conn, $y){
    $sql = 'SELECT * FROM ' . $y;
    $result = $conn -> query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo '<li>' . $row['name'] . '</li>';
        }
    }
    else{
        echo 'error';
    }
}

function fetch($conn, $table, $file){
    $sql = 'SELECT * FROM ' . $table;
    $result = $conn -> query($sql);
    if ($conn->connect_error) {
        echo 'check connection';
    }
    else {
        if ($result->num_rows > 0) {
            $actualFile = 'components/' . $file . '.php';
            if (file_exists($actualFile)) {
                require_once $actualFile;
            } else {
                echo 'check file name';
            }
        } else {
            echo 'check table name';
        }
    }
}