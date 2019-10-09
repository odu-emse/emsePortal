<?php
if (isset($_GET['error'])){
    if ($_GET['error'] == "emptyFields"){
        echo '
        <div class="error alert alert-danger alert-dismissible fade show" role="alert">
            Please fill in all the fields.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['error'] == "SQLerror"){
        echo '
        <div class="error alert alert-warning alert-dismissible fade show" role="alert">
            There was an error while trying to connect to the database. Please try again in a couple minutes or contact the <a href="mailto:dpapp@odu.edu">system administrator</a> this keeps happening. 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['error'] == "passwordIncorrect"){
        echo '
        <div class="error alert alert-danger alert-dismissible fade show" role="alert">
            Incorrect password.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['error'] == "userNotFound"){
        echo '
        <div class="error alert alert-danger alert-dismissible fade show" role="alert">
            User not found. Please verify the credentials entered.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['error'] == "userTaken"){
        echo '
        <div class="error alert alert-danger alert-dismissible fade show" role="alert">
            User with this name already exists. <a href="index.php">Login</a> if you are already a user or verify the credentials you entered.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['error'] == "pswdNotMatching"){
        echo '
        <div class="error alert alert-danger alert-dismissible fade show" role="alert">
            Passwords don\'t match.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['error'] == "invalidUsername"){
        echo '
        <div class="error alert alert-danger alert-dismissible fade show" role="alert">
            Username contains unsupported letters or characters. Please only use alphanumeric characters.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['error'] == "invalidEmail"){
        echo '
        <div class="error alert alert-danger alert-dismissible fade show" role="alert">
            Email contains unsupported characters. Please user proper email address formatting.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['error'] == "invalidEmailUsername"){
        echo '
        <div class="error alert alert-danger alert-dismissible fade show" role="alert">
            Email or Username contains unsupported characters. Please user proper formatting for email and use alphanumerical characters for username.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['error'] == "urlExploration"){
        echo '
        <div class="error alert alert-danger alert-dismissible fade show" role="alert">
            Please log in to access this site.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['error'] == "resetConn"){
        echo '
        <div class="error alert alert-danger alert-dismissible fade show" role="alert">
            There was an error while processing your request. Please try again later.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['error'] == "notLoggedIn"){
        echo '
        <div class="error alert alert-danger alert-dismissible fade show" role="alert">
            Please log in before accessing that page.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
}
elseif (isset($_GET['success'])){
    if ($_GET['success'] == "login"){
        echo '
        <div class="error alert alert-success alert-dismissible fade show" role="alert">
            Login successful.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['success'] == "signup"){
        echo '
        <div class="error alert alert-success alert-dismissible fade show" role="alert">
            Sign up successful.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['success'] == "resetEmail"){
        echo '
        <div class="error alert alert-success alert-dismissible fade show" role="alert">
            Password reset email successfully sent. Please check your inbox.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
    elseif ($_GET['success'] == "reset"){
        echo '
        <div class="error alert alert-success alert-dismissible fade show" role="alert">
            Password reset successful.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        ';
    }
}