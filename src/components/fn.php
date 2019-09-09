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
        echo '<script type="text/javascript">window.location.reload();</script>';
        if(mysqli_query($conn, $sql)){
        }
        else {
            echo 'Error updating record:' . $conn->error;
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
        echo round($time, 1, PHP_ROUND_HALF_UP) . " hours";
    }
    else {
        echo $time . " minutes";
    }
}

function cnt($conn){
    $sql = $conn -> query('SELECT * FROM module WHERE cnt = 1');
    if ($sql->num_rows > 0) {
        if($row = $sql->fetch_assoc()) {
            if($row['cnt'] !== 0){
                echo
                '
                <div class="jumb--text col">
                    <h3 class="jumb--text--title">Carry on learning</h3>
                    <p class="jumb--text--paragraph">Continue your progress in the '.$row['name'].' module. Don\'t forget to mark the module complete if it\'s done.</p>
                    <form action="housing.php" method="get">
                        <button class="btn btn-success jumb--text--cta" type="submit" name="access" value="'.$row['uid'].'">Continue module</button>
                    </form>
                </div>
                <div class="jumb--img col">
                    <form class="jumb--img__form" action="housing.php" method="get">
                        <button class="jumb--img__play" type="submit" name="access" value="'.$row['uid'].'">
                            <i class="fa fa-play" aria-hidden="true"></i>
                        </button>
                    </form>
                    <img class="jumb--img__ill" alt="">
                </div>
                ';
            }
        }
    }
    else{
        echo 'error';
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

function difficulty($x){
    //get inputted data from argument
    $difficultyString = NULL;
    if($x == true){ //check if the user wants to see all data without filter
        if($x == 'beginner'){
            $difficultyString = ' AND difficulty BETWEEN 0 AND 2';
        }
        if ($x == 'intermediate'){
            $difficultyString = ' AND difficulty BETWEEN 2 AND 4';
        }
        if ($x == 'extreme'){
            $difficultyString = ' AND difficulty BETWEEN 4 AND 5';
        }
    }
    return $difficultyString;
}

function topic($x){
    //get inputted data from argument
    $topicString = NULL;
    if($x == true){ //check if user selected an option that's not 'All'
        if($x == 'acct'){
            $topicString = " AND topic='accounting'";
        }
        if ($x == 'pmt'){
            $topicString = " AND topic='project management'";
        }
        if ($x == 'prog'){
            $topicString = " AND topic='programming'";
        }
        if ($x == 'math'){
            $topicString = " AND topic='mathematics'";
        }
        if ($x == 'modeling'){
            $topicString = " AND topic='modelling'";
        }
    }
    return $topicString;
}

function duration($x){
    //get inputted data from argument
    $durationString = NULL;
    if($x == true){ //check if the user wants to see all data without filter
        if($x == 'below10'){
            $durationString = ' AND duration BETWEEN 0 AND 10';
        }
        if($x == 'btw1030'){
            $durationString = ' AND duration BETWEEN 10 AND 30';
        }
        if($x == 'over30'){
            $durationString = ' AND duration > 30';
        }
    }
    return $durationString;
}

function strRepFirst($from, $to, $content){
    $from = '/'.preg_quote($from, '/').'/';
    return preg_replace($from, $to, $content, 1);
}

function title($y){
    //TODO: checks if the search/filter query is present and show appropriate h1 tag for the course
}