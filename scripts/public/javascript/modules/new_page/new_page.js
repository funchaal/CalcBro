import preChoice from '../pre_choice/pre_choice.js'
import newCalcContent from "./functions/new_calc_content.js"

const new_page = {
    home: function() {
        return
    }, 
    sorteio: function() {
        if (screenMedia()) {
            document.querySelector('sorteio_data_container').style.height = (window.innerHeight - 90) + 'px'
        }
    }, 
    calc: newCalcContent
}

function clipBoardConfig() {
    onEventElement('.clipboard-icon', (el) => el.classList.remove('animate__animated', 'animate__flash', 'animate__headShake'), 'animationend')
    onEventElement('.clipboard-icon', (el) => {
        const copy_element = el.getAttribute('copy-element')
        const content = document.getElementById(copy_element).textContent
        writeOnClipboard(content)
            .then(() => {
                el.classList.add('animate__animated', 'animate__flash')
                message('copiado!')
            })
            .catch(() => {
                el.classList.add('animate__animated', 'animate__headShake')
                message('nada a copiar.')
            })
    })
}

export default function newPage() {
    clipBoardConfig()
    
    const url = (window.location.pathname).split('/')
    url.shift()
    
    const title = url[0].toCapitalize__().replace('-', ' ')
    const subtitle = url[1] ? url[1].toCapitalize__().replace('-', ' ') : null
    const final_title = `CalcBro | ${subtitle ? `${title} - ${subtitle}` : title}`
    
    document.title = final_title
    
    preChoice.select()
    
    if (!Object.keys(new_page).some((el) => el === url[0])) {
        new_page['calc']()
        return
    }
    
    new_page[url[0]]()
}