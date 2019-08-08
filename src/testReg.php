<?php
session_start();

require_once 'components/header.php';
require_once 'components/globals.php';
require_once 'components/fn.php';

loginCheck();
search($conn);

include_once 'components/nav.php';

//fetching modules for related module section
$sql = "SELECT * FROM module";
$result = mysqli_query($conn, $sql);

?>

<div class="container">
    <div class="row flex-column pt-4 row">
        <h3 class="text-center">
            Add assignment
        </h3>
        <form action="components/processAssg.php" method="post">
            <div class="form-group">
                <label class="">Name</label>
                <input name="name" type="text" class="form-control" placeholder="Name of the assignment"  required maxlength="250">
            </div>
            <div class="form-group">
                <label class="">Description</label>
                <input name="desc" type="text" class="form-control" placeholder="Description"  required maxlength="1000">
            </div>
            <div class="form-group">
                <label class="">Number of questions</label>
                <input name="num_q" type="number" class="form-control" placeholder="Number of questions"  required max="9999" min="1">
            </div>
            <div class="form-group">
                <label class="">Estimated time</label>
                <input name="est_time" type="number" class="form-control" placeholder="Estimated time allowed"  required min="1" max="9999">
            </div>
            <div class="form-group">
                <label class="">Pick modules that the assignment is related to</label>
                    <div class="related-wrapper">
                        <?php
                            if (mysqli_num_rows($result) > 0) {        //fetch data if there are any rows
                                while ($row = mysqli_fetch_assoc($result)) {            //loop will run until we reach the end of db rows
                                    echo "<div class='related-group'>";
                                    echo "<input class='form-label-group related-input' value='".$row['name']."' type='checkbox' name='related[]'>";
                                    echo "<label class='form-label-group related-label'>" . $row['name'] . " - module number " . $row['number'] . "</label>";
                                    echo  "</div>";
                                }
                            }
                        ?>
                    </div>
            </div>
            <div class="form-group">
                <label class="">Author</label>
                <input name="author" type="text" class="form-control" placeholder="Author of the assignment" required maxlength="250">
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
        </form>
    </div>
</div>