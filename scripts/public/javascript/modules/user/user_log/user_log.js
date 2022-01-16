import register from "./functions/register.js"
import login from "./functions/login.js"

export default async function userLog() {
    const h_login_btn = document.querySelector('.icon-box.login button')
    const user_log = document.querySelector('#user_log.login')
    const signup_page = document.querySelector('#user_log.signup')

    const main = document.querySelector('main')
    let formUsable = true
    const closeForm = () => {
        document.getElementById('user_log').remove()
        h_login_btn.disabled = false
    }

    if (!user_log) {
        const content = await fetch('/html/login.html').then(res => res.text())
        signup_page && signup_page.remove()
        main.insertAdjacentHTML('beforeend', content)

        const submit_btn = document.querySelector('#user_log form button[type="submit"]')

        const form = document.querySelector('#user_log form')
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            if (formUsable) {
                formUsable = false
                submit_btn.classList.add('cb-state-on')
                
                const inputs = Array.from(document.querySelectorAll('#user_log form input'))
                const [username, password, keep] = inputs
                
                try {
                    await login({
                        username: username.value, 
                        password: password.value, 
                        keep: keep.checked
                    })
                    closeForm()
                } catch (err) {
                    formUsable = true
                    submit_btn.classList.remove('cb-state-on')
                }
            }
        })
    } else {
        const content = await fetch('/html/signup.html').then(res => res.text())
        user_log.remove()
        main.insertAdjacentHTML('beforeend', content)

        const submit_btn = document.querySelector('#user_log form button[type="submit"]')
        
        const form = document.querySelector('#user_log form')
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            if (formUsable) {
                formUsable = false
                submit_btn.classList.add('cb-state-on')

                const inputs = Array.from(document.querySelectorAll('#user_log form input'))
                const [name, lastname, username, email, password, confirm, keep] = inputs

                try {
                    await register({
                        name: name.value, 
                        lastname: lastname.value, 
                        username: username.value, 
                        email: email.value, 
                        password: password.value, 
                        keep: keep.checked
                    })
                    closeForm()
                } catch (err) {
                    formUsable = true
                    submit_btn.classList.remove('cb-state-on')
                }
            }
        })
    }
    h_login_btn.classList.remove('cb-state-on')
    document.querySelector('#user_log .header .x').addEventListener('click', () => closeForm())
    document.getElementById('user_log').addEventListener('mousedown', (e) => e.target.id === 'user_log' && closeForm())
    
    const button_change = document.querySelector('button.change')
    button_change.addEventListener('click', () => {
        button_change.disabled = true
        button_change.classList.add('cb-state-on')
        userLog()
    })
}