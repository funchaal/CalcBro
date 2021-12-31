import fetcher from "../../others/fetcher.js"
import calcOption from "../../calc_option/calc_option.js"

export default function calcOptionConfig() {
    const calc_option = document.getElementById('calc_option')
    const calc_option_mover = document.getElementById('calc_option_mover')
    const calc_option_control_buttonl_box = document.querySelector('#calc_option_control_buttonl_box')
    const calc_option_control_buttonr_box = document.querySelector('#calc_option_control_buttonr_box')
    const calc_option_control_buttonl = document.querySelector('#calc_option_control_buttonl_box img')
    const calc_option_control_buttonr = document.querySelector('#calc_option_control_buttonr_box img')
    const atual_content_title = document.querySelector('.data-box .header h1').textContent
    if (screenMedia()) {
        calc_option.style.scrollBehavior = 'unset'
        if (content_title === atual_content_title) calc_option.scrollLeft = calc_offset
        calcOption.scroll()

        calc_option.addEventListener('scroll', () => calcOption.scroll())
    } else if (!screenMedia()) {
        if (content_title === atual_content_title) calc_option_mover.style.transform = `translateX(${calc_offset}px)`

        calcOption.translate()

        calc_option_mover.addEventListener('wheel', calcOption.translate)
        calc_option_control_buttonl.addEventListener('click', () => calcOption.translate(null, -50))
        calc_option_control_buttonr.addEventListener('click', () => calcOption.translate(null, 50))
    }
    calc_option_control_buttonl_box.style.transitionDuration = '300ms'
    calc_option_control_buttonr_box.style.transitionDuration = '300ms'
    calc_option_mover.style.transitionDuration = '200ms'
    calc_option.style.scrollBehavior = 'smooth' 
    calcOption.bring()

    onEventElement('#calc_option_mover .option', (el) => fetcher(el.getAttribute('link')))
}