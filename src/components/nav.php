<nav class="navbar navbar-expand-md navbar-light bg-light">
    <a class="navbar-brand" href="index.php">
        <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png" height="30" class="d-inline-block" alt="">
    </a>
    <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
        <div class="ml-auto mr-auto">
            <span><?php echo $_SESSION['fname']; ?></span>
            <span><?php echo $_SESSION['lname']; ?></span>
            <span><?php echo $_SESSION['username']; ?></span>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="index.php">Overview</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="index.php">Modules</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="index.php">Assignments</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Admin Utilities
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="userReg.php">User Registration</a>
                        <a class="dropdown-item" href="extract.php">Extraction</a>
                        <a class="dropdown-item" href="testReg.php">Assignment Addition</a>
                    </div>
                </li>
            </ul>
        </div>
        <form class="form-inline ml-0 search" action="search.php" method="get">
            <input autocomplete="off" required id="search_input" name="term" class="form-control search--input" type="text" placeholder="Search for modules">
            <button class="btn btn-outline-success search--button" type="submit">Search</button>
            <div id="resp"></div>
            <a class="btn btn-danger search--logout" href="components/logout.php">Logout</a>
        </form>
    </div>
</nav>