<?php
session_start();

require_once '../build/components/header.php';
require_once '../build/components/globals.php';

?>

<div class="container">
    <div class="row">
        <div class="col mr-auto ml-auto">
            <h3  class="text-center">Review the data extracted</h3>
            <form class="form-group d-flex justify-content-center flex-column text-center" action="../build/components/register.php" method="post">
                <label class="pt-2 sr-only" for="">First name</label>
                <input class="form-control pb-2" type="text" value="" name="fname" placeholder="First name" required>

                <label class="pt-2 sr-only" for="">Last name</label>
                <input class="form-control pb-2" type="text" placeholder="Last name" name="lname" required>

                <label class="pt-2 sr-only" for="">MIDAS ID</label>
                <input class="form-control pb-2" type="number" value="" maxlength="8" placeholder="MIDAS ID (ex: 01010101)" name="midasID" required>

                <label class="pt-2 sr-only" for="">MIDAS username</label>
                <div class="input-group">
                    <input class="form-control pb-2" type="text" maxlength="7" placeholder="example001" value="" name="username" required>
                    <div class="input-group-prepend">
                        <div class="input-group-text">@odu.edu</div>
                    </div>
                </div>

                <label class="pt-2 sr-only" for="">Password</label>
                <input class="form-control pb-2" type="password" value="" placeholder="Password" name="pswd" required>

                <button class="w-25 mr-auto ml-auto mt-5 btn btn-danger" type="reset">Clear</button>
                <button class="w-25 mr-auto ml-auto mt-1 btn btn-success" type="submit">Approve data</button>
            </form>
        </div>
    </div>
</div>



<?php
require_once '../build/components/footer.php'
?>