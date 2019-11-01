<?php
if (isset($_POST['reset-password'])){
    $selector = $_POST['selector'];
    $validator = $_POST['validator'];
    $password = $_POST['password'];
    $confPassword = $_POST['conf-password'];

    if (empty($password) || empty($confPassword)){
        header("Location: ../src/index.php?error=emptyFields");
        exit();
    }
    elseif ($password != $confPassword){
        header("Location: ../src/index.php?error=pswdNotMatching");
        exit();
    }

    $currentDate = date("U");

    require "header.php";

    $sql = "SELECT * FROM pwdReset WHERE selector=? AND expires>=?";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)){
        header("Location: ../src/index.php?error=resetConn");
        exit();
    }
    else{
        mysqli_stmt_bind_param($stmt, "ss", $selector, $currentDate);
        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);
        if (!$row = mysqli_fetch_assoc($result)){
            header("Location: ../src/index.php?error=resetConn");
            exit();
        }
        else{
            $tokenBin = hex2bin($validator);
            $tokenCheck = password_verify($tokenBin, $row['token']);

            if ($tokenCheck === false){
                header("Location: ../src/index.php?error=resetConn");
                exit();
            }
            elseif ($tokenCheck === true){
                $tokenEmail = $row['email'];
                $sql = "SELECT * FROM users WHERE email=?;";
                $stmt = mysqli_stmt_init($conn);
                if (!mysqli_stmt_prepare($stmt, $sql)){
                    header("Location: ../src/index.php?error=resetConn");
                    exit();
                }
                else{
                    mysqli_stmt_bind_param($stmt, "s", $tokenEmail);
                    mysqli_stmt_execute($stmt);
                    $result = mysqli_stmt_get_result($stmt);
                    if (!$row = mysqli_fetch_assoc($result)){
                        header("Location: ../src/index.php?error=resetConn");
                        exit();
                    }
                    else{
                        $sql = "UPDATE users SET pwd=? WHERE email=?";
                        $stmt = mysqli_stmt_init($conn);
                        if (!mysqli_stmt_prepare($stmt, $sql)){
                            header("Location: ../src/index.php?error=resetConn");
                            exit();
                        }
                        else {
                            $hashedPass = password_hash($password, PASSWORD_DEFAULT);
                            mysqli_stmt_bind_param($stmt, "ss", $hashedPass, $tokenEmail);
                            mysqli_stmt_execute($stmt);

                            $sql = "DELETE FROM pwdReset WHERE email=?";
                            $stmt = mysqli_stmt_init($conn);
                            if (!mysqli_stmt_prepare($stmt, $sql)){
                                header("Location: ../src/resetPass.php?error=resetConn");
                                exit();
                            }
                            else{
                                mysqli_stmt_bind_param($stmt, "s", $tokenEmail);
                                mysqli_stmt_execute($stmt);
                                header("Location: ../src/index.php?success=reset");
                            }
                        }
                    }
                }
            }
        }
    }
}
else{
    header("Location: ../src/index.php");
    exit();
}