<?php
while($row = mysqli_fetch_assoc($result)){
    $x++;
?>
    <div class="card">
        <img class="card-img-top" src="https://via.placeholder.com/1920x1080.png?text=Illustration+Comes+Here" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title"><?php echo $row['name'] ?></h5>
            <small class="text-muted card-author"><?php echo $row['author'] ?></small>
            <p class="card-text"><?php echo $row['descr'] ?></p>
        </div>
        <div class="card-footer">
            <small class="text-muted card-footer-info">
                <i class="fa fa-battery-1 info--item__icon"></i>
                Difficulty
            </small>
            <small class="text-muted card-footer-info" title="Duration">
                <i class="fa fa-clock-o info--item__icon"></i>
                <?php timeConversion($row['duration']);?>
            </small>
            <small class="text-muted card-footer-info">
                <i class="fa fa-graduation-cap info--item__icon"></i>
                Topic
            </small>
        </div>
    </div>
<?php
}
?>
