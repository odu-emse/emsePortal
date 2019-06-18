<?php
session_start();

require_once '../build/components/header.php';
require_once '../build/components/globals.php';

if(isset($_POST['search'])){
    $response = "<ul><li>No data found</li></ul>";

    $q = $conn->real_escape_string($_POST['q']);

    $sql = $conn->query("SELECT * FROM module WHERE name LIKE '%$q%'");

    if($sql->num_rows > 0){
        $response = "<ul>";
        while($data  = $sql->fetch_array()){
            $response .= "<li>". $data['name'];
            // if($data['author'] != NULL){
            //     $response .=" by " . $data['author'] . "</li>";
            // }
        }
        $response .= "</ul>";
    }

    exit($response);
}

?>
<div class="auto-widget">
    <form action="search.php" method="GET">
        <input type="text" id="skill_input" name="term" autocomplete="off"/>
        <button type="submit">Test</button>
    </form>
    <div id="resp">
    
    </div>
</div>


<script>
$(document).ready(function(){
    $("#skill_input").keyup(function(){
        let query = $("#skill_input").val();
        
        if(query.length > 2){
            $.ajax({
                url:'source.php',
                method:'POST',
                data:{
                    search: 1,
                    q: query
                },
                success: function(data){
                    $("#resp").html(data);
                },
                dataType: 'text'
            });
        }
    });
});
$(document).on('click', 'li', function(){
    let name = $(this).text();
    $("#skill_input").val(name);
    $("#resp").html("");
})
</script>
<?php
require_once '../build/components/footer.php'
?>