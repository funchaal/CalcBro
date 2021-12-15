import RESULT_BOX_MANAGEMENT from "../result_box_management.js"

export function CALC_ANIMATION_OUT() {
    const zzz = document.getElementById('zzz')
    const calc_result_content_container = document.getElementById('calc_result_content_container')
    zzz.style.opacity = '0'
    calc_result_content_container.style.opacity = '0'
}

export function CALC_ANIMATION_IN() {
    const zzz = document.getElementById('zzz')
    const calc_result_content_container = document.getElementById('calc_result_content_container')
    zzz.style.display = 'none'
    calc_result_content_container.style.display = 'flex'
    calc_result_content_container.style.opacity = '1'
    RESULT_BOX_MANAGEMENT(true)
}

export function CALC_ANIMATION_ERROR() {
    let a = document.getElementById('data_box_form')
    let B = () => {
        a.classList.remove('animate__animated', 'animate__headShake')
        a.removeEventListener('animationend', B)
    }
    a.classList.add('animate__animated', 'animate__headShake')
    a.addEventListener('animationend', B)
}