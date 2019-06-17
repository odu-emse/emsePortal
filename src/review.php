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
            <form class="form-group d-flex justify-content-center flex-column text-center" action="../build/components/process.php" method="post">
                <label class="pt-2" for="">Module link</label>
                <input class="form-control pb-2" maxlength="250" type="text" value="<?php echo $link . "/story_html5.html";?>" name="link" required>

                <label class="pt-2" for="">Module number</label>
                <input class="form-control pb-2" max="9999" min="1" type="number" placeholder="Enter a module number" name="number" required>

                <label class="pt-2" for="">Module title</label>
                <input class="form-control pb-2" maxlength="50" type="text" value="<?php echo $metaImport->project['title'];?>" name="title" required>

                <label class="pt-2" for="">Module duration</label>
                <div class="input-group mb-2">
                    <input class="form-control pb-2" maxlength="2" type="text"  value="<?php echo preg_replace("/[^0-9,.]/", "", $metaImport->project['duration']);?>" name="duration" required>
                    <div class="input-group-prepend">
                        <div class="input-group-text">minutes</div>
                    </div>
                </div>

                <label class="pt-2" for="">Module description</label>
                <input class="form-control pb-2" maxlength="1000" type="text" value="<?php echo $metaImport->project[0]->description[0];?>" name="descr" required>
                
                <label class="pt-2" for="">Amount of slides in the module</label>
                <input class="form-control pb-2" maxlength="4" type="text" value="<?php echo $metaImport->project[0]->slidemeta['viewslides'];?>" name="numSlides" required>

                <label class="pt-2" for="">Module professor</label>
                <input class="form-control pb-2" maxlength="50" type="text" value="<?php echo $metaImport->project[0]->author['name'];?>" name="author" required>

                <a class="w-25 mr-auto ml-auto mt-5 btn btn-danger" href="extract.php">Reset</a>
                <button class="w-25 mr-auto ml-auto mt-1 btn btn-success" type="submit">Approve data</button>
            </form>
        </div>
    </div>
</div>



<?php
require_once '../build/components/footer.php'
?>