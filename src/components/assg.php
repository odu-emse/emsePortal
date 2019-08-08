<?php
while($row = $result->fetch_assoc()){
    $y++;   //running the amount of times the while loop is gonna run which equals to the amount of rows we have in the db
?>
    <div class="assg-container mb-1 pb-2 pt-2">
        <h3 class="assg assg-title"><?php echo $row['name'] ?></h3>
        <p class="assg assg-text">Description: <?php echo $row['descr'] ?></p>
        <p class="assg assg-text">Number of questions: <?php echo $row['num_q'] ?></p>
        <p class="assg assg-text">Estimated time: <?php timeConversion($row['est_time']); ?> </p>
        <div class="assg assg-wrap">
            <p class="assg assg-text assg-text__help small">Related module(s): <ul><?php echo getRelated($conn, $row['hash']); ?></ul></p>
            <p class="assg assg-text assg-text__help small">Assigned by: <?php echo $row['author'] ?></p>
        </div>
        <form action="assg.php" method="get">
            <!--TODO: get the info passed from this form and display the appropriate data-->
            <button class="assg btn btn-primary float-right" type="submit" name="<?php echo $row['hash'];?>">Start post test assignment</button>
        </form>
    </div> <!--end of assg container-->
<?php
}
?>