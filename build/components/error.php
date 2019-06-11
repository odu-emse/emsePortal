<?php
session_start();
    echo "Error: " . $_SESSION['message'] . "<br>"; 
    
    if(isset($_SESSION['error']) AND !empty($_SESSION['error'])){
        echo "SQL " . $_SESSION['error'] ;
    }
?>