<?php
if (isset($_POST['login'])){
    require "header.php";

    $username = $_POST['uid'];
    $password = $_POST['password'];

    if (empty($username) || empty($password)){ //error handler
        header("Location: ../src/index.php?error=emptyFields");
        exit();
    }
    else{
        $sql = "SELECT * FROM users WHERE username=? OR email=?";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("Location: ../src/index.php?error=SQLerror");
            exit();
        }
        else{
            mysqli_stmt_bind_param($stmt, "ss", $username, $username);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if($row = mysqli_fetch_assoc($result)){
                $passCheck = password_verify($password, $row['pwd']);
                if ($passCheck == false){
                    header("Location: ../src/index.php?error=passwordIncorrect");
                    exit();
                }
                elseif ($passCheck == true){
                    session_start();
                    $_SESSION['uid'] = $row['uid'];
                    $_SESSION['username'] = $row['username'];
                    $_SESSION['email'] = $row['email'];

                    header("Location: ../src/index.php?success=login");
                    exit();
                }
                else{
                    header("Location: ../src/index.php?error=passwordIncorrect");
                    exit();
                }
            }
            else{
                header("Location: ../src/index.php?error=userNotFound");
                exit();
            }
        }
    }
}
else{ //error handler
    header("Location: ../src/index.php?error=urlExploration");
    exit();
}