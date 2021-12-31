import create from "../../create/create.js"
import calcAll from '../../calc/calc_all.js'
import calcOptionConfig from "../auxiliar/calc_option_config.js"

let calc_title = ''

export default function NEW_CALC_CONTENT() {
    calcOptionConfig()

    const data_box_form = document.getElementById('data_box_form')
    const calc_inputs = document.querySelectorAll('.calc-input')

    const atual_calc_title = document.querySelector('.data-box .header h1').textContent
    const current_calc_subtitle = document.querySelector('#calc_option_mover .option.on').textContent
    
    data_box_form.addEventListener('submit', (e) => {
        e.preventDefault()
        calc_inputs.forEach((el) => el.blur())
        const key = atual_calc_title.toLowerCase()
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
        calcAll(key, subkey, ...inputs)
    })

    if (content_title !== atual_calc_title) {
        calc_offset = 0
        content_title = atual_calc_title
    }

    if (screenMedia(849)) {

        document.querySelectorAll('.multiple-input-box').forEach((el) => {
            const childs = el.childNodes
            if (!Array.from(childs).filter(({classList}) => classList !== undefined).some(({classList}) => classList.contains('or-input-separation'))) el.replaceWith(...childs)
        })
    } else if (!screenMedia()) {
        if (!screenMedia(849)) {
            data_box_form.removeAttribute('style')
        }
    }

    create.showResultButton()
}