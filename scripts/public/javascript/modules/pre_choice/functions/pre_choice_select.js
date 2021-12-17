import preChoice from '../pre_choice.js'

export default function preChoiceSelect() {
    const url = window.location.pathname
    const on = document.querySelector('#pre_choice_mover .option.on')
    const select = document.querySelector(`#pre_choice_mover [link="${url}"]`)
    if (on) on.classList.remove('on')
    if(select) {
        select.classList.add('on')
    } else {
        const a = url.split('/', 2)[1]
        if (!a) return
        const options = document.querySelectorAll(`#pre_choice_mover > .option`)
        options.forEach((el) => {if (el.getAttribute('link').includes(a)) el.classList.add('on')})
    }
    preChoice.bring()
}