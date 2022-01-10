import setUserState from '../set_user_state.js'
import calcHistoryMenu from '../calc_history_menu.js'

export default function logged() {
    fetch('/html/user_container.html')
        .then((res) => res.text())
        .then((html) => {
            document.querySelector('header .header .icon-box.login').remove()
            document.querySelector('header .header .right-side').insertAdjacentHTML('afterbegin', html)

            const profile_picture_icon = document.getElementById('profile_picture_icon')
            profile_picture_icon.src = userData.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            
            const user_container = document.getElementById('user_container')
            const user_info_box = document.getElementById('user_info_box')

            const profile_picture = document.getElementById('profile_picture')
            profile_picture.src = userData.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

            const name_info = document.querySelector('#user_container .header .name')
            const username_info = document.querySelector('#user_container .header .username')
            const edit_profile_button = document.getElementById('edit_profile_button')

            name_info.textContent = userData.user.name
            username_info.textContent = userData.user.username

            calcHistoryMenu.create()
            
            edit_profile_button.addEventListener('click', () => {
                fetch('/html/user_settings_box.html')
                .then((res) => res.text())
                .then((html) => {
                    let formUsable = false

                    user_info_box.style.display = 'none'
                    user_container.insertAdjacentHTML('beforeend', html)

                    const user_settings_box = document.getElementById('user_settings_box')
                    const x = document.querySelector('#user_settings_box .header .x')

                    x.addEventListener('click', () => {
                        user_settings_box.remove()
                        user_info_box.style.display = 'block'
                    })

                    const inputs = document.querySelectorAll('#user_settings_box .content input')
                    const form = document.getElementById('user_update_form')
                    const submit_button = document.querySelector('#user_update_form button[type="submit"]')
                    const [name, lastname, username, email] = inputs

                    onEventElement('#user_settings_box .content input', () => {
                        if (name.value !== userData.user.name || lastname.value !== userData.user.lastname || username.value !== userData.user.userName || email.value !== userData.user.email) {
                            formUsable = true
                            submit_button.disabled = false
                        } else {
                            formUsable = false
                            submit_button.disabled = true
                        }
                    }, 'input')

                    name.value = userData.user.name
                    lastname.value = userData.user.lastname
                    username.value = userData.user.username
                    email.value = userData.user.email

                    form.addEventListener('submit', (e) => {
                        e.preventDefault()
                        if (formUsable) {
                            console.log('oioi')
                            formUsable = false
                            fetch(`/api/user/update/${userData.user._id}`, {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }, 
                                method: 'PUT', 
                                body: JSON.stringify({
                                    name: name.value, 
                                    lastname: lastname.value, 
                                    username: username.value, 
                                    email: email.value, 
                                })
                            }).then(res => res.json())
                            .then(data => {
                                let text = ''
                                console.log(data)
            
                                if (data.success) {
                                    text = 'Dados atualizados!'

                                    userData = data.userData

                                    user_settings_box.remove()
                                    user_info_box.style.display = 'block'

                                    console.log(userData)

                                    name_info.textContent = userData.user.name
                                    username_info.textContent = userData.user.username
                                }
                                else if (!data.username && !data.email) text = 'Usuário e email já existem'
                                else if (!data.username) text = 'Usuário já existe'
                                else if (!data.email) text = 'Email já existe'
            
                                message(text, data.success ? 'green' : 'red')
                            })
                        }
                    })
                })
            })

            const deslog = document.getElementById('deslog')
            deslog.addEventListener('click', () => setUserState(false))
        })
}