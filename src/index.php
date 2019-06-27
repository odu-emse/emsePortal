<?php
session_start();

require_once '../build/components/header.php';
require_once '../build/components/globals.php';
require_once '../build/components/fn.php';

//importing data from XML file provided by content team
//we could possibly make a page that takes all the parameters from the directory that was exported and INSERT INTO the modules table 
$metaImport = simplexml_load_file("output/meta.xml") or die("Error: Cannot create object");

//fetching data
$sql = "SELECT * FROM module";
$result = $conn->query($sql);
loginCheck();
search($conn);

include_once '../build/components/nav.php';
?>

<div class="container-fluid">
    <h1>Overview - ENMA 600</h1>
    <div class="row">
        <div class="container col">
            <div class="row">
                <h3>Modules</h3>
                <div id="accordion">

<?php
$x = 0;
if ($result->num_rows > 0) {
    // output data of each row
    //opening fetch
    while($row = $result->fetch_assoc()) {
    //running the amount of times the while loop is gonna run which equals to the amount of rows we have in the db
    $x++;
?>
                    <div class="card">
                        <div class="card-header row" id="heading<?php echo $x; ?>">
                            <h5 class="mb-0 col metaTitle">
                                <button class="btn btn-link" data-toggle="collapse" data-target="#collapse<?php echo $x; ?>"
                                    aria-expanded="true" aria-controls="collapse<?php echo $x; ?>">
                                    <?php echo $row['name'] . " - module " . $row['number'];?>
                                </button>
                            </h5>
                            <p class="col float-right metaDuration"><?php timeConversion($row['duration']); ?></p>
                        </div>

                        <div id="collapse<?php echo $x; ?>" class="collapse" aria-labelledby="heading<?php echo $x; ?>" data-parent="#accordion">
                            <div class="card-body">
                                <?php echo $row['descr'] . "<br>"; ?>
                                <a href="<?php echo $row['link']; ?>" target="_blank">Access the module here.</a>
                                <!--TODO: if module complete == true echo checked and disabled checkbox-->
                                <form action="" class="float-right" method="get">
                                    <!--<input type="checkbox" class="module-check" name="<?php /*echo "module" . $x; */?>">-->
                                    <button class="btn btn-primary" type="submit" name="<?php echo "module" . $x; ?>" value="true">Mark module complete</button>
                                </form>
                                <?php completion($x, $conn); ?>
                                <!-- <p>Related modules</p> -->
                                <?php 
                                    $y = $x - 1;
                                    $relation1 = $row['relation' . $y--];
                                    //echo $relation1;
                                    //dynamically shows the relation number corresponding to variable x minus 1 cloned into variable y
                                ?>
                            </div>
                        </div>
                    </div>
<?php
    }//closing of fetch
}//closing of if
else {
    //if can't show modules, error handling
    echo "0 results";
}

$sql = "SELECT * FROM assg";
$result = $conn -> query($sql);
$y = 0;
if ($result->num_rows > 0) {
    // output data of each row
    //opening fetch
    while($row = $result->fetch_assoc()) {
        //running the amount of times the while loop is gonna run which equals to the amount of rows we have in the db
        $y++;
?>
                </div><!--closing of accordion-->
                <a href="#" class="btn btn-primary mr-auto ml-auto mt-2 pl-5 pr-5" id="load">Load Additional Modules</a>
            </div><!--closing of row-->
        </div><!--closing of container-->

        <div class="container col">
            <div class="row">
                <h3>Assignments</h3>
                <!--TODO: add some content here so it's not so empty-->
                <div class="assg-container">
                    <h3 class="assg assg-title"><?php echo $row['name'] ?></h3>
                    <p class="assg assg-text"><?php echo $row['descr'] ?></p>
                    <p class="assg assg-text">Number of questions: <?php echo $row['num_q'] ?></p>
                    <p class="assg assg-text">Estimated time: <?php timeConversion($row['est_time']); ?> </p>
                    <div class="assg assg-wrap">
                        <p class="assg assg-text assg-text__help small">Related module(s): <?php echo $row['related_module'] ?></p>
                        <p class="assg assg-text assg-text__help small">Assigned by: <?php echo $row['author'] ?></p>
                    </div>
                    <form action="assg.php" method="get">
                        <!--TODO: add assg.php file and get the info passed from this form and display the appropriate data-->
                        <!--TODO: create a new table every time someone creates a new quiz/assg from a form-->
                        <button class="assg btn btn-primary float-right" type="submit" name="<?php echo urlencode($row['name']. "?uid=" . $row['uid']);?>">Start post test assignment</button>
                    </form>
                </div>
            </div>
        </div>
<?php
    }//closing of fetch of assg
}//closing of if of assg
else {
    //if can't show assgs, error handling
    echo "0 results";
}
?>
        <div class="container col">
            <div class="row">
                <h3>Homework</h3>
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
    </div>    


</div>
<?php
require_once '../build/components/footer.php';
mysqli_free_result($result);
// Closing connection
mysqli_close($link);
?>