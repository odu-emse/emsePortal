<?php
require_once '../templates/header.php';
loginCheck();
if(isset($_GET['submitSearch'])){
    $search = mysqli_real_escape_string($conn, $_GET['searchQuery']);
    $searchQuery = $_GET['searchQuery'];
    $searchString = "LIKE '%$search%' OR descr LIKE '%$search%' OR author LIKE '%$search%'";

    $difficulty = $_GET["diff"]; //gets data from form
    $difficultyString = difficulty($difficulty);

    $duration = $_GET['dur']; //gets data from form
    $durationString = duration($duration);

    $topic = $_GET['topic']; //gets data from form
    $topicString = topic($topic);

    //0 0 0 0
    if($difficultyString == "" && $topicString == "" && $durationString == "" && empty($searchQuery)){ //if all filters are empty
        $code = '0 0 0 0';
        $searchSql = "SELECT * FROM module";
    }

    //1 1 1 1
    else if($difficultyString !== NULL && $topicString !== NULL && $durationString !== NULL && !empty($searchQuery)){ //if all filters are filled
        $code = '1 1 1 1';
        $searchSql = "SELECT * FROM module WHERE name ".$searchString."".$difficultyString."".$topicString."".$durationString." ";
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //0 0 0 1
    else if($difficultyString == "" && $topicString == "" && $durationString == "" && !empty($searchQuery)){ //only search is set
        $code = '0 0 0 1';
        $searchSql = "SELECT * FROM module WHERE name ".$searchString." ";
    }

    //0 0 1 0
    else if($difficultyString == NULL && $topicString == NULL && $durationString !== NULL && empty($searchQuery)){
        $code = '0 0 1 0';
        $durationString = strRepFirst('AND', ' ', $durationString);
        $searchSql = "SELECT * FROM module WHERE ".$durationString." ";
    }

    //0 1 0 0
    else if($difficultyString == NULL && $topicString !== NULL && $durationString == NULL && empty($searchQuery)){
        $code = '0 1 0 0';
        $topicString = strRepFirst('AND', ' ', $topicString);
        $searchSql = "SELECT * FROM module WHERE ".$topicString." ";
    }

    //1 0 0 0
    else if($difficultyString !== NULL && $topicString == NULL && $durationString == NULL && empty($searchQuery)){
        $code = '1 0 0 0';
        $difficultyString = strRepFirst('AND', ' ', $difficultyString);
        $searchSql = "SELECT * FROM module WHERE ".$difficultyString." ";
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //1 1 0 0
    else if($difficultyString !== NULL && $topicString !== NULL && $durationString == NULL && empty($searchQuery)){
        $code = '1 1 0 0';
        $difficultyString = strRepFirst('AND', ' ', $difficultyString);
        $searchSql = "SELECT * FROM module WHERE ".$difficultyString."".$topicString."";
    }

    //0 1 1 0
    else if($difficultyString == NULL && $topicString !== NULL && $durationString !== NULL && empty($searchQuery)){
        $code = '0 1 1 0';
        $topicString = strRepFirst('AND', ' ', $topicString);
        $searchSql = "SELECT * FROM module WHERE ".$topicString."".$durationString."";
    }

    //0 0 1 1
    else if($difficultyString == NULL && $topicString == NULL && $durationString !== NULL && !empty($searchQuery)){
        $code = '0 0 1 1';
        $searchSql = "SELECT * FROM module WHERE name".$searchString."".$durationString."";
    }

    //1 0 0 1
    else if($difficultyString !== NULL && $topicString == NULL && $durationString == NULL && !empty($searchQuery)){
        $code = '1 0 0 1';
        $searchSql = "SELECT * FROM module WHERE name".$searchString."".$difficultyString."";
    }

    //0 1 0 1
    else if($difficultyString == NULL && $topicString !== NULL && $durationString == NULL && !empty($searchQuery)){
        $code = '0 1 0 1';
        $searchSql = "SELECT * FROM module WHERE name".$searchString."".$topicString."";
    }

    //1 0 1 0
    else if($difficultyString !== NULL && $topicString == NULL && $durationString !== NULL && empty($searchQuery)){
        $code = '1 0 1 0';
        $difficultyString = strRepFirst('AND', ' ', $difficultyString);
        $searchSql = "SELECT * FROM module WHERE".$difficultyString."".$durationString."";
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //1 1 1 0
    else if($difficultyString !== NULL && $topicString !== NULL && $durationString !== NULL && empty($searchQuery)){
        $code = '1 1 1 0';
        $difficultyString = strRepFirst('AND', ' ', $difficultyString);
        $searchSql = "SELECT * FROM module WHERE".$difficultyString."".$topicString."".$durationString."";
    }

    //0 1 1 1
    else if($difficultyString == NULL && $topicString !== NULL && $durationString !== NULL && !empty($searchQuery)){
        $code = '0 1 1 1';
        $searchSql = "SELECT * FROM module WHERE name".$searchString."".$topicString."".$durationString."";
    }

    //1 0 1 1
    else if($difficultyString !== NULL && $topicString == NULL && $durationString !== NULL && !empty($searchQuery)){
        $code = '1 0 1 1';
        $searchSql = "SELECT * FROM module WHERE name".$searchString."".$difficultyString."".$durationString."";
    }

    //1 1 0 1
    else if($difficultyString == NULL && $topicString !== NULL && $durationString == NULL && !empty($searchQuery)){
        $code = '1 1 0 1';
        $searchSql = "SELECT * FROM module WHERE name".$searchString."".$topicString."".$difficultyString."";
    }

    //wildcard
    else if ($searchQuery == '!all'){
        $searchSql = "SELECT * FROM module";
    }

    if (!mysqli_query($conn, $searchSql)){
        echo $searchSql . '<br>';
        echo "Error description: " . mysqli_error($conn);
    }
    $rst = mysqli_query($conn, $searchSql);
    $queryResult = mysqli_num_rows($rst);

    echo
    "
    <table class='table table-dark'>
        <thead>
            <tr>
                <th scope='col'>uid</th>
                <th scope='col'>Module Number</th>
                <th scope='col'>Module Name</th>
                <th scope='col'>Duration</th>
                <th scope='col'>Difficulty</th>
                <th scope='col'>Topic</th>
                <th scope='col'>Author</th>
                <th scope='col'>Description</th>
                <th scope='col'>Action</th>
            </tr>
        </thead>
        <tbody>
    ";
    if($queryResult > 0){
        while($row = mysqli_fetch_assoc($rst)){
            echo "
                <tr>
                    <th scope='row'>".$row['uid']."</th>
                    <td>".$row['number']."</td>
                    <td>".$row['name']."</td>
                    <td>".$row['duration']."</td>
                    <td>".$row['difficulty']."</td>
                    <td>".$row['topic']."</td>
                    <td>".$row['author']."</td>
                    <td>".$row['descr']."</td>
                    <td>
                    <form action='housing.php' method='get'>
                        <button name='access' type='submit' class='btn btn-secondary' value='".$row['uid']."'>Access module</button>
                    </form>
                    </td>
                </tr>
            ";
        }
    }
    else{
        echo "
            <tr>
              <th scope='row'>No results for the search</th>
            </tr>
        ";
    }
    echo
    "
        </tbody>
    </table>
    ";
}
else{ //redirect back if went there w URL
    header('Location: ./index.php');
}
?>