//TODO: the on click <li> fill doesn't work

$(document).ready(function(){
    $("#collapse1").addClass("show"); //accordion for loop fix

    $("#search_input").keyup(function(){
        $("#resp").show();

        let query = $("#search_input").val(); //storing the inputted value in var query
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
        $('#resp ul li').click(() => { //take <li> data and put it into the input
            let name = $(this).text();
            $("#search_input").val(name);
            $("#resp").html("");
            console.log('this')
        });
    });

    $('.assg-container').slice(0, 1).css('display', 'flex'); //hide card class past 4 occurrences
    $('#loadAssg').on('click', function (e) {
        e.preventDefault(); //won't reload page due to # as href
        $('.assg-container:hidden').slice(0, 1).slideDown(); //slide down 4 hidden elements
        if($('.assg-container:hidden').length == 0){ //if there is no more to show, hide button
            $('#loadAssg').fadeOut('slow');
        }
    });

    if($('.card-body__form--comp').prop('disabled')){ //checks if the module completion button is disabled due to completion stored in the db
        $('.card-body__form--comp').addClass('disabled'); //adds class for visual purposes
    }
});