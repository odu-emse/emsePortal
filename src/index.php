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
?>

<nav class="navbar navbar-expand-md navbar-light bg-light">
    <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
        <div class="ml-0 mr-auto">
            <span><?php echo $_SESSION['fname']; ?></span>
            <span><?php echo $_SESSION['lname']; ?></span>
            <span><?php echo $_SESSION['username']; ?></span>
        </div>
        <form class="form-inline mr-3 ml-auto">
            <input class="form-control" type="text" placeholder="Search for modules">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <a class="btn btn-outline-danger" href="../build/components/logout.php">Logout</a>
    </div>
</nav>
<div class="container-fluid">
    <h1>Overview - ENMA 600</h1>
    <div class="row">
        <div class="container col">
            <div class="row">
                <h3>Modules</h3>
                <div id="accordion">

<?php
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
                            <p class="col float-right metaDuration"><?php echo "Approximately " .  $row['duration'] . " minutes";?></p>
                        </div>

                        <div id="collapse<?php echo $x; ?>" class="collapse" aria-labelledby="heading<?php echo $x; ?>" data-parent="#accordion">
                            <div class="card-body">
                                <?php echo $row['descr'] . "<br>"; ?>
                                <a href="<?php echo $row['link']; ?>" target="_blank">Link to the module</a>.
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
    }
} 
else {
    echo "0 results";
}
//closing of fetch
?>
                </div>
            </div>
        </div>

        <div class="container col">
            <div class="row">
                <h3>Assignments</h3>
            </div>
        </div>
        <div class="container col">
            <div class="row">
                <h3>Homework</h3>
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
mysql_free_result($result);
// Closing connection
mysql_close($link);
?>