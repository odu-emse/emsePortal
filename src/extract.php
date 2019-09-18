<?php
require_once 'components/header.php';
?>

<div class="container">
    <div class="row">
        <div class="col mr-auto ml-auto">
            <h3 class="text-center">Set up extraction</h3>
            <form class="form-group d-flex justify-content-center flex-column text-center" action="review.php" method="post">
                <label class="w-100" for="">Folder name of the project that is being added</label>
                <input class="w-100 form-control" maxlength="250" type="text" placeholder="Enter folder name" name="link" required>

                <button class="w-25 mr-auto ml-auto mt-5 btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    </div>
</div>



<?php

require_once 'components/footer.php'
?>