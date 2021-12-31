import resultBoxManagement from "../../others/result_box_management.js"

export default function createShowResultButton() {
    if (document.getElementById('show_result_button')) return
    const button = document.createElement('button')
    const span = document.createElement('span')
    const img = document.createElement('img')

    button.id = 'show_result_button'
    button.type = 'button'
    span.textContent = 'Mostrar resultado'
    img.src = '/images/icons/arrow/arrow_thin_light.svg'
    
    button.append(span, img)

    if (screenMedia()) {
        const data_box_form = document.getElementById('data_box_form')
        const divisor = document.createElement('div')

        divisor.classList.add('divisor')

        data_box_form.appendChild(divisor)
        data_box_form.appendChild(button)
    } else if (!screenMedia()) {
        document.body.appendChild(button)

        const divisor = document.querySelector('#data_box_form .divisor')
        if (divisor) divisor.remove()
    }
    
    button.addEventListener('click', () => resultBoxManagement(true))
}