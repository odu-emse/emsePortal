<?php
require_once "templates/header.php";
?>
<h1>Register</h1>
<form action="../templates/register.php" method="post">
    <label for="username">Username
        <input type="text" name="username">
    </label>
    <label for="email">Email
        <input type="email" name="email">
    </label>
    <label for="password">Password
        <input type="password" name="pswd">
    </label>
    <label for="confirm password">Confirm password
        <input type="password" name="conf-pswd">
    </label>
    <button class="btn btn-primary" type="submit" name="register">Register</button>
</form>

<a href="resetPass.php">Forgot your password?</a>

<?php
require_once "templates/footer.php";
?>