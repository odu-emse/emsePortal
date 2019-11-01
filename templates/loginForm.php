<?php
    if (isset($_SESSION['uid'])){
        echo
        '
        <form action="../templates/logout.php" method="get">
            <button class="btn btn-danger" type="submit" name="logout">Logout</button>
        </form>
        ';
    }
    else{
        if ($_SERVER[REQUEST_URI] !== "/projects/emsePortal/src/splash.php"){
            echo
            '
            <a class="btn btn-primary ml-1 mr-1" href="splash.php">Login</a>
            ';
        }
        echo
        '
        <a class="btn btn-outline-secondary ml-1" href="signup.php">Sign up</a>
        ';
    }
?>