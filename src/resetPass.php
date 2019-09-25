<?php
require_once "components/header.php";
?>
    <h1>Reset password</h1>
    <p>Enter your email to receive a reset link where you can reset your password.</p>
    <form action="components/resetReq.php" method="post">
        <label for="password">Email
            <input type="email" name="email" placeholder="example@email.com">
        </label>
        <button class="btn btn-primary" type="submit" name="reset">Send reset link</button>
    </form>
<?php
require_once "components/footer.php";
?>