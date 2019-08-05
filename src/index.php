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

<div class="container-fluid">
    <h1>Overview - ENMA 600</h1>
    <div class="row main">
        <div class="container col main--panel">
            <div class="row flex-column">
                <h3 class="main--panel__header">Modules</h3>
                <div id="accordion">
<?php

$sql = "SELECT * FROM module";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {        //fetch data if there are any rows
    while ($row = mysqli_fetch_assoc($result)) {            //loop will run until we reach the end of db rows
    $x++;
?>

        <div class="card">
            <div class="card-header row" id="heading<?php echo $x; ?>">
                <h5 class="mb-0 col metaTitle">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse<?php echo $x; ?>"
                            aria-expanded="true" aria-controls="collapse<?php echo $x; ?>">
                        <?php echo $row['name'] . " - module " . $row['number']; ?>
                    </button>
                </h5>
                <p class="col float-right metaDuration"><?php timeConversion($row['duration']); ?></p>
            </div>

            <div id="collapse<?php echo $x; ?>" class="collapse" aria-labelledby="heading<?php echo $x; ?>"
                 data-parent="#accordion">
                <div class="card-body">
                    <?php echo $row['descr'] . "<br>"; ?>
                    <div class="card-body__form">
<!--                        <a href="--><?php //echo $row['link']; ?><!--" target="_blank" class="">Access the module here.</a>-->
                        <!--TODO: if module complete == true echo checked and disabled checkbox-->
                        <form class="card-body__form--form" action="housing.php" method="get">
                            <button class="btn btn-primary card-body__form--access" type="submit" name="access" value="<?php echo $row['uid'];?>">
                                Access the module
                            </button>
                        </form>
                        <form class="card-body__form--form" method="get">
                            <button class="btn btn-outline-secondary card-body__form--comp" type="submit" name="<?php echo "module" . $x; ?>" value="true">
                                Mark module complete
                            </button>
                            <?php completion($x, $conn);?>
                        </form>
                    </div>
                </div><!--end of card-body-->
            </div><!--end of collapse-->
        </div><!--end of card-->

        <?php
    }//end of while
}//end of if
?>
        </div><!--closing of accordion-->
                <a href="#" class="btn btn-primary mr-auto ml-auto mt-2 pl-5 pr-5" id="loadModules">Load Additional Modules</a>
            </div><!--closing of row-->
        </div><!--closing of container-->
    <div class="container col main--panel">
        <div class="row flex-column">
        <h3 class="main--panel__header">Available Assignments</h3>


<?php
$sql = "SELECT * FROM assg";
$result = $conn -> query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    //opening fetch
    while($row = $result->fetch_assoc()) {
        //running the amount of times the while loop is gonna run which equals to the amount of rows we have in the db
        $y++;
?>
            <div class="assg-container mb-1 pb-2 pt-2">
                    <h3 class="assg assg-title"><?php echo $row['name'] ?></h3>
                    <p class="assg assg-text">Description: <?php echo $row['descr'] ?></p>
                    <p class="assg assg-text">Number of questions: <?php echo $row['num_q'] ?></p>
                    <p class="assg assg-text">Estimated time: <?php timeConversion($row['est_time']); ?> </p>
                    <div class="assg assg-wrap">
                        <p class="assg assg-text assg-text__help small">Related module(s): <?php echo $row['related_module'] ?></p>
                        <p class="assg assg-text assg-text__help small">Assigned by: <?php echo $row['author'] ?></p>
                    </div>
                    <form action="assg.php" method="get">
                        <!--TODO: get the info passed from this form and display the appropriate data-->
                        <!--TODO: add related modules list here!!!-->
                        <button class="assg btn btn-primary float-right" type="submit" name="<?php echo urlencode($row['name']. "?uid=" . $row['uid']);?>">Start post test assignment</button>
                    </form>
            </div> <!--end of assg container-->

<?php
    }//closing of fetch of assg
}//closing of if of assg
else {
    //if can't show assgs, error handling
    echo "0 results";
}
?>
            <a href="#" class="btn btn-primary mr-auto ml-auto mt-2 pl-5 pr-5" id="loadAssg">Load Additional Assignments</a>
        </div><!--end of row-->
    </div><!--end of container col-->
        <div class="container col main--panel">
            <div class="row">
                <h3 class="main--panel__header">Homework</h3>
                <!--TODO: meet with chair to get feedback and add content here and what it should look like-->
                <div class="row">
                    <div class="col">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique in perspiciatis ut ipsa neque ea eum
                        facere veniam voluptatem ipsam nesciunt eligendi sequi illo sed porro tempore quia, aspernatur minima?
                    </div>
                    <div class="col">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui quis ducimus eveniet tempora pariatur iste
                        repellat aut nesciunt possimus error. Atque optio soluta quo cum eos? Error quae esse architecto.
                    </div>
                    <div class="col">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium omnis, fugit nemo in alias autem
                        similique ratione enim modi magnam, ab dicta doloribus vero nesciunt aliquam suscipit dignissimos quae
                        quidem.
                    </div>
                </div>
            </div>
        </div>


</div><!--end of main row-->
</div><!--end of container-fluid-->
<?php
require_once 'components/footer.php';
mysqli_free_result($result);
// Closing connection
mysqli_close($link);
?>