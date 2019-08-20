<?php
session_start();

require_once 'components/header.php';
require_once 'components/globals.php';
require_once 'components/fn.php';
loginCheck();
search($conn);
require_once 'components/nav.php';

$access = $_GET['access'];

//fetching data
$sql  = 'SELECT * FROM `module` WHERE `uid` = ' . $access;
$result = $conn->query($sql);
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        ?>
        <iframe class="access" src='<?=$row['link']?>'></iframe>
<?php
    }
    $sql = $conn -> query('UPDATE module SET cnt = 1 WHERE uid = ' . $access);
    $sql = $conn -> query('UPDATE module SET cnt = 0 WHERE uid <> ' . $access);
    if(mysqli_query($conn, $sql)){

    }
}

require_once 'components/footer.php';
?>
