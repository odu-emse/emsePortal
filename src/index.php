<?php
session_start();

require_once 'components/header.php';
require_once 'components/globals.php';
require_once 'components/fn.php';

//declaring counter
$x = 0;
$y = 0;

loginCheck();
search($conn);

include_once 'components/nav.php';
?>
    <div class="jumb row container ml-auto mr-auto">
        <div class="jumb--text col">
            <h3 class="jumb--text--title">Carry on learning</h3>
            <p class="jumb--text--paragraph">Theoretically the image on the right would be a module that the user haven't completed but started already. The button is a call to action that would link them to the actual housing page. The problem with this is that we still can't access the progress cookies that Articulate stores in the browser.</p>
            <a class="btn btn-success jumb--text--cta" href="#">Continue module</a>
        </div>
        <div class="jumb--img col">
            <img class="jumb--img__ill" src="https://via.placeholder.com/1920x1080.png?text=Illustration+Comes+Here" alt="">
        </div>
    </div>
<div class="sort row">
    <div class="sort--wrapper container d-flex">
        <div class="sort--options col row pl-0 pr-0">
            <div class="sort--options__lvl col">
                <div class="sort--options--wrapper">
                    <label class="sort--label sr-only" for="">Level of difficulty</label>
                    <select class="sort--select" name="diff" id="">
                        <option value="false">Level of difficulty</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="extreme">Extreme</option>
                    </select>
                </div>
            </div>
            <div class="sort--options__module col">
                <div class="sort--options--wrapper">
                    <label class="sort--label sr-only" for="">Module duration</label>
                    <select class="sort--select" name="dur" id="">
                        <option value="false">Module duration</option>
                        <option value="below10">< 10</option>
                        <option value="btw2030">20 - 30</option>
                        <option value="over30">> 30</option>
                    </select>
                </div>
            </div>
            <div class="sort--options__topic col">
                <div class="sort--options--wrapper">
                    <label class="sort--label sr-only" for="">Topic</label>
                    <select class="sort--select" name="topic" id="">
                        <option value="false">Topic</option>
                        <option value="acct">Accounting</option>
                        <option value="pmt">Project Management</option>
                        <option value="prog">Programming</option>
                        <option value="math">Mathematics</option>
                    </select>
                </div>
            </div>
        </div>
        <form class="form-inline ml-0 search sort--search" action="search.php" method="get">
            <input autocomplete="off" required id="search_input" name="term" class="form-control search--input" type="text" placeholder="Search for modules">
            <button class="btn btn-success search--button" type="submit">Search</button>
            <div id="resp"></div>
        </form>
    </div>
</div>

<div class="container">
    <h1 class="ml-3">Overview - ENMA 600</h1>
    <div class="row main">
        <div class="main--roller">
            <div class="card-deck">
                <div class="card">
                    <img class="card-img-top" src="https://via.placeholder.com/1920x1080.png?text=Illustration+Comes+Here" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Module Title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted card-footer-info">
                            <i class="fa fa-battery-1 info--item__icon"></i>
                            Difficulty
                        </small>
                        <small class="text-muted card-footer-info">
                            <i class="fa fa-user info--item__icon"></i>
                            Duration
                        </small>
                        <small class="text-muted card-footer-info">
                            <i class="fa fa-graduation-cap info--item__icon"></i>
                            Topic
                        </small>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="https://via.placeholder.com/1920x1080.png?text=Illustration+Comes+Here" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Module Title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted card-footer-info">
                            <i class="fa fa-battery-1 info--item__icon"></i>
                            Difficulty
                        </small>
                        <small class="text-muted card-footer-info">
                            <i class="fa fa-user info--item__icon"></i>
                            Duration
                        </small>
                        <small class="text-muted card-footer-info">
                            <i class="fa fa-graduation-cap info--item__icon"></i>
                            Topic
                        </small>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="https://via.placeholder.com/1920x1080.png?text=Illustration+Comes+Here" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Module Title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted card-footer-info">
                            <i class="fa fa-battery-1 info--item__icon"></i>
                            Difficulty
                        </small>
                        <small class="text-muted card-footer-info">
                            <i class="fa fa-user info--item__icon"></i>
                            Duration
                        </small>
                        <small class="text-muted card-footer-info">
                            <i class="fa fa-graduation-cap info--item__icon"></i>
                            Topic
                        </small>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="https://via.placeholder.com/1920x1080.png?text=Illustration+Comes+Here" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Module Title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted card-footer-info">
                            <i class="fa fa-battery-1 info--item__icon"></i>
                            Difficulty
                        </small>
                        <small class="text-muted card-footer-info">
                            <i class="fa fa-user info--item__icon"></i>
                            Duration
                        </small>
                        <small class="text-muted card-footer-info">
                            <i class="fa fa-graduation-cap info--item__icon"></i>
                            Topic
                        </small>
                    </div>
                </div>
            </div>
        </div>
        <div class="container main--panel">
            <div class="row flex-column">
                <h3 class="main--panel__header">Modules</h3>
                <div id="accordion">
                    <?php fetch($conn, 'module', 'modules'); ?>
                </div><!--closing of accordion-->
                <a href="#" class="btn btn-primary mr-auto ml-auto mt-2 pl-5 pr-5" id="loadModules">Load Additional Modules</a>
            </div><!--closing of row-->
        </div><!--closing of container-->
        <div class="container main--panel">
            <div class="row flex-column">
                <h3 class="main--panel__header">Available Assignments</h3>
                <?php fetch($conn, 'assg', 'assg'); ?>
                <a href="#" class="btn btn-primary mr-auto ml-auto mt-2 pl-5 pr-5" id="loadAssg">Load Additional Assignments</a>
            </div><!--end of row-->
        </div><!--end of container col-->
    </div><!--end of main row-->
</div><!--end of container-fluid-->
<?php
mysqli_free_result($result);
require_once 'components/footer.php';
?>