<?php
session_start();

require_once 'components/header.php';
require_once 'components/globals.php';
require_once 'components/fn.php';

loginCheck();
include_once 'components/nav.php';

if(isset($_GET['submitSearch'])){
    $search = mysqli_real_escape_string($conn, $_GET['searchQuery']);
    $searchString = "LIKE '%$search%' OR descr LIKE '%$search%' OR author LIKE '%$search%'";

    $difficulty = $_GET['diff']; //gets data from form
    $difficultyString = difficulty($difficulty);

    $duration = $_GET['dur']; //gets data from form
    $durationString = duration($duration);

    $topic = $_GET['topic']; //gets data from form
    $topicString = topic($topic);

    //wildcard
    if ($search == '!all'){
        $sql = "SELECT * FROM module";
    }


    //difficulty set
    if($difficultyString !== ' ' && $topicString == ' ' && $durationString == ' '){ //difficulty is set but nothing else
        $sql = "SELECT * FROM module WHERE name ".$searchString." ".$difficultyString." ";
    }
    if ($difficultyString !== ' ' && $topicString == ' ' && $durationString !== ' '){ //difficulty is set and duration but not topic
        $sql = "SELECT * FROM module WHERE name ".$searchString." ".$difficultyString." ".$durationString." ";
    }
    if ($difficultyString !== ' ' && $topicString !== ' ' && $durationString == ' '){ //difficulty is set and topic but not duration
        $sql = "SELECT * FROM module WHERE name ".$searchString." ".$difficultyString." ".$topicString." ";
    }

    //duration set
    if ($difficultyString == ' ' && $topicString == ' ' && $durationString !== ' '){ //duration is set but nothing else
        $sql = "SELECT * FROM module WHERE name ".$searchString." ".$durationString." ";
    }
    if ($difficultyString !== ' ' && $topicString == ' ' && $durationString !== ' '){ //duration is set and difficulty but not topic
        $sql = "SELECT * FROM module WHERE name ".$searchString." ".$durationString." ".$difficultyString." ";
    }
    if ($difficultyString == ' ' && $topicString !== ' ' && $durationString !== ' '){ //duration is set and topic but not difficulty
        $sql = "SELECT * FROM module WHERE name ".$searchString." ".$durationString." ".$topicString." ";
    }

    //topic set
    if ($difficultyString == ' ' && $topicString !== ' ' && $durationString == ' '){ //topic is set but nothing else
        $sql = "SELECT * FROM module WHERE name ".$searchString." ".$topicString." ";
    }
    if ($difficultyString !== ' ' && $topicString !== ' ' && $durationString == ' '){ //topic is set and difficulty but not duration
        $sql = "SELECT * FROM module WHERE name ".$searchString." ".$topicString." ".$difficultyString." ";
    }
    if ($difficultyString == ' ' && $topicString !== ' ' && $durationString !== ' '){ //topic is set and duration but not difficulty
        $sql = "SELECT * FROM module WHERE name ".$searchString." ".$topicString." ".$durationString." ";
    }


    if($difficultyString == ' ' && $topicString == ' ' && $durationString == ' '){ //if all filters are empty
        $sql = "SELECT * FROM module WHERE name ".$searchString." ";
    }
    if($difficultyString !== ' ' && $topicString !== ' ' && $durationString !== ' '){ //if all filters are filled
        $sql = "SELECT * FROM module WHERE name ".$searchString." ".$difficultyString." ".$topicString." ".$durationString." ";
    }

    $result = mysqli_query($conn, $sql);
    $queryResult = mysqli_num_rows($result);

    if($queryResult > 0){
        echo "
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
                </tr>
              </thead>
              <tbody>
        ";
        while($row = mysqli_fetch_assoc($result)){
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
                </tr>
            ";
        }
        echo "</tbody>
            </table>
            ";
    }
    else{
        echo 'No results for the search';
    }
}

/*
$searchTerm = $_GET['term'];

//select all columns from table where the name column matches the searched term
$sql  = "SELECT * FROM module WHERE name LIKE '%$searchTerm%'";

//connect or die
$query = $conn->query($sql) or die("MySQL error, query error");

if($query->num_rows > 0){
    while($row = $query->fetch_assoc()){

        //if link is present in the row add link to module
        if($row['link'] != NULL){
            echo "<a href=".$row['link']." target='_blank'>";
        }

        //display module ID and name of the module
        echo $row['uid'] . " " . $row['name'];

        //if author is present in the row display it
        if($row['author'] != NULL){
            echo " by " . $row['author'];
        }

        //if link is available close tag
        if($row['link'] != NULL) {
            echo "</a>";
        }

        //add break
        echo "<br>";
    }
}
*/
?>