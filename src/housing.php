<?php
require_once 'components/header.php';
search($conn);
$access = $_GET['access'];

//fetching data
$sql  = 'SELECT * FROM `module` WHERE `uid` = ' . $access;
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
            <div class="video col-md-10">
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
            <div class="feature--cont col-md-2">
                <div class="col-md-12 gutter d-flex">
                    <div class="container feature--cont--wrapper">
                        <h3 class="feature--cont--title">Course Features</h3>
                        <ul class="feature--cont--list">
                            <li class="feature--cont--list--item">
                                <span class="feature--cont--list--item--title"><i class="fa fa-clock-o"></i>Duration</span>
                                <span class="feature--cont--list--item--value"><?=$row['duration']?></span>
                            </li>
                            <li class="feature--cont--list--item">
                                <span class="feature--cont--list--item--title"><i class="fa fa-user"></i>Author</span>
                                <span class="feature--cont--list--item--value"><?=$row['author']?></span>
                            </li>
                            <li class="feature--cont--list--item">
                                <span class="feature--cont--list--item--title"><i class="fa fa-tag"></i>Topic</span>
                                <span class="feature--cont--list--item--value"><?=$row['topic']?></span>
                            </li>
                            <li class="feature--cont--list--item">
                                <span class="feature--cont--list--item--title"><i class="fa fa-star"></i>Difficulty</span>
                                <span class="feature--cont--list--item--value"><?=$row['difficulty']?>/5</span>
                            </li>
                            <li class="feature--cont--list--item">
                                <span class="feature--cont--list--item--title"><i class="fa fa-file-powerpoint-o"></i>Number of Slides</span>
                                <span class="feature--cont--list--item--value"><?=$row['numSlides']?></span>
                            </li>
                            <li class="feature--cont--list--item">
                                <span class="feature--cont--list--item--title"><i class="fa fa-clone"></i>Resources<i class="fa fa-caret-down float-right"></i></span>
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
    $sql = $conn -> query('UPDATE module SET cnt = 1 WHERE uid = ' . $access);
    $sql = $conn -> query('UPDATE module SET cnt = 0 WHERE uid <> ' . $access);
    if(mysqli_query($conn, $sql)){

    }
}

require_once 'components/footer.php';
?>
