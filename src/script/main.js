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
    });

    $('.search--list--item').click(function() { //take <li> data and put it into the input
        let name = $('.search--list--item').text();
        $("#search_input").val(name);
        $("#resp").html("");

        $('#search_input').focusout( function() { //if the user clicks outside of the input, hide results
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

    let target = document.getElementById('api')
    const apiProxy = "https://cors-anywhere.herokuapp.com/"
    const apiKey = "c5273436606f8c4016430b6ce056669fdaff5bcc0c4644c1f579478e2ea74f14"
    let count = $(".card-deck ").children().length;

    for (y = 1; y <= count; y++){
        //apiQuery = $(`#card${y} .card-title`).text().replace(/ /g, '')
        apiQuery = 'accounting'
        const apiURL = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${apiQuery},business&orientation=landscape`
        fetch(apiURL)
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                for (z = 1; z <= count; z++){
                    $(`#moduleThumb${z}`).attr('src', data.results[z].urls.small)
                }
            })

    }


});

window.addEventListener('load', ()=> {

})