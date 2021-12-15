import PRE_CHOICE_SELECT from "./pre_choice/pre_choice_select.js"
import NEW_CALC_CONTENT from "./new_calc_content.js"
import WRITE_ON_CLIPBOARD from "./write_on_clipboard.js"
import ALERT_MESSAGE from "./alert_message.js"

const load = {
    home: function() {
        return
    }, 
    sorteio: function() {
        if (SCREEN_MEDIA()) {
            document.querySelector('sorteio_data_container').style.height = (window.innerHeight - 90) + 'px'
        }
    }, 
    calc: function() {
        NEW_CALC_CONTENT()
    }
}

function CLIP_BOARD_CONFIG() {
    document.querySelectorAll('.clipboard-icon').forEach((el) => {
        el.addEventListener('animationend', (e) => {
            e.target.classList.remove('animate__animated', 'animate__flash', 'animate__headShake')
        })
        el.addEventListener('click', (e) => {
            const target = e.target
            const copy_element = target.getAttribute('copy-element')
            const content = document.getElementById(copy_element).textContent
            WRITE_ON_CLIPBOARD(content)
                .then(() => {
                    target.classList.add('animate__animated', 'animate__flash')
                    ALERT_MESSAGE('copiado!')
                })
                .catch(() => {
                    target.classList.add('animate__animated', 'animate__headShake')
                    ALERT_MESSAGE('nada a copiar.')
                })
        })
    })
}

export default function NEW_PAGE_LOAD() {
    CLIP_BOARD_CONFIG()
    
    const url = (window.location.pathname).split('/')
    url.shift()
    
    const title = url[0].toCapitalize__().replace('-', ' ')
    const subtitle = url[1] ? url[1].toCapitalize__().replace('-', ' ') : null
    const final_title = `CalcBro | ${subtitle ? `${title} - ${subtitle}` : title}`
    
    document.title = final_title
    
    PRE_CHOICE_SELECT()
    
    if (!Object.keys(load).some((el) => el === url[0])) {
        load['calc']()
        return
    }
    
    load[url[0]]()
}