<?php
require_once 'components/header.php';
loginCheck();
search($conn);
$accessHash = $_GET['access'];

//fetching data
$sql  = "SELECT * FROM `module` WHERE `hash` = '$accessHash' ";
$result = $conn->query($sql);
?>

<div class="row module">
    <div class="col-md-12 module--nav">
        <a class="btn btn-outline-secondary module--nav--button" href="./"><i class="fa fa-caret-left"></i><span class="module--nav--button--text">Previous module</span></a>
        <a class="btn btn-outline-danger module--nav--button float-right" href="./"><span class="module--nav--button--text">Next module</span><i class="fa fa-caret-right"></i></a>
    </div>
</div>

<?php
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        ?>
        <div class="row">
            <div class="video col-md-9">
                <div class="col-md-12 gutter">
                    <div class="video--house">
                        <iframe class="access" src='<?=$row['link']?>'></iframe>
                    </div>
                    <div class="video--trans container">
                        <h2 class="video--trans--title"><?=$row['name']?></h2>
                        <p class="video--trans--title"><?=$row['descr']?> <br> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam eum fuga fugiat itaque labore non quia quis reiciendis, rerum voluptas! Alias aspernatur culpa explicabo modi mollitia. Labore nesciunt optio similique!</p>
                    </div>
                </div>
            </div>
            <div class="feature--cont col-md-3">
                <div class="col-md-12 gutter d-flex">
                    <div class="container feature--cont--wrapper">
                        <h3 class="feature--cont--title">Course Features</h3>
                        <ul class="feature--cont--list">
                            <li class="feature--cont--list--item row">
                                <div class="feature--cont--list--item--title col-md-6 pl-0 pr-0"><i class="fa fa-clock-o"></i>Duration</div>
                                <div class="feature--cont--list--item--value col-md-6 pl-0 pr-0 text-right"><?=$row['duration']?></div>
                            </li>
                            <li class="feature--cont--list--item row">
                                <div class="feature--cont--list--item--title col-md-6 pl-0 pr-0"><i class="fa fa-user"></i>Author</div>
                                <div class="feature--cont--list--item--value col-md-6 pl-0 pr-0 text-right"><?=$row['author']?></div>
                            </li>
                            <li class="feature--cont--list--item row">
                                <div class="feature--cont--list--item--title col-md-6 pl-0 pr-0"><i class="fa fa-tag"></i>Keywords</div>
                                <span class='feature--cont--list--item--value col-md-6 pl-0 pr-0 text-right text-muted'>
                                    <?php
                                        $tblName = $accessHash . "_topics";
                                        $sql2  = "SELECT * FROM `{$tblName}` ORDER BY 'topicsUID' DESC";
                                        $rst = $conn->query($sql2);
                                        if (mysqli_num_rows($rst) > 0) {
                                            while ($topic = mysqli_fetch_assoc($rst)) {
                                                echo "
                                                <span class='mr-2'>
                                                    <i class='fa fa-tag'></i>
                                                    " . $topic['topics'] . "
                                                </span>
                                                ";
                                            }
                                        }
                                    ?>
                                </span>
                            </li>
                            <li class="feature--cont--list--item row">
                                <div class="feature--cont--list--item--title col-md-6 pl-0 pr-0"><i class="fa fa-star"></i>Difficulty</div>
                                <div class="feature--cont--list--item--value col-md-6 pl-0 pr-0 text-right"><?=$row['difficulty']?>/5</div>
                            </li>
                            <li class="feature--cont--list--item row">
                                <div class="feature--cont--list--item--title col-md-6 pl-0 pr-0"><i class="fa fa-file-powerpoint-o"></i>Number of Slides</div>
                                <div class="feature--cont--list--item--value col-md-6 pl-0 pr-0 text-right"><?=$row['numSlides']?></div>
                            </li>
                            <li class="feature--cont--list--item row">
                                <div class="feature--cont--list--item--title col-md-6 pl-0 pr-0"><i class="fa fa-clone"></i>Resources<i class="fa fa-caret-down float-right"></i></div>
                                <ul class="feature--cont--list--item--sublist">
                                    <?php
                                    //echo resource list if available
                                    ?>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <a href="" class="btn btn-primary post--button">Start post test</a>
                </div>
            </div>
        </div>



<?php
    }
    $sql = $conn -> query('UPDATE module SET cnt = 1 WHERE hash = ' . $accessHash);
    $sql = $conn -> query('UPDATE module SET cnt = 0 WHERE hash <> ' . $accessHash);
    if(mysqli_query($conn, $sql)){

    }
}

require_once 'components/footer.php';
?>
