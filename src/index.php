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
        <?php cnt($conn); ?>
    </div>
<div class="sort row">
    <div class="sort--wrapper container d-flex">
        <div class="sort--options col row pl-0 pr-0">
            <div class="sort--options__lvl col-md-4">
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
            <div class="sort--options__module col-md-4">
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
            <div class="sort--options__topic col-md-4">
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
            <input value="" autocomplete="off" required id="search_input" name="term" class="form-control search--input" type="text" placeholder="Search for modules">
            <button class="btn btn-success search--button" type="submit">Search</button>
            <div id="resp"></div>
        </form>
    </div>
</div>

<div class="container">
    <div class="row main">
        <?php fetch($conn, 'module', 'modules'); ?>
    </div><!--end of main row-->
</div><!--end of container-fluid-->
<?php
mysqli_free_result($result);
require_once 'components/footer.php';
?>