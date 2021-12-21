import fetcher from "../../others/fetcher.js"

export default function createPreChoice(db) {
    const pre_choice_mover = document.getElementById('pre_choice_mover')
    db.forEach((el) => {
        const button = document.createElement('button');
        button.textContent = el.subtitle ? `${el.title.toCapitalize__()} - ${el.subtitle.toCapitalize__()}` : el.title.toCapitalize__()
        button.type = 'button'
        button.setAttribute('link', el.link)
        button.classList.add('option')
        pre_choice_mover.append(button)
    })
    onEventElement('#pre_choice .option', (el) => fetcher(el.getAttribute('link')))
}