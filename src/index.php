<?php
session_start();
require_once 'components/header.php';
search($conn);
include_once 'components/nav.php';
//declaring counter
$x = 0;
$y = 0;
?>
    <div class="jumb row container ml-auto mr-auto">
        <?php cnt($conn); ?>
    </div>
<div class="sort row">
    <div class="sort--wrapper container d-flex">
        <form class="form-inline ml-0 search sort--search" action="search.php" method="get">
            <div class="sort--options__lvl col-lg-3 col-md-12">
                <div class="sort--options--wrapper">
                    <label class="sort--label sr-only" for="">Level of difficulty</label>
                    <select class="sort--select" name="diff" id="">
                        <option value="false">Level of difficulty</option>
                        <option value="beginner">0 - 2</option>
                        <option value="intermediate">2 - 3</option>
                        <option value="extreme">3 - 5</option>
                    </select>
                </div>
            </div>
            <div class="sort--options__module col-lg-3 col-md-12">
                <div class="sort--options--wrapper">
                    <label class="sort--label sr-only" for="">Module duration</label>
                    <select class="sort--select" name="dur" id="">
                        <option value="false">Module duration</option>
                        <option value="below10">< 10</option>
                        <option value="btw1030">10 - 30</option>
                        <option value="over30">> 30</option>
                    </select>
                </div>
            </div>
            <div class="sort--options__topic col-lg-2 col-md-12">
                <div class="sort--options--wrapper">
                    <label class="sort--label sr-only" for="">Topic</label>
                    <select class="sort--select" name="topic" id="">
                        <option value="false">Topic</option>
                        <option value="acct">Accounting</option>
                        <option value="pmt">Project Management</option>
                        <option value="prog">Programming</option>
                        <option value="math">Mathematics</option>
                        <option value="modelling">Modelling</option>
                    </select>
                </div>
            </div>
            <div class="sort--options__search col-lg-4 col-md-12 pr-0">
                <div class="sort--options--wrapper">
                    <input value="" autocomplete="off" id="search_input" name="searchQuery" class="form-control search--input" type="text" placeholder="Search for modules">
                    <button class="btn btn-success search--button" type="submit" value="true" name="submitSearch">Search</button>
                </div>
            </div>
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