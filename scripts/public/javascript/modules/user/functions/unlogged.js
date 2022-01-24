import fetcher from '../../others/fetcher.js'
import calcHistory from '../calc_history.js'
import userLog from '../user_log/user_log.js'
import userMenu from '../user_menu.js'

export default function unlogged() {
        User = null

        setCookie('username', '', -1)
        setCookie('deviceToken', '', -1)
        setCookie('sessionToken', '', -1)

        const login = `<div class="icon-box login"><button type="button" class="cb-state">Login
                                <img src="/images/icons/loading/loading.svg" class="loading" alt="">
                        </button></div>`

        calcHistory.delete()
        userMenu.delete()
        .then(() => {
                document.querySelector('header .header .right-side').insertAdjacentHTML('afterbegin', login)
                const h_login_btn = document.querySelector('.icon-box.login button')
                h_login_btn.addEventListener('click', () => {
                        h_login_btn.classList.add('cb-state-on')
                        h_login_btn.disabled = true
                        userLog()
                })
        })

        fetcher('/home')
}