export default function titleChange() {
    let x = 1

    $('.title--wrapper--form__btn__true').click((e)=>{
        e.preventDefault()
        x++
        $('.card').toggleClass('completed')
        if(x % 2 == 0){
            $('.title-text').html('Completed Modules')
            $('.title--wrapper--form__btn__true').html('Show incomplete modules')
        }
        else{
            $('.title-text').html('Incomplete Modules')
            $('.title--wrapper--form__btn__true').html('Show completed modules')
        }
    })
}