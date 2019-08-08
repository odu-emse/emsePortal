<?php
while($row = mysqli_fetch_assoc($result)){
    $x++;
?>
    <div class="card">
                <div class="card-header row" id="heading<?php echo $x; ?>">
                    <h5 class="mb-0 col metaTitle">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse<?php echo $x; ?>"
                                aria-expanded="true" aria-controls="collapse<?php echo $x; ?>">
                            <?php echo $row['name'] . " - module " . $row['number']; ?>
                        </button>
                    </h5>
                    <p class="col float-right metaDuration"><?php timeConversion($row['duration']); ?></p>
                </div>

                <div id="collapse<?php echo $x; ?>" class="collapse" aria-labelledby="heading<?php echo $x; ?>"
                     data-parent="#accordion">
                    <div class="card-body">
                        <?php echo $row['descr'] . "<br>"; ?>
                        <div class="card-body__form">
                            <form class="card-body__form--form" action="housing.php" method="get">
                                <button class="btn btn-primary card-body__form--access" type="submit" name="access" value="<?php echo $row['uid'];?>">
                                    Access the module
                                </button>
                            </form>
                            <form class="card-body__form--form" method="get">
                                <button class="btn btn-outline-secondary card-body__form--comp" type="submit" name="<?php echo "module" . $x; ?>" value="true" <?php disable($row['done'])  ?>>
                                    Mark module complete
                                </button>
                                <?php completion($x, $conn);?>
                            </form>
                        </div>
                    </div><!--end of card-body-->
                </div><!--end of collapse-->
            </div><!--end of card-->
<?php
}
?>
