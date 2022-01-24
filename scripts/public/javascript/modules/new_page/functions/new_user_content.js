import fetcher from '../../others/fetcher.js'
import fill from '../../user/functions/fill.js'
import userLog from '../../user/user_log/user_log.js'

const newUserContent = {
    profile: function() {

        if (!screenMedia(849)) {
            fetcher('/user/account')
            .then(() => document.getElementById('main_container').classList.remove('off'))
            return
        }

        if (!UserState) {
            fetcher('/home').then(() => userLog())
            return
        }

        onEventElement('#config_option .option', (el) => {
            fetcher(el.getAttribute('link'))
        })
    }, 
    account: function() {

        if (!UserState) {
            fetcher('/home').then(() => userLog())
            return
        }

        document.querySelectorAll('#config_box form [tag]').forEach(el => el.value = User[el.getAttribute('tag')])

        onEventElement('#config_option .option', (el) => {
            fetcher(el.getAttribute('link'))
        })
    
        const formUsable = [false, false, false, false, false]
    
        onEventElement('#config_box section:first-child form', async (el, index, e) => {
            e.preventDefault()
            if (!formUsable[index]) return
    
            formUsable[index] = false
            const button = el.querySelector('button[type="submit"]')
            button.classList.add('cb-state-on')
            const input = el.querySelector('input')
            const value = input.value
            const key = input.name
            const res = await fetch(`/api/user/update/account-data/${User._id}/${User.token}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
                method: 'PUT', 
                body: JSON.stringify({
                    [key]: value
                })
            })
            const data = await res.json()
            message(data.message, res.status === 200 ? 'green' : 'red')
            if (res.status === 200) {
                User = data.User
                setCookie('username', User.username, 14)
                button.classList.add('disabled')
                input.blur()
                fill()
            }
            button.classList.remove('cb-state-on')
            formUsable[index] = true
        }, 'submit')
        
        const [name, lastname, username, email] = document.querySelectorAll('#config_box [tag]')
        const [sbmt_name, sbmt_lastname, sbmt_username, sbmt_email, sbmt_password] = document.querySelectorAll('#config_box button[type="submit"]')
        
        name.addEventListener('input', (e) => {
            if (name.value.toLowerCase() === User.name.toLowerCase() || name.value === '') {
                sbmt_name.classList.add('disabled')
                formUsable[0] = false
            } else {
                sbmt_name.classList.remove('disabled')
                formUsable[0] = true
            }
        })
    
        lastname.addEventListener('input', (e) => {
            if (lastname.value.toLowerCase() === User.lastname.toLowerCase() || lastname.value === '') {
                sbmt_lastname.classList.add('disabled')
                formUsable[1] = false
            } else {
                sbmt_lastname.classList.remove('disabled')
                formUsable[1] = true
            }
        })
    
        username.addEventListener('input', (e) => {
            if (username.value === User.username || username.value === '') {
                sbmt_username.classList.add('disabled')
                formUsable[2] = false
            } else {
                sbmt_username.classList.remove('disabled')
                formUsable[2] = true
            }
        })
    
        email.addEventListener('input', (e) => {
            if (email.value.toLowerCase() === User.email.toLowerCase() || email.value === '') {
                sbmt_email.classList.add('disabled')
                formUsable[3] = false
            } else {
                sbmt_email.classList.remove('disabled')
                formUsable[3] = true
            }
        })
    
        onEventElement('#config_box [tag]', (el) => {if (el.value === '') el.value = User[el.getAttribute('tag')]}, 'blur')

        const change_password = document.getElementById('change_password')
        const cp_inputs = Array.from(change_password.getElementsByTagName('input'))

        onEventElement('#change_password input', () => {
            if (cp_inputs.every(({ value }) => value !== '')) {
                formUsable[4] = true
                sbmt_password.classList.remove('disabled')
            } else {
                formUsable[4] = false
                sbmt_password.classList.add('disabled')
            }
        }, 'input')

        document.getElementById('change_password').addEventListener('submit', async (e) => {
            e.preventDefault()
            if (!formUsable[4]) return
            formUsable[4] = false
            sbmt_password.classList.add('cb-state-on')
            
            const inputs = document.querySelectorAll('#change_password input')
            const [atual_password, new_password] = Array.from(inputs).map(el => el.value)
            
            const res = await fetch(`/api/user/update/password/${User._id}/${User.token}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
                method: 'PUT', 
                body: JSON.stringify({
                    atualPassword: atual_password, 
                    newPassword: new_password
                })
            })
            const data = await res.json()
            message(data.message, res.status === 200 ? 'green' : 'red')
            
            if (res.status === 200) {
                inputs.forEach(el => {
                    el.value = ''
                    el.blur()
                })
            }
            formUsable[4] = true
            sbmt_password.classList.remove('cb-state-on')
        })
    }, 
    about: function() {

        if (!UserState) {
            fetcher('/home').then(() => userLog())
            return
        }

        onEventElement('#config_option .option', (el) => {
            fetcher(el.getAttribute('link'))
        })
    }
}

export default newUserContent