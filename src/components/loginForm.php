<?php
    if (isset($_SESSION['uid'])){
        echo
        '
        <form action="components/logout.php" method="get">
            <button class="btn btn-danger" type="submit" name="logout">Logout</button>
        </form>
        ';
    }
    else{
        echo
        '
        <form action="components/login.php" method="post">
            <label for="username">MIDAS/E-mail
                <input type="text" name="uid">
            </label>
            <label for="email">Password
                <input type="password" name="password">
            </label>
            <button class="btn btn-primary" type="submit" name="login">Login</button>
        </form>
        <a class="btn btn-outline-secondary" href="signup.php">Sign up</a>
        ';
    }
?>