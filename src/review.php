<?php
require_once '../templates/header.php';
loginCheck();

$folderName = $_POST['link'];

$metaImport = simplexml_load_file("../public/assets/" . $folderName . "/meta.xml") or die("Error: Cannot create object");

?>

<div class="container">
    <div class="row">
        <div class="col mr-auto ml-auto">
            <h3  class="text-center">Review the data extracted</h3>
            <form id="review" class="form-group d-flex justify-content-center flex-column text-center dropzone" action="../templates/process.php" method="post" enctype="multipart/form-data">
                <label class="pt-2" for="">Course number
                    <input class="form-control pb-2" maxlength="3" type="number" placeholder="Enter a course number" name="courseNumber" required>
                </label>

                <label class="pt-2" for="">Course name
                    <input class="form-control pb-2" maxlength="250" type="text" placeholder="Enter a course name" name="courseName" required>
                </label>

                <label class="pt-2" for="">Module number
                    <input class="form-control pb-2" max="9999" min="1" type="number" placeholder="Enter a module number" name="number" required>
                </label>

                <label class="pt-2" for="">Module title
                    <input class="form-control pb-2" maxlength="50" type="text" value="<?php echo $metaImport->project['title'];?>" name="title" required>
                </label>

                <label class="pt-2" for="">Module link
                    <input class="form-control pb-2" maxlength="250" type="text" value="<?php echo $folderName;?>" name="link" required>
                </label>

                <label class="pt-2" for="">Module duration
                <div class="input-group mb-2">
                    <input class="form-control pb-2" maxlength="2" type="text"  value="<?php echo preg_replace("/[^0-9,.]/", "", $metaImport->project['duration']);?>" name="duration" required>
                    <div class="input-group-prepend">
                        <div class="input-group-text">minutes</div>
                    </div>
                </div>
                </label>

                <label class="pt-2" for="">Module description
                <input class="form-control pb-2" maxlength="1000" type="text" value="<?php echo $metaImport->project[0]->description[0];?>" name="descr" required>
                </label>

                <label class="pt-2" for="">Amount of slides in the module
                <input class="form-control pb-2" maxlength="4" type="text" value="<?php echo $metaImport->project[0]->slidemeta['viewslides'];?>" name="numSlides" required>
                </label>

                <label class="pt-2" for="">Module professor
                    <input class="form-control pb-2" maxlength="50" type="text" value="<?php echo $metaImport->project[0]->author['name'];?>" name="author" required>
                </label>

                <div id='TextBoxesGroup' class="addGroup">
                    <input id="hiddenCounter" type="hidden" name="hiddenCounter" value="1">
                    <div id="TopicWrapper1" class="addGroup--wrapper">
                        <label class="pt-2 addGroup--label">Topic #1
                        <input class="form-control addGroup--input w-100" type='text' id='topic1' name="topic[]">
                        </label>
                        <div id="topic--insert">

                        </div>
                        <div class="mb-2">
                            <button class="btn btn-primary" type='button' value='Add Button' id='addButton'>Add topic</button>
                            <button class="btn btn-outline-danger" type='button' value='Remove Button' id='removeButton'>Remove topic</button>
                        </div>
                    </div>
                </div>

                <p>Drop files here to upload them or include links below to online resources below.</p>
                <div class="fallback">
                    <input name="file" type="file" multiple />
                </div>

                <div id="RecWrapper" class="addGroup">
                    <input id="hiddenCounterRec" type="hidden" name="hiddenCounterRec" value="1">
                    <div id="RecWrapper1" class="addGroup--wrapper">
                        <label class="addGroup--label">Resource #1 Name & URL</label>
                        <div class="addGroup--input--wrapper row">
                            <input class='form-control addGroup--input col-md-6' placeholder="Name" type='text' id='rec1' name="recName[]">
                            <input class='form-control addGroup--input col-md-6' placeholder="URL" type='text' id='rec1' name="recLink[]">
                        </div>
                        <div id="rec--insert">

                        </div>
                        <div class="mt-2">
                            <button class="btn btn-primary" type='button' value='Add Button' id='addRec'>Add resource</button>
                            <button class="btn btn-outline-danger" type='button' value='Remove Button' id='removeRec'>Remove resource</button>
                        </div>
                    </div>
                </div>

                <a class="w-25 mr-auto ml-auto mt-5 btn btn-danger" href="extract.php">Reset</a>
                <button class="w-25 mr-auto ml-auto mt-1 btn btn-success" name="submit" type="submit">Approve data</button>
            </form>
        </div>
    </div>
</div>



<?php
require_once '../templates/footer.php'
?>