import preChoice from '../pre_choice/pre_choice.js'
import newCalcContent from "./functions/new_calc_content.js"
import newSorteioContent from "./functions/new_sorteio_content.js"

const new_page = {
    home: function() {
        return
    }, 
    sorteio: {
        'sorteio de numeros': newSorteioContent['sorteio de numeros'], 
        'sorteio de elementos': newSorteioContent['sorteio de elementos']
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
                message('copiado!', 'green')
            })
            .catch(() => {
                el.classList.add('animate__animated', 'animate__headShake')
                message('nada a copiar.')
            })
    })
}

export default function newPage() {
    clipBoardConfig()
    
    const url = (window.location.pathname).split('/').map((el) => el.replace(/-/g, ' '))
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

    const key = url[0]
    const subkey = url[1]
    const func = new_page[key][subkey] || new_page[key]

    try {
        func()
    } catch {
        message('houve um erro.', 'red')
    }
}