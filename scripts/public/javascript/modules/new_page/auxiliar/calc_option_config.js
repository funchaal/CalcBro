import fetcher from "../../others/fetcher.js"
import calcOption from "../../calc_option/calc_option.js"

export default function calcOptionConfig() {
    const calc_option = document.getElementById('calc_option')
    const calc_option_mover = document.querySelector('#calc_option ul')
    const calc_option_buttonl_box = document.querySelector('#calc_option_button_left')
    const calc_option_buttonr_box = document.querySelector('#calc_option_button_right')
    const calc_option_buttonl = document.querySelector('#calc_option_button_left img')
    const calc_option_buttonr = document.querySelector('#calc_option_button_right img')
    if (screenMedia()) {
        calc_option.style.scrollBehavior = 'unset'
        calc_option.scrollLeft = calc_offset
        calcOption.scroll(null, 0)

        calc_option.addEventListener('scroll', calcOption.scroll)
    } else if (!screenMedia()) {

        calc_option_mover.style.transform = `translateX(${calc_offset}px)`

        calcOption.translate()

        calc_option_mover.addEventListener('wheel', calcOption.translate)
        calc_option_buttonl.addEventListener('click', () => calcOption.translate(null, -50))
        calc_option_buttonr.addEventListener('click', () => calcOption.translate(null, 50))
    }
    calc_option_buttonl_box.style.transitionDuration = '200ms'
    calc_option_buttonr_box.style.transitionDuration = '200ms'
    calc_option_mover.style.transitionDuration = '200ms'
    calc_option.style.scrollBehavior = 'smooth' 
    calcOption.bring()

    onEventElement('#calc_option li button', (el) => {
        const link = el.getAttribute('link')
        fetcher(link)
    })
}