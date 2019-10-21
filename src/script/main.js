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

    for (let y = 1; y <= count; y++){
        //apiQuery = $(`#card${y} .card-title`).text().replace(/ /g, '')
        apiQuery = 'finance,accounting'
        const apiURL = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${apiQuery},business&orientation=landscape`

        if($(`#card${y} .card-form .card-form-comp .card-form-comp-btn`).prop('disabled')){
            $(`#card${y} .card-form .card-form-access .card-form-access-btn`).addClass('btn-success').removeClass('btn-primary').html('Module Completed')
            $(`#card${y}`).addClass('completed')
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

    let x = 1

    $('.title--wrapper--form__btn__true').click((e)=>{
        e.preventDefault()
        x++
        $('.card').toggleClass('completed')
        if(x % 2 == 0){
            console.log(x + ' is even')
            $('.title-text').html('Completed Modules - ENMA 600')
            $('.title--wrapper--form__btn__true').html('Show incomplete modules')
        }
        else{
            console.log(x + ' is odd')
            $('.title-text').html('Incomplete Modules - ENMA 600')
            $('.title--wrapper--form__btn__true').html('Show completed modules')
        }
    })

    let counter = 2;

    $("#addButton").click(function () {

        let newTextBoxDiv = $(document.createElement('div'))
            .attr("id", 'TopicWrapper' + counter)

        newTextBoxDiv.after().html(`
            <label class="pt-2 addGroup--label">Topic #${counter}
                <input class="form-control addGroup--input w-100" type='text' id='topic${counter}' name="topic[]">
            </label>
        `)

        newTextBoxDiv.appendTo("#topic--insert")

        $('#hiddenCounter').attr('value', `${counter}`)

        counter++
    })

    $('#removeButton').click(function () {
        if(counter == 2){
            return false
        }

        counter--

        $(`#TopicWrapper${counter}`).remove()
    })


    //rec addition
    let cnt = 2;

    $("#addRec").click( () => {
        let newDiv = $(document.createElement('div'))
            .attr("id", 'RecWrapper' + cnt)

        newDiv.after().html(`           
            <label class="addGroup--label">Resource #${cnt} Name & URL</label>
            <div class="addGroup--input--wrapper row">
                <input class='form-control addGroup--input col-md-6' placeholder="Name" type='text' id='rec${cnt}' name="recName[]">
                <input class='form-control addGroup--input col-md-6' placeholder="URL" type='text' id='rec${cnt}' name="recLink[]">
            </div>
        `)

        newDiv.appendTo("#rec--insert")

        $('#hiddenCounterRec').attr('value', `${cnt}`)

        cnt++
    })

    $('#removeRec').click(() => {
        if(cnt == 2){
            return false
        }

        cnt--

        $(`#RecWrapper${cnt}`).remove()
    })

});