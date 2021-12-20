import calcAll from "../../calc/calc_all.js"
import calcOptionConfig from "../auxiliar/calc_option_config.js"
import getInputs from "../auxiliar/get_inputs.js"

const newSorteioContent = {
    'sorteio de numeros': function() {
        calcOptionConfig()

        if (screenMedia()) {
            document.getElementById('data_container').style.height = (window.innerHeight - 55) + 'px'
            document.getElementById('data_container').style.minHeight = (window.innerHeight - 55) + 'px'
        }

        const form = document.getElementById('data_box_form')
        const calc_inputs = document.querySelectorAll('.calc-input')

        const [valor_1, valor_2, valor_3, valor_4, valor_5] = [...calc_inputs]

        const func_1 = () => {
            if (Number(valor_2.value) > Number(valor_1.value)) return
            if (Number(valor_3.value) > ((Number(valor_1.value) - Number(valor_2.value)) + 1)) {
                if (valor_4.checked === false) message('Valores repetidos são permitidos.')
                valor_4.checked = true
            } else {
                if (valor_4.checked === true) message('Valores repetidos não são mais permitidos.')
                valor_4.checked = false
            }
        }

        const func_2 = () => {
            if (isFloat__(Number(valor_1.value)) || isFloat__(Number(valor_2.value))) {
                if (valor_5.checked === false) message('Valores fracionários são permitidos.')
                valor_5.checked = true
            } else {
                if (valor_5.checked === true) message('Valores fracionários não são mais permitidos.')
                valor_5.checked = false
            }
        }

        const func_3 = () => {
            if (Number(valor_2.value) > Number(valor_1.value)) {
                message('O valor mínimo não pode ser maior que o valor máximo.')
                setTimeout(() => valor_3.value = '', 200)
            }
        }

        valor_1.addEventListener('input', func_2)
        valor_2.addEventListener('input', func_2)
        valor_3.addEventListener('input', func_1)
        valor_3.addEventListener('input', func_3)
        
        let start_1 = true
        let start_2 = true

        valor_4.addEventListener('click', () => {
            if (Number(valor_2.value) > Number(valor_1.value)) {
                message('O valor mínimo não pode ser maior que o valor máximo.')
                valor_2.focus()
                valor_4.checked = !valor_4.checked
                return
            }
            if (Number(valor_3.value) > ((Number(valor_1.value) - Number(valor_2.value)) + 1)) {
                message('Valores tem que ser repetidos nessa configuração.')
                valor_4.checked = true
            } else {
                if (!valor_4.checked && !start_1) {
                    message('Valores repetidos não são mais permitidos.')
                    valor_3.addEventListener('input', func_1)
                } else {
                    message('Valores repetidos são permitidos.')
                    valor_3.removeEventListener('input', func_1)
                }
            }
            start_1 = false
        })
        
        valor_5.addEventListener('click', () => {
            if (!valor_5.checked && (isFloat__(Number(valor_1.value)) || isFloat__(Number(valor_2.value)))) {
                message('Valores tem que ser fracionários nessa configuração.')
                valor_2.focus()
                valor_5.checked = true
            } else {
                if (!valor_5.checked && !start_2) {
                    message('Valores fracionários não são mais permitidos.')
                    valor_1.addEventListener('input', func_2)
                    valor_2.addEventListener('input', func_2)
                } else {
                    message('Valores fracionários são permitidos.')
                    valor_1.removeEventListener('input', func_2)
                    valor_2.removeEventListener('input', func_2)
                }
                start_2 = false
            }
        })

        form.addEventListener('submit', (e) => {
            e.preventDefault()
            if (Number(valor_2.value) > Number(valor_1.value)) {
                message('O valor mínimo não pode ser maior que o valor máximo.')
            } else {
                calc_inputs.forEach((el) => el.blur())
                document.getElementById('calc_button_calculate').focus()
                const a = document.querySelector('#sorteio_data_box_result .header span').textContent.toLowerCase()
                const b = document.querySelector('#data_box_form #calc_option .on').textContent.toLowerCase()
                calcAll(a, b, ...getInputs())
            }
        })
    }, 
    "sorteio de elementos": function() {
        calcOptionConfig()

        if (screenMedia()) {
            document.getElementById('data_container').style.height = (window.innerHeight - 55) + 'px'
            document.getElementById('data_container').style.minHeight = (window.innerHeight - 55) + 'px'
        }

        const form = document.getElementById('data_box_form')
        const calc_inputs = document.querySelectorAll('.calc-input')

        const [valor_1, valor_2, valor_3] = [...calc_inputs]

        let start_1 = true

        const func_1 = function() {
            const array = valor_1.value.includes(',') ? valor_1.value.split(',').map((el) => el.trim()).filter((el) => !isEmpty__(el)) : [valor_1.value]
            if (Number(valor_2.value) > array.length) {
                message('Valores repetidos são permitidos.')
                valor_3.checked = true
            } else {
                if (valor_3.checked) message('Valores repetidos não são mais permitidos.')
                valor_3.checked = false
            }
        }

        valor_2.addEventListener('input', func_1)

        valor_3.addEventListener('click', () => {
            if (!valor_3.checked) {
                const array = valor_1.value.includes(',') ? valor_1.value.split(',').map((el) => el.trim()).filter((el) => !isEmpty__(el)) : [valor_1.value]
                if (Number(valor_2.value) > array.length) {
                    valor_3.checked = true
                    message('Valores tem que ser repetidos nessa configuração.')
                } else {
                    if (!start_1) {
                        message('Valores repetidos não são mais permitidos.')
                        valor_2.addEventListener('input', func_1)
                    }
                }
            } else {
                message('Valores repetidos são permitidos.') 
                valor_2.removeEventListener('input', func_1)
            }
            start_1 = false
        })

        form.addEventListener('submit', (e) => {
            e.preventDefault()
            calc_inputs.forEach((el) => el.blur())
            document.getElementById('calc_button_calculate').focus()
            const a = document.querySelector('#sorteio_data_box_result .header span').textContent.toLowerCase()
            const b = document.querySelector('#data_box_form #calc_option .on').textContent.toLowerCase()
            calcAll(a, b, ...getInputs())
        })
    }
}

export default newSorteioContent