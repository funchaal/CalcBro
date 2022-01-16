import  calc_function from './calc_function.js'
import calcAnimation from './calc_animation.js'
import newCalc from './new_calc.js'

export default function calcAll(a, b, ...inputs) {
    const calc_result_more_info_box = document.getElementById('calc_result_more_info_box')
    const calc_result_text = document.getElementById('calc_result_text')
    const calc_result_more_info_texts = document.querySelectorAll('.calc-result-more-info-text')
    try {
        if (isEveryEmpty__(...inputs)) throw new Error ('preencha os campos')
        var total = calc_function[a][b](...inputs)
    } catch (e) {
        message(e.message, 'red')
        calcAnimation.error()
        return
    }

    total = Array.isArray(total) ? total : [total]
    total = total.map((element) => {
        if (typeof element === 'number') return Number(element.toFixed(6))
        else return element
    })

    let values = inputs

    if (total.some((element) => element !== null && typeof element === 'number' && isNaN(element))) {
        message('preencha corretamente os campos', 'red')
        return
    }

    if (UserState) {
        const labels = Array.from(document.querySelectorAll('#data_box_form .label-float .calc-input ~ label')).map((el, index) => {
            const a = Array.from(el.parentElement.parentElement.childNodes).some(({ classList }) => classList && classList.contains('or-input-separation'))
            if (a && !values[index]) {
                values[index] = undefined
                return undefined
            } else if (!a && Array.from(el.parentElement.parentElement.childNodes).some(({ required }) => !required) && !values[index]) {
                values[index] = null
                return el.textContent
            } else {
                return el.textContent
            }
        }).filter(el => el !== undefined)
        values = values.filter(el => el !== undefined)
        
        newCalc(a, b, window.location.pathname, total, labels, values)
    }

    calcAnimation.out()
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
        calcAnimation.in()
    }, 200)
}