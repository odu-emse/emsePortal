<?php
$count = 0;
if (isset($_POST['submit'])){
    if ($_POST['folderName']){
        $folderName = $_POST['folderName'];
        $path = "../public/upload/".$folderName;
        if (!is_dir($folderName)){
            mkdir($path, 0777, true);
        }
        foreach ($_FILES['folder']['name'] as $i => $name) {
            if (strlen($_FILES['folder']['name'][$i]) > 1) {
                if (move_uploaded_file($_FILES['folder']['tmp_name'][$i], $path.'/'.$name)) {
                    $count++;
                }
            }
        }
        header('Location: review.php');
        exit;
    }
}