<?php
require_once '../templates/header.php';
loginCheck();
search($conn);
$accessHash = $_GET['access'];

//fetching data
$sql  = "SELECT * FROM `module` WHERE `hash` = '$accessHash' ";
$result = $conn->query($sql);
?>

<div class="row module">
    <div class="col-md-12 module--nav">
        <form action="housing.php" method="get">
            <?php
            $fetchedUid = $conn -> query("SELECT uid FROM module WHERE `hash` = '$accessHash'");
            if ($fetchedUid->num_rows > 0) {
                if ($selectUidRow = $fetchedUid->fetch_assoc()) {
                    $currentUid = $selectUidRow['uid'];

                    $prevLink = $conn -> query("SELECT hash FROM module WHERE uid < '$currentUid' ORDER BY uid DESC LIMIT 1;");
                    if ($prevLink->num_rows > 0) {
                        if ($selectPrevLink = $prevLink->fetch_assoc()) {
                            $prevLinkValue = $selectPrevLink['hash'];
                            echo "
                            <button class='btn btn-outline-secondary module--nav--button' type='submit' name='access' value='".$prevLinkValue."'>
                                <i class='fa fa-caret-left'></i><span class='module--nav--button--text'>Previous module</span>
                            </button>
                            ";
                        }
                    }
                    else{
                        echo "
                            <a class='btn btn-outline-secondary module--nav--button disabled' href='./'>
                                <i class='fa fa-caret-left'></i><span class='module--nav--button--text'>Previous module</span>
                            </a>
                            ";
                    }

                    $nextLink = $conn -> query("SELECT hash FROM module WHERE uid > '$currentUid' ORDER BY uid LIMIT 1;");
                    if ($nextLink->num_rows > 0) {
                        if ($selectNextLink = $nextLink->fetch_assoc()) {
                            $nextLinkValue = $selectNextLink['hash'];
                            echo "
                            <button class='btn btn-outline-danger module--nav--button float-right' type='submit' name='access' value='".$nextLinkValue."'>
                                <span class='module--nav--button--text'>Next module</span><i class='fa fa-caret-right'></i>
                            </button>
                            ";
                        }
                    }
                    else{
                        echo "
                            <a class='btn btn-outline-secondary module--nav--button disabled float-right' href='./'>
                                <span class='module--nav--button--text'>Next module</span><i class='fa fa-caret-right'></i>
                            </a>
                            ";
                    }
                }
            }

            ?>
        </form>
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
                        <iframe class="access" src='<?=$row['link']."/story_html5.html"?>'></iframe>
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
                            <li class="feature--cont--list--item row pl-0 pr-0">
                                <div class="feature--cont--list--item--title col-md-6 pl-0 pr-0"><i class="fa fa-clock-o"></i>Duration</div>
                                <div class="feature--cont--list--item--value col-md-6 pl-0 pr-0 text-right"><?=$row['duration']?></div>
                            </li>
                            <li class="feature--cont--list--item row pl-0 pr-0">
                                <div class="feature--cont--list--item--title col-md-6 pl-0 pr-0"><i class="fa fa-user"></i>Author</div>
                                <div class="feature--cont--list--item--value col-md-6 pl-0 pr-0 text-right"><?=$row['author']?></div>
                            </li>
                            <?php
                                $tblName = $accessHash . "_topics";
                                $sql2  = "SELECT * FROM `{$tblName}` ORDER BY 'topicsUID' DESC";
                                $rst = $conn->query($sql2);
                                if (mysqli_num_rows($rst) > 0) {
                                    echo "
                                    <li class=\"feature--cont--list--item row pl-0 pr-0 d-flex flex-row keywords\">
                                        <div class='feature--cont--list--item--title pl-0 pr-0 keywords--key'><i class='fa fa-tag'></i>Keywords</div>
                                        <div class='feature--cont--list--item--value pl-0 pr-0 text-right text-muted keywords--value'>
                                    ";
                                    while ($topic = mysqli_fetch_assoc($rst)) {
                                        echo "
                                        <span class='mr-2'>
                                            <i class='fa fa-tag'></i>
                                            " . $topic['topics'] . "
                                        </span>
                                        ";
                                    }
                                    echo "
                                        </div>
                                    </li>
                                    ";
                                }
                            ?>
                            <li class="feature--cont--list--item row pl-0 pr-0">
                                <div class="feature--cont--list--item--title col-md-6 pl-0 pr-0"><i class="fa fa-star"></i>Difficulty</div>
                                <div class="feature--cont--list--item--value col-md-6 pl-0 pr-0 text-right"><?=$row['difficulty']?>/5</div>
                            </li>
                            <li class="feature--cont--list--item row pl-0 pr-0">
                                <div class="feature--cont--list--item--title col-md-6 pl-0 pr-0"><i class="fa fa-file-powerpoint-o"></i>Number of Slides</div>
                                <div class="feature--cont--list--item--value col-md-6 pl-0 pr-0 text-right"><?=$row['numSlides']?></div>
                            </li>
                            <?php
                            $tblName = $accessHash . "_rec";
                            $select  = "SELECT * FROM `{$tblName}` ORDER BY 'recUID' DESC";
                            $res = $conn->query($select);
                            if (mysqli_num_rows($res) > 0) {
                                echo "
                                <li class='feature--cont--list--item row pl-0 pr-0 d-flex flex-row'>
                                    <div class='feature--cont--list--item--title pl-0 pr-0'><i class='fa fa-clone'></i>Resources</div>
                                    <div class='feature--cont--list--item--value pl-0 pr-0 text-right'>
                                        <ul>
                                ";
                                while ($rec = mysqli_fetch_assoc($res)) {
                                    echo "
                                        <li class='mt-1'>
                                            <a href='".$rec['recLink']."'>" . $rec['recName'] . "</a>
                                        </li>
                                    ";
                                }
                                echo "
                                        </ul>
                                    </div>
                                </li>
                                ";
                            }
                            ?>
                        </ul>
                    </div>
                    <a href="" class="btn btn-primary post--button">Start post test</a>
                </div>
            </div>
        </div>



<?php
    }
    $sql = $conn -> query("UPDATE module SET cnt = 1 WHERE hash = '$accessHash'");
    $sql = $conn -> query("UPDATE module SET cnt = 0 WHERE hash <> '$accessHash'");
}

require_once 'templates/footer.php';
?>
