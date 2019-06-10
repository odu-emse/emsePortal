<?php
session_start();

require_once '../build/components/header.php';
require_once '../build/components/globals.php';

$link = $_POST['link'];

$metaImport = simplexml_load_file($link . "/meta.xml") or die("Error: Cannot create object");

?>

<div class="container">
    <div class="row">
        <div class="col mr-auto ml-auto">
            <h3  class="text-center">Review the data extracted</h3>
            <form class="form-group d-flex justify-content-center flex-column text-center" action="process.php" method="post">
                <label for="">Module link</label>
                <input class="form-control pb-2" type="text" value="<?php echo $link;?>" name="link" required>

                <label for="">Module number</label>
                <input class="form-control pb-2" type="number" placeholder="Enter a module number" name="number" required>

                <label for="">Module title</label>
                <input class="form-control pb-2" type="text" value="<?php echo $metaImport->project['title'];?>" name="title" required>

                <label for="">Module duration</label>
                <input class="form-control pb-2" type="number" value="<?php echo $metaImport->project['duration'];?>" name="duration" required>

                <label for="">Module description</label>
                <input class="form-control pb-2" type="text" value="<?php echo $metaImport->description[0];?>" name="descr" required>
                
                <label for="">Amount of slides in the module</label>
                <input class="form-control pb-2" type="text" value="<?php echo $metaImport->project[0]->slidemeta['viewslides'];?>" name="numSlides" required>

                <label for="">Module professor</label>
                <input class="form-control pb-2" type="text" value="<?php echo $metaImport->author['name'];?>" name="author" required>

                <a class="w-25 mr-auto ml-auto mt-5 btn btn-danger" href="extract.php">Reset</a>
                <button class="w-25 mr-auto ml-auto mt-1 btn btn-success" type="submit">Approve data</button>
            </form>
        </div>
    </div>
</div>



<?php
require_once '../build/components/footer.php'
?>