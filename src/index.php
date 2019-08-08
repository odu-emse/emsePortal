<?php
session_start();

require_once 'components/header.php';
require_once 'components/globals.php';
require_once 'components/fn.php';

//importing data from XML file provided by content team
//we could possibly make a page that takes all the parameters from the directory that was exported and INSERT INTO the modules table 
$metaImport = simplexml_load_file("output/meta.xml") or die("Error: Cannot create object");

//declaring counter
$x = 0;
$y = 0;

loginCheck();
search($conn);

include_once 'components/nav.php';
?>
    <div class="jumb">
        <div class="jumb--text">
            <h3 class="jumb--text--title">This Title</h3>
            <p class="jumb--text--paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto incidunt possimus quis, quo rem repudiandae sint tempore temporibus totam. Ea enim eveniet ipsam, iusto laborum numquam porro praesentium reprehenderit?</p>
            <p class="jumb--text--cta">Call to action</p>
        </div>
        <div class="jumb--img">
            <img src="https://via.placeholder.com/728x90.png?text=Illustration+Comes+Here" alt="">
        </div>
    </div>

<div class="container-fluid">
    <h1>Overview - ENMA 600</h1>
    <div class="row main">
        <div class="container col main--panel">
            <div class="row flex-column">
                <h3 class="main--panel__header">Modules</h3>
                <div id="accordion">
                    <?php fetch($conn, 'module', 'modules'); ?>
                </div><!--closing of accordion-->
                <a href="#" class="btn btn-primary mr-auto ml-auto mt-2 pl-5 pr-5" id="loadModules">Load Additional Modules</a>
            </div><!--closing of row-->
        </div><!--closing of container-->
    <div class="container col main--panel">
        <div class="row flex-column">
            <h3 class="main--panel__header">Available Assignments</h3>
            <?php fetch($conn, 'assg', 'assg'); ?>
            <a href="#" class="btn btn-primary mr-auto ml-auto mt-2 pl-5 pr-5" id="loadAssg">Load Additional Assignments</a>
        </div><!--end of row-->
    </div><!--end of container col-->
<!--        <div class="container col main--panel">-->
<!--            <div class="row">-->
<!--                <h3 class="main--panel__header">Homework</h3>-->
                    <!--TODO: meet with chair to get feedback and add content here and what it should look like-->
<!--                <div class="row">-->
<!--                    <div class="col">-->
<!--                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique in perspiciatis ut ipsa neque ea eum-->
<!--                        facere veniam voluptatem ipsam nesciunt eligendi sequi illo sed porro tempore quia, aspernatur minima?-->
<!--                    </div>-->
<!--                    <div class="col">-->
<!--                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui quis ducimus eveniet tempora pariatur iste-->
<!--                        repellat aut nesciunt possimus error. Atque optio soluta quo cum eos? Error quae esse architecto.-->
<!--                    </div>-->
<!--                    <div class="col">-->
<!--                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium omnis, fugit nemo in alias autem-->
<!--                        similique ratione enim modi magnam, ab dicta doloribus vero nesciunt aliquam suscipit dignissimos quae-->
<!--                        quidem.-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->


</div><!--end of main row-->
</div><!--end of container-fluid-->
<?php
require_once 'components/footer.php';
mysqli_free_result($result);
// Closing connection
mysqli_close($link);
?>