<nav class="navbar navbar-expand-md navbar-light ml-auto mr-auto">
    <a class="navbar-brand ml-3" href="splash.php">
        <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png" height="30" class="d-inline-block" alt="">
    </a>
    <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse mr-3" id="collapsibleNavId">
        <div class="ml-auto">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="index.php">Overview</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Admin Utilities
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="extract.php">Extraction</a>
                        <a class="dropdown-item" href="testReg.php">Assignment Addition</a>
                    </div>
                </li>
                <?php include "loginForm.php"; ?>
            </ul>
        </div>
    </div>
</nav>