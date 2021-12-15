import SCREEN_MEDIA from "../screen_media.js"
import RESULT_BOX_MANAGEMENT from "../result_box_management.js"

export default function CREATE_SHOW_RESULT_BUTTON() {
    const show_result_button = document.getElementById('show_result_button')
    if (SCREEN_MEDIA(849)) {
        if (!show_result_button) {
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
            
            if (SCREEN_MEDIA()) {
                const divisor = document.createElement('div')
                divisor.classList.add('divisor')
                data_box_form.appendChild(divisor)
            }
            
            data_box_form.appendChild(button)
            button.addEventListener('click', () => RESULT_BOX_MANAGEMENT(true))
            
        }
    } else {
        if (show_result_button) show_result_button.remove()
    }
    if (!SCREEN_MEDIA()) {
        const divisor_sel = document.querySelector('#data_box_form .divisor')
        if (divisor_sel) divisor_sel.remove()
    }
}