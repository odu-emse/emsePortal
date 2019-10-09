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
        <form class="form-inline" action="components/login.php" method="post">
            <div class="nav--form--group mr-1">
                <input class="nav--form--group--input" type="text" name="uid" placeholder="MIDAS/E-mail">
                <label class="nav--form--group--label" for="username">MIDAS/E-mail</label>
            </div>
            
            <div class="nav--form--group ml-1">
                <input class="nav--form--group--input" type="password" name="password" placeholder="Password">
                <label class="nav--form--group--label" for="email">Password</label>
            </div>
            
            <button class="btn btn-primary ml-1 mr-1" type="submit" name="login">Login</button>
            <a class="btn btn-outline-secondary ml-1" href="signup.php">Sign up</a>
        </form>
        ';
    }
?>