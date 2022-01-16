import calcHistory from '../calc_history.js'
import userMenu from '../user_menu.js'

export default async function logged() {
    const user_menu = await fetch('/html/user_menu.html').then(res => res.text())
    const calc_history = await fetch('/html/calc_history.html').then(res => res.text())

    document.querySelector('header .header .icon-box.login').remove()

    const right_side = document.querySelector('header .header .right-side')
    right_side.insertAdjacentHTML('afterbegin', user_menu)
    right_side.insertAdjacentHTML('afterbegin', calc_history)

    calcHistory.create()
    userMenu.create()
}