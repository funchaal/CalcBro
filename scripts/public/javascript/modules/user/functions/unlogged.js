import loginContainerManager from '../login_container_manager.js'

export default function unlogged() {
        userData = null

        const div = document.createElement('div')
        const button = document.createElement('button')

        div.classList.add('icon-box', 'login')
        button.textContent = 'Login'
        div.appendChild(button)

        document.querySelector('header .header .icon-box.user').remove()
        document.querySelector('header .header .icon-box.user-history').remove()
        document.querySelector('header .header .right-side').insertAdjacentElement('afterbegin', div)

        document.querySelector('.icon-box.login button').addEventListener('click', () => loginContainerManager())
}