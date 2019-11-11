export default function sidebar(){
    $('#sidebar').click( (e)=> {
        e.preventDefault()
        $('.sidebar').toggle("fast").toggleClass('opened')
        $('#body-overlay').toggle()
        $('#overlay-close').toggle("fast")
    })
    $('#overlay-close').click((e) => {
        $('.sidebar').toggle("fast").toggleClass('opened')
        $('#body-overlay').toggle()
        $('#overlay-close').toggle("fast")
    })
    $('#body-overlay').click((e) => {
        e.preventDefault()
        $('.sidebar').toggle("fast").toggleClass('opened')
        $('#body-overlay').toggle()
        $('#overlay-close').toggle("fast")
    })
}