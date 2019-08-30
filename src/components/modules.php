<div class="title--wrapper">
    <h1 class="title-text">Incomplete Modules - ENMA 600</h1>
    <form class="title--wrapper--form">
        <button class="button btn btn-secondary title--wrapper--form__btn__true" name="showAll" value="true">Show completed modules</button>
    </form>
</div>
<div class="main--roller">
    <div class="card-deck">
        <?php
        while($row = mysqli_fetch_assoc($result)){
            $x++;
        ?>
            <div class="card" id="<?php echo 'card' . $x ?>" index="<?php echo $x ?>">
                <img class="card-img-top" id="<?php echo 'moduleThumb' . $x ?>" src="https://via.placeholder.com/1920x1080.png?text=Illustration+Comes+Here" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title"><?php echo $row['name'] ?></h5>
                    <small class="text-muted card-author"><?php echo $row['author'] ?></small>
                    <p class="card-text"><?php echo $row['descr'] ?></p>
                </div>
                <div class="card-footer">
                    <small class="text-muted card-footer-info" title="Difficulty">
                        <i class="fa fa-battery-1 info--item__icon"></i>
                        <?php echo $row['difficulty'] . '/5.0'; ?>
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
                <div class="card-form">
                    <form class="card-form-access" action="housing.php" method="get">
                        <button class="btn btn-primary card-form-access-btn" type="submit" name="access" value="<?php echo $row['uid'] ?>">Access Module</button>
                    </form>
                    <form class="card-form-comp" method="get">
                        <button class="btn btn-outline-secondary card-form-comp-btn" type="submit" name="<?php echo 'module' . $row['uid'] ?>" value="true" <?php disable($row['done']);?>>
                            Mark Module Complete
                        </button>
                        <?php completion($row['uid'], $conn); ?>
                    </form>
                </div>

            </div>
        <?php
        }
        ?>
    </div> <!--end of card-deck-->
</div> <!-- end of main roller -->