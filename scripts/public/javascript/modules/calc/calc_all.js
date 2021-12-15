import  calc_functions from './calc_functions.js'
import ALERT_MESSAGE from '../alert_message.js'
import { CALC_ANIMATION_IN, CALC_ANIMATION_OUT, CALC_ANIMATION_ERROR } from './animations.js'

export default function CALC_ALL(a, b, ...inputs) {
    const calc_result_more_info_box = document.getElementById('calc_result_more_info_box')
    const calc_result_text = document.getElementById('calc_result_text')
    const calc_result_more_info_texts = document.querySelectorAll('.calc-result-more-info-text')
    try {
        var total = calc_functions[a][b](...inputs)
    } catch (e) {
        ALERT_MESSAGE(e.message, 'red')
        CALC_ANIMATION_ERROR()
        return
    }
    total = Array.isArray(total) ? total : [total]
    total = total.map((element) => {
        if (typeof element === 'number') return Number(element.toFixed(6))
        else return element
    })
    if (total.some((element) => element !== null && typeof element === 'number' && isNaN(element))) {
        alert('khk')
        return
    }
    CALC_ANIMATION_OUT()
    setTimeout(() => {
        calc_result_text.textContent = total[0]
        if (total.length === 1) {
            if (calc_result_more_info_box) calc_result_more_info_box.style.display = 'none'
        } else {
            total.shift()
            calc_result_more_info_texts.forEach((element, index) => {
                const b = document.querySelector(`[for="calc_more_info_text_${index + 1}"]`)
                if (total[index] === null || total[index] === undefined) {
                    b.style.display = 'none'
                    element.style.display = 'none'
                } else {
                    b.style.display = 'block'
                    element.style.display = 'block'
                }
                element.textContent = total[index]
            })
            calc_result_more_info_box.style.display = 'block'
        }
        CALC_ANIMATION_IN()
    }, 200)
}