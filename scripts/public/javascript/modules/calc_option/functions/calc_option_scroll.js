export default function calcOptionScroll(event = null, distance) {
    const calc_option = document.getElementById('calc_option')
    const calc_option_mover = document.getElementById('calc_option_mover')
    const calc_option_control_buttonl_box = document.getElementById('calc_option_control_buttonl_box')
    const calc_option_control_buttonr_box = document.getElementById('calc_option_control_buttonr_box')

    const a = calc_option_mover.offsetWidth - calc_option.offsetWidth
    const b = calc_option.scrollLeft

    if (a <= 0) {
        calc_option_control_buttonl_box.style.display = 'none'
        calc_option_control_buttonr_box.style.display = 'none'
        return 
    }
    
    if (a === Math.floor(b) || a === Math.ceil(b)) {
        calc_option_control_buttonl_box.classList.add('on')
        calc_option_control_buttonr_box.classList.remove('on')
    } else if (b === 0) {
        calc_option_control_buttonl_box.classList.remove('on')
        calc_option_control_buttonr_box.classList.add('on')
    } else {
        calc_option_control_buttonl_box.classList.add('on')
        calc_option_control_buttonr_box.classList.add('on')
    }

    if (distance) calc_option.scrollTo(calc_option.scrollLeft += distance, 0)
    console.log(calc_offset)
    calc_offset = calc_option.scrollLeft
    console.log(calc_offset)
}