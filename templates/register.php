<?php
include 'globals.php';

if(isset($_POST['register'])){ //blocks URL exploration
    //setting posts from signup.php into variables
    $username = $_POST['username'];
    $email = $_POST['email'];
    $pswd = $_POST['pswd'];
    $pswdConf = $_POST['conf-pswd'];

    //error handlers
    if(empty($username) || empty($email) || empty($pswd) || empty($pswdConf)){
        header("Location: ../signup.php?error=emptyFields&username=".$username."&email=".$email."");
        exit();
    }
    elseif(!filter_var($email, FILTER_VALIDATE_EMAIL) && !preg_match("/^[a-zA-Z0-9]*$/", $username)){ //probably only good for OG browsers
        header("Location: ../signup.php?error=invalidEmailUsername");
        exit();
    }
    elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){ //probably only good for OG browsers
        header("Location: ../signup.php?error=invalidEmail&username=".$username."");
        exit();
    }
    elseif(!preg_match("/^[a-zA-Z0-9]*$/", $username)) {
        header("Location: ../signup.php?error=invalidUsername&email=".$email."");
        exit();
    }
    elseif ($pswd !== $pswdConf){
        header("Location: ../signup.php?error=pswdNotMatching&username=".$username."&email=".$email."");
        exit();
    }
    else{
        $sql = "SELECT username FROM users WHERE username=?";
        $stmt = mysqli_stmt_init($conn); //using prep statements
        if(!mysqli_stmt_prepare($stmt, $sql)){ //error handling
            header("Location: ../signup.php?error=sqlError");
            exit();
        }
        else{
            mysqli_stmt_bind_param($stmt, "s", $username);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0){
                header("Location: ../signup.php?error=userTaken&email=".$email);
                exit();
            }
            else{
                $sql = "INSERT INTO users (username, email, pwd) VALUES (?, ?, ?)";
                $stmt = mysqli_stmt_init($conn); //using prep statements
                if(!mysqli_stmt_prepare($stmt, $sql)){ //error handling
                    header("Location: ../signup.php?error=sqlError");
                    exit();
                }
                else{
                    $hashPwd = password_hash($pswd, PASSWORD_DEFAULT);
                    mysqli_stmt_bind_param($stmt, "sss", $username, $email, $hashPwd);
                    mysqli_stmt_execute($stmt);
                    header("Location: ../signup.php?success=signup");
                    exit();
                }
            }
        }
    }
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
else{
    header("Location: ../signup.php?error=urlExploration");
    exit();
}
?>