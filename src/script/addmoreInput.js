export default function addInput(){
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
}