$(document).ready(function(){
    //accordion for loop fix
    $("#collapse1").addClass("show");
});

$(document).ready(function(){
    $("#search_input").keyup(function(){
        $("#resp").show();
        let query = $("#search_input").val();

        if(query.length > 2){
            $.ajax({
                url:'index.php',
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
    $("#search_input").val(name);
    $("#resp").html("");
});