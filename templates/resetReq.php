<?php

if(isset($_POST['reset'])){
    try {
        $selector = bin2hex(random_bytes(8));
        $token = random_bytes(32);
    }
    catch (Exception $e) {
        echo $e . "<br>";
    }
    $url = "http://192.168.208.139:8010/projects/emsePortal/src/createNewPass.php?selector=".$selector."&validator=".bin2hex($token);
    $expires = date("U") + 1800;

    require "header.php";
    require '../vendor/autoload.php'; // If you're using Composer (recommended)

    $userEmail = $_POST['email'];

    $sql = "DELETE FROM pwdReset WHERE email=?";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)){
        header("Location: ../src/resetPass.php?error=resetConn");
        exit();
    }
    else{
        mysqli_stmt_bind_param($stmt, "s", $userEmail);
        mysqli_stmt_execute($stmt);
    }

    $sql = "INSERT INTO pwdReset (email, selector, token, expires) VALUES (?,?,?,?);";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)){
        header("Location: ../src/resetPass.php?error=resetConn");
        exit();
    }
    else{
        $hashedToken = password_hash($token, PASSWORD_DEFAULT);
        mysqli_stmt_bind_param($stmt, "ssss", $userEmail, $selector, $hashedToken, $expires);
        mysqli_stmt_execute($stmt);
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);

    $to = $userEmail;
    $subject = "Reset password for the EMSE Portal";

    $message = '<p>We received a password request. Follow the link below to create a new password.</p>';
    $message .= '<p>If you did not request a reset, feel free to ignore this message.</p><br/>';
    $message .= '<a href="'.$url.'">'.$url.'</a>';

    sendgridMail($to, $subject, $message, 'EMSE User');
}
else{
    header("Location: ../src/index.php");
    exit();
}