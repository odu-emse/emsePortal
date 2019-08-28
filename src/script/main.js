$(() =>{
    $("#search_input").keyup( () =>{
        $("#resp").show();

        let query = $("#search_input").val(); //storing the inputted value in var query
        query.toString();
        /*
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
        }*/
    });

    $('.search--list--item').click(() => { //take <li> data and put it into the input
        let name = $('.search--list--item').text();
        $("#search_input").val(name);
        $("#resp").html("");

        //TODO: if the user clicks outside of the input, hide results
    });

    const apiKey = "c5273436606f8c4016430b6ce056669fdaff5bcc0c4644c1f579478e2ea74f14"
    let count = $(".card-deck ").children().length;

    for (y = 1; y <= count; y++){
        //apiQuery = $(`#card${y} .card-title`).text().replace(/ /g, '')
        apiQuery = 'finance,accounting'
        const apiURL = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${apiQuery},business&orientation=landscape`

        if($(`#card${y} .card-form .card-form-comp .card-form-comp-btn`).prop('disabled')){
            $(`#card${y} .card-form .card-form-access .card-form-access-btn`).addClass('btn-success').removeClass('btn-primary').html('Module Completed')
        }
        fetch(apiURL)
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                $('.jumb--img__ill').attr('src', data.results[1].urls.small)
                for (z = 1; z <= count; z++){
                    $(`#moduleThumb${z}`).attr('src', data.results[z].urls.small)
                }
            })

    }


});