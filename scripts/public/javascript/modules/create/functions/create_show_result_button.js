import resultBoxManagement from "../../others/result_box_management.js"

export default function createShowResultButton() {
    const data_box_form = document.getElementById('data_box_form')
    
    const button = document.createElement('button')
    const span = document.createElement('span')
    const img = document.createElement('img')

    button.id = 'show_result_button'
    button.setAttribute('type', 'button')
    
    span.textContent = 'Mostrar resultado'
    
    img.src = '/images/icons/arrow/arrow_thin_light.svg'
    
    button.appendChild(span)
    button.appendChild(img)

    if (screenMedia()) {
        const data_box_form = document.getElementById('data_box_form')
        const divisor = document.createElement('div')
        divisor.classList.add('divisor')
        data_box_form.appendChild(divisor)
        data_box_form.appendChild(button)
    }

    if (!screenMedia()) {
        document.body.appendChild(button)
        const divisor_sel = document.querySelector('#data_box_form .divisor')
        if (divisor_sel) divisor_sel.remove()
    }
    
    button.addEventListener('click', () => resultBoxManagement(true))
}