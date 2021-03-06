export default function calcOptionTranslate(event = null, distance = 0) {
    const calc_option = document.getElementById('calc_option')
    const calc_option_mover = document.getElementById('calc_option_mover')
    const calc_option_control_buttonl_box = document.getElementById('calc_option_control_buttonl_box')
    const calc_option_control_buttonr_box = document.getElementById('calc_option_control_buttonr_box')
    const a = calc_option_mover.offsetWidth - calc_option.offsetWidth
    const b = +calc_option_mover.style.transform.replace(/[^\d.]/g, '')
    const c = event === null ? distance : (event.deltaY || event.deltaX)
    let move = -b - c
    if (a <= 0) {
        calc_option_control_buttonl_box.style.display = 'none'
        calc_option_control_buttonr_box.style.display = 'none'
        return 
    }
    if (c !== 0) {
        if ((b + c) > a) {
            move = move - (a - (-move))
        } else if ((b + c) < 0) {
            move = 0
        }
        calc_option_mover.style.transform = `translateX(${move}px)`
        calc_offset = move
    }
    if (Math.abs(move) === a) {
        calc_option_control_buttonl_box.classList.add('on')
        calc_option_control_buttonr_box.classList.remove('on')
    } else if (move === 0) {
        calc_option_control_buttonl_box.classList.remove('on')
        calc_option_control_buttonr_box.classList.add('on') 
    } else {
        calc_option_control_buttonl_box.classList.add('on')
        calc_option_control_buttonr_box.classList.add('on')
    }
}