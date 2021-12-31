export default function preChoiceScroll (event = null, distance = 0) {
    const pre_choice = document.getElementById('pre_choice')
    const pre_choice_mover = document.getElementById('pre_choice_mover')
    const pre_choice_control_buttonr_box = document.getElementById('pre_choice_control_buttonr_box')
    const pre_choice_control_buttonl_box = document.getElementById('pre_choice_control_buttonl_box')
    
    const a = pre_choice_mover.offsetWidth - window.innerWidth
    const b = pre_choice.scrollLeft

    if (a === Math.floor(b) || a === Math.ceil(b)) {
        pre_choice_control_buttonl_box.classList.add('on')
        pre_choice_control_buttonr_box.classList.remove('on')
    } else if (b === 0) {
        pre_choice_control_buttonl_box.classList.remove('on')
        pre_choice_control_buttonr_box.classList.add('on')
    } else {
        pre_choice_control_buttonl_box.classList.add('on')
        pre_choice_control_buttonr_box.classList.add('on')
    }
}