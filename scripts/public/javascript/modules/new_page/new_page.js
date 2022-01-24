import preChoice from '../pre_choice/pre_choice.js'
import fill from '../user/functions/fill.js'
import newCalcContent from "./functions/new_calc_content.js"
import newSorteioContent from "./functions/new_sorteio_content.js"
import newUserContent from './functions/new_user_content.js'

const new_page = {
    home: function() {
        return
    }, 
    sorteio: {
        'sorteio de numeros': newSorteioContent['sorteio de numeros'], 
        'sorteio de elementos': newSorteioContent['sorteio de elementos']
    }, 
    user: {
        profile: newUserContent['profile'], 
        account: newUserContent['account'], 
        about: newUserContent['about']
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
            .catch((err) => {
                el.classList.add('animate__animated', 'animate__headShake')
                if (err.message === 'empty') message('nada a copiar')
                else message('houve um erro ao copiar')
            })
    })
}

export default function newPage() {
    clipBoardConfig()

    if (screenMedia()) {
        const main_container = document.getElementById('main_container')
        main_container.style.height = `${window.innerHeight - 55}px`
        main_container.style.minHeight = `${window.innerHeight - 55}px`
    }

    const url = (window.location.pathname).split('/').map((el) => el.replace(/-/g, ' '))
    url.shift()
    
    const title = url[0].toCapitalize__().replace('-', ' ')
    const subtitle = url[1] ? url[1].toCapitalize__().replace('-', ' ') : null
    const final_title = `CalcBro | ${subtitle ? `${title} - ${subtitle}` : title}`
    
    document.title = final_title
    
    if (!screenMedia()) preChoice.select()
    
    if (!Object.keys(new_page).some((el) => el === url[0])) {
        new_page['calc']()
    } else {
        const key = url[0]
        const subkey = url[1]
        const func = new_page[key][subkey] || new_page[key]
        console.log(func)
        try {
            func()
        } catch(e) {
            console.log(e)
            message('houve um erro.', 'red')
        }
    }

    fill()

    const page_title = document.querySelector('.data-box .header h1')
    if (page_title) content_title = page_title.textContent
    else content_title = ''
}