import fetcher from "../../others/fetcher.js"
import preChoice from "../pre_choice.js"

export default function preChoiceCreate(db) {
    const pre_choice = document.getElementById('pre_choice')
    const pre_choice_mover = document.getElementById('pre_choice_mover')
    const pre_choice_control_buttonl = document.getElementById('pre_choice_control_buttonl')
    const pre_choice_control_buttonr = document.getElementById('pre_choice_control_buttonr')
    db.sort((a, b) => b.qtd - a.qtd)
    db.forEach((el) => {
        const button = document.createElement('button');
        button.textContent = el.subtitle ? `${el.title.toCapitalize__()} - ${el.subtitle.toCapitalize__()}` : el.title.toCapitalize__()
        button.type = 'button'
        button.setAttribute('link', el.link)
        button.classList.add('option')
        pre_choice_mover.append(button)
    })
    onEventElement('#pre_choice_mover .option', (el) => fetcher(el.getAttribute('link')))

    if (screenMedia()) {
        preChoice.scroll()
        pre_choice.addEventListener('scroll', () => preChoice.scroll())
    } else if (!screenMedia()) {
        preChoice.translate()
        pre_choice_mover.addEventListener('wheel', (e) => preChoice.translate(e))
        pre_choice_control_buttonl.addEventListener('click', () => preChoice.translate(null, -200))
        pre_choice_control_buttonr.addEventListener('click', () => preChoice.translate(null, 200))
    }
}