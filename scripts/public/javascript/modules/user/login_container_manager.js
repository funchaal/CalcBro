import setUserState from "./set_user_state.js"

export default async function loginContainerManager() {
    const login = document.querySelector('#login_container.login')
    const signup = document.querySelector('#login_container.signup')
    let formUsable = true
    const closeForm = () => document.getElementById('login_container').remove()
    if (!login) {
        let content = await fetch('/html/login.html')
        content = await content.text()
        if (signup) signup.remove()
        document.body.insertAdjacentHTML('beforeend', content)

        const form = document.getElementById('login_form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            if (formUsable) {
                formUsable = false
                const [username, password] = document.querySelectorAll('#login_form input')
                fetch('/api/user/login', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }, 
                    method: 'POST', 
                    body: JSON.stringify({
                        username: username.value, 
                        password: password.value
                    })
                }).then(res => res.json())
                .then(data => {
                    let text = ''
                    if (data.problem === 'user') text = 'Usuário não existe'
                    else if (data.problem === 'password') text = "Senha incorreta"
                    else if (data.success) {
                        text = "Logado"

                        closeForm()
                        userData = data.userData
                        console.log(userData)
                        setUserState(true)
                        
                    }
                    message(text, data.success ? 'green' : 'red')
                    formUsable = true
                })
            }
        })
    } else {
        let content = await fetch('/html/signup.html')
        content = await content.text()
        login.remove()
        document.body.insertAdjacentHTML('beforeend', content)

        const form = document.getElementById('signup_form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            if (formUsable) {
                formUsable = false
                const [name, lastname, username, email, password] = document.querySelectorAll('#signup_form input')
                fetch('/api/user/new', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }, 
                    method: 'POST', 
                    body: JSON.stringify({
                        name: name.value, 
                        lastname: lastname.value, 
                        username: username.value, 
                        email: email.value, 
                        password: password.value
                    })
                }).then(res => res.json())
                .then(data => {
                    let text = ''

                    if (data.success) {
                        text = 'Usuário criado!'

                        closeForm()
                        userData = data.userData
                        setUserState(true)
                    }
                    else if (!data.username && !data.email) text = 'Usuário e email já existem'
                    else if (!data.username) text = 'Usuário já existe'
                    else if (!data.email) text = 'Email já existe'

                    message(text, data.success ? 'green' : 'red')
                    formUsable = true
                })
            }
        })
    }

    document.querySelector('#login_container .header .x').addEventListener('click', () => closeForm())
    document.getElementById('login_container').addEventListener('mousedown', (e) => e.target.id === 'login_container' && closeForm())
    document.querySelector('button.change').addEventListener('click', () => loginContainerManager())

}