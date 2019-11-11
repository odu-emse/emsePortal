<?php
require_once '../templates/header.php';
loginCheck();
?>

<div class="container">
    <div class="row">
        <div class="col mr-auto ml-auto">
            <h3 class="text-center">Set up extraction</h3>
            <form class="form-group d-flex justify-content-center flex-column text-center" action="../public/upload/unzipper.php" method="post" enctype="multipart/form-data">
                <div class="d-flex flex-row">
                    <input class="flex-grow-1 ml-2 w-50" type="file" name="zipfile">
                    <input type="text" name="extpath" />
                </div>

                <button class="w-25 mr-auto ml-auto mt-3 btn btn-primary" type="submit" name="dounzip">Submit</button>
            </form>
        </div>
    </div>
</div>



<?php

require_once '../templates/footer.php'
?>