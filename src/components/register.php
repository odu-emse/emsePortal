<?php
session_start();
// Registration process, inserts user info into the database 
// and sends account confirmation email message

include 'globals.php';

// Escape all $_POST variables to protect against SQL injections
$fname = $_POST['fname'];
$_SESSION['fname'] = $fname;

$lname = $_POST['lname'];
$_SESSION['lname'] = $lname;

$email = $_POST['username'] . "@odu.edu";
$_SESSION['username'] = $email;

$midasID = $_POST['midasID'];
$_SESSION['midasID'] = $midasID;

$pswd = password_hash($_POST['pswd'], PASSWORD_BCRYPT);
$hash = md5( rand(0,1000) );


echo $fname . " " . $lname  . " " . $email  . " " . $midasID  . " " . $pswd  . " " . $hash . " ";

// Check if user with that email already exists
$sql = "SELECT * FROM user WHERE email='$email'" or die(mysqli_error($conn));

$result = mysqli_query($conn, $sql);

// We know user email exists if the rows returned are more than 0
$queryResult = mysqli_num_rows($result);
if ( $queryResult > 0 ) {
    $_SESSION['message'] = 'User already exists!';
    header("location: error.php");
}
else { // Email doesn't already exist in a database, proceed...
    // active is 0 by DEFAULT (no need to include it here)
    $sql = "INSERT INTO user (id, fname, lname, email, pswd, hash) VALUES ('$midasID','$fname','$lname','$email','$pswd', '$hash')";

    // Add user to the database
    if (mysqli_query($conn, $sql)){

        
        $_SESSION['active'] = 0; //0 until user activates their account with verify.php
        $_SESSION['logged_in'] = true; // So we know the user has logged in
        $_SESSION['message'] =
                
                 "Confirmation link has been sent to ".$email.", please verify
                 your account by clicking on the link in the message!";
        /*
        // Send registration confirmation link (verify.php)
        $to      = $email;
        $subject = 'Account Verification';
        $message_body = '
        Hello '.$first_name.',

        Thank you for signing up!

        Please click this link to activate your account:'.$url.'verify.php?email='.$email.'&hash='.$hash;

        mail( $to, $subject, $message_body );
        */

        header("Location: ../index.php");

    }

    else {
        $_SESSION['message'] = 'Registration failed!';
        $_SESSION['error'] = "Error: " . $sql . "<br>" . mysqli_error($conn);
        header("location: error.php");
    }
}
?>