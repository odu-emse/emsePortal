<?php
require_once "templates/header.php";
loginCheck();
?>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <?php
                $selector = $_GET['selector'];
                $validator = $_GET['validator'];

                if (empty($selector) || empty($validator)){
                    echo "Could not validate your request.";
                    exit();
                }
                else{
                    if (ctype_xdigit($selector) !== false && ctype_xdigit($validator) !== false){
                        ?>
                        <form action="../templates/resetPassReq.php" method="post">
                            <input type="hidden" name="selector" value="<?php echo $selector;?>">
                            <input type="hidden" name="validator" value="<?php echo $validator;?>">
                            <label for="password">New password
                                <input type="password" name="password" placeholder="New password">
                            </label>
                            <label for="password confirmation">Confirm new password
                                <input type="password" name="conf-password" placeholder="Confirm new password">
                            </label>
                            <button class="btn btn-primary" type="submit" name="reset-password">Reset password</button>
                        </form>
                        <?php
                    }
                }
                ?>
            </div>
        </div>
    </div>
<?php
require_once "templates/footer.php";
?>