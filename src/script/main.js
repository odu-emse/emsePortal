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
    /*
    const resource = $('<input name="resource" type="text">')
    const add = $('<button name="resource" id="addmoreTopic" type="button">Add more <i class="fa fa-plus"></i></button>')
    let counter = 0
    const topic = $(`
    <label class="pt-2" for="">Included topic ${counter}
        <input class="form-control pb-2" type="text" name="author">
    </label>
    `)

    $('#review').append(topic).append(add)

    $('#addmoreTopic').click((e)=>{
        counter++
        console.log(counter)
        $('#review').html(topic)
    })
    */

    let counter = 2;

    $("#addButton").click(function () {

        let newTextBoxDiv = $(document.createElement('div'))
            .attr("id", 'TopicWrapper' + counter)

        newTextBoxDiv.after().html(`
            <label>Topic #${counter}</label>
            <input type="text" name="topic[]" id="topic${counter}">`
        )

        newTextBoxDiv.appendTo("#TextBoxesGroup")

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

});