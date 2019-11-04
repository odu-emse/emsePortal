<?php
require_once '../templates/header.php';
loginCheck();
?>

<div class="container">
    <div class="row">
        <div class="col mr-auto ml-auto">
            <h3 class="text-center">Set up extraction</h3>
            <form class="form-group d-flex justify-content-center flex-column text-center" action="../templates/folder.php" method="post" enctype="multipart/form-data">
                <input type="text" name="folderName">
                <input type="file" name="folder[]" multiple="" directory="" webkitdirectory="" mozdirectory="">
                <button class="w-25 mr-auto ml-auto mt-5 btn btn-primary" type="submit" name="submit">Submit</button>
            </form>
        </div>
    </div>
</div>



<?php

require_once '../templates/footer.php'
?>