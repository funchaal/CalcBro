export default function preChoiceTranslate (event = null, distance = 0) {
    const pre_choice_mover = document.getElementById('pre_choice_mover')
    const pre_choice_control_buttonr_box = document.getElementById('pre_choice_control_buttonr_box')
    const pre_choice_control_buttonl_box = document.getElementById('pre_choice_control_buttonl_box')
    
    const a = pre_choice_mover.offsetWidth - window.innerWidth
    const b = +pre_choice_mover.style.transform.replace(/[^\d.]/g, '')
    const c = event === null ? distance : (event.deltaY || event.deltaX)
    let move = -b - c

    if (a <= 0) return
    if ((b + c) > a) {
        move = move - (a - (-move))
    } else if ((b + c) < 0) {
        move = 0
    }
    pre_choice_mover.style.transform = `translateX(${move}px)`
    if (Math.abs(move) === a) {
        pre_choice_control_buttonl_box.classList.add('on')
        pre_choice_control_buttonr_box.classList.remove('on')
    } else if (move === 0) {
        pre_choice_control_buttonl_box.classList.remove('on')
        pre_choice_control_buttonr_box.classList.add('on')
    } else {
        pre_choice_control_buttonl_box.classList.add('on')
        pre_choice_control_buttonr_box.classList.add('on')
    }
}