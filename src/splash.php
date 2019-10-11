<?php
require_once "components/header.php";

if(isset($_SESSION['uid']) AND isset($_SESSION['username']) AND isset($_SESSION['email'])){
    header("Location: ../src/index.php");
    exit();
}
?>
<div class="container">
    <h1 class="text-center">Log in</h1>
    <h3 class="text-center">EMSE Asynchronous Platform</h3>
    <form class="form-group signin ml-auto mr-auto mt-5" action="components/login.php" method="post">
        <div class="signin--group mb-4">
            <input class="signin--group--input" type="text" name="uid" placeholder="MIDAS/E-mail">
            <label class="signin--group--label" for="username">MIDAS/E-mail</label>
        </div>

        <div class="signin--group mb-4">
            <input class="signin--group--input" type="password" name="password" placeholder="Password">
            <label class="signin--group--label" for="email">Password</label>
        </div>
        <div class="d-flex flex-row actions signin--group--buttons">
            <button class="btn btn-primary ml-1 mr-1 signin--group--buttons--link" type="submit" name="login">Login</button>
            <a class="btn btn-outline-secondary ml-1 signin--group--buttons--link" href="signup.php">Sign up</a>
        </div>

    </form>
</div>
