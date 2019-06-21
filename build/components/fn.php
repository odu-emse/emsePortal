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
        $response = "<ul><li>No data found</li></ul>";

        $q = $conn->real_escape_string($_POST['q']);

        $sql = $conn->query("SELECT * FROM module WHERE name LIKE '%$q%'");

        if($sql->num_rows > 0){
            $response = "<ul>";
            while($data  = $sql->fetch_array()){
                $response .= "<li>". $data['name'];
                // if($data['author'] != NULL){
                //     $response .=" by " . $data['author'] . "</li>";
                // }
            }
            $response .= "</ul>";
        }

        exit($response);
    }
}

?>