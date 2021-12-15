import CALC_OPTION_TRANSLATE from "./calc_option/calc_option_translate.js"
import CALC_OPTION_BRING from "./calc_option/calc_option_bring.js"
import CALC_OPTION_SCROLL from "./calc_option/calc_option_scroll.js"
import SCREEN_MEDIA from "./screen_media.js"
import FETCHER from "./fetcher.js"
import CLICK_ELEMENT from "./click_element.js"
import CREATE_SHOW_RESULT_BUTTON from "./create/create_show_result_button.js"
import CALC_ALL from './calc/calc_all.js'

export let calc_title = ''

export let calc_offset = 0

export const change_offset = function(offset) {
    calc_offset = offset
}

export default function NEW_CALC_CONTENT() {
    const data_box_form = document.getElementById('data_box_form')
    
    const calc_option = document.getElementById('calc_option')
    const calc_option_mover = document.querySelector('#calc_option ul')
    const calc_option_buttonl_box = document.querySelector('#calc_option_button_left')
    const calc_option_buttonr_box = document.querySelector('#calc_option_button_right')
    const calc_option_buttonl = document.querySelector('#calc_option_button_left img')
    const calc_option_buttonr = document.querySelector('#calc_option_button_right img')
    const calc_inputs = document.querySelectorAll('.calc-input')
    
    const current_calc_title = document.querySelector('#data_box_form .header span').textContent
    const current_calc_subtitle = document.querySelector('#calc_option ul button.on').textContent
    
    data_box_form.addEventListener('submit', (e) => {
        e.preventDefault()
        calc_inputs.forEach((el) => el.blur())
        const key = current_calc_title.toLowerCase()
        const subkey = current_calc_subtitle.toLowerCase()
        const inputs = []
        document.querySelectorAll('.calc-input').forEach((el, index) => {
            if (el.getAttribute('type') === 'checkbox') {
                inputs.push(el.checked)
            } else if (el.getAttribute('type') === 'number') {
                inputs.push(Number(el.value))
            } else {
                inputs.push(el.value)
            }
        })
        CALC_ALL(key, subkey, ...inputs)
    })

    if (calc_title !== current_calc_title) {
        calc_offset = 0
        calc_title = current_calc_title
    }

    if (SCREEN_MEDIA()) {
        data_box_form.style.height = `${window.innerHeight - 55}px`

        calc_option.style.scrollBehavior = 'unset'
        calc_option.scrollLeft = calc_offset
        CALC_OPTION_SCROLL(null, 0)

        calc_option.addEventListener('scroll', CALC_OPTION_SCROLL)

        document.querySelectorAll('.calc-multiple-input-container').forEach((el) => {
            const childs = el.childNodes
            if (!Array.from(childs).filter(({classList}) => classList !== undefined).some(({classList}) => classList.contains('or-input-separation'))) el.replaceWith(...childs)
        })
    } else if (!SCREEN_MEDIA()) {
        if (!SCREEN_MEDIA(849)) {
            data_box_form.removeAttribute('style')
        }

        calc_option_mover.style.transform = `translateX(${calc_offset}px)`

        CALC_OPTION_TRANSLATE()

        calc_option_mover.addEventListener('wheel', CALC_OPTION_TRANSLATE)
        calc_option_buttonl.addEventListener('click', () => CALC_OPTION_TRANSLATE(null, -50))
        calc_option_buttonr.addEventListener('click', () => CALC_OPTION_TRANSLATE(null, 50))
    }
        CALC_OPTION_BRING()
        calc_option_buttonl_box.style.transitionDuration = '200ms'
        calc_option_buttonr_box.style.transitionDuration = '200ms'
        calc_option_mover.style.transitionDuration = '200ms'
        calc_option.style.scrollBehavior = 'smooth' 

    CLICK_ELEMENT('#calc_option li button', (el) => {
        const link = el.getAttribute('link')
        FETCHER(link)
    })
    CREATE_SHOW_RESULT_BUTTON()
}