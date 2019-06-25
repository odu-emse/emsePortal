import $ = require("jquery");

//TODO: the on click <li> fill doesn't work
$(document).ready(function(){
    $("#collapse1").addClass("show"); //accordion for loop fix

    $("#search_input").keyup(function(){
        $("#resp").show();

        let query: any = $("#search_input").val(); //storing the inputted value in var query
        query.toString();

        if(query.length > 2){ //send ajax request once user typed more than 2 characters
            $.ajax({
                url:'index.php',
                method:'POST',
                data:{
                    search: 1,
                    q: query
                },
                success: function(data){ //on success, add data from ajax call into #resp div
                    $("#resp").html(data);
                },
                dataType: 'text'
            });
        }
        else{ //if the user deletes characters below the minimum 3, hide results
            $('#resp').hide();
        }
        $('#search_input').focusout( function() { //if the user clicks outside of the input, hide results
                $('#resp').hide();
        });
    });
    $('.card').slice(0, 4).show(); //hide card class past 4 occurrences
    $('#load').on('click', function (e) {
        e.preventDefault(); //won't reload page due to # as href
        $('.card:hidden').slice(0, 4).slideDown(); //slide down 4 hidden elements
        if($('.card:hidden').length == 0){ //if there is no more to show, hide button
            $('#load').fadeOut('slow');
        }
    });
});
$(document).on('click', 'li', function(){ //on the click of a result <li>, put that value into the input
    let name = $(this).text();
    $("#search_input").val(name);
    $("#resp").html("");
});