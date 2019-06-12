<?php

function loginCheck(){
    session_start();
    if($_SESSION['logged_in'] == true AND isset($_SESSION['username']) AND !empty($_SESSION['username'])){
        
    }
    else{
        //header('Location: ../../src/userReg.php');
        echo "Session failure. Check function loginCheck()";
    }
}

?>