import calcHistory from "./calc_history.js"
import unlogged from './functions/unlogged.js'

const userMenu = {
    create: function() {
        userMenu.icon_box = document.querySelector('header .header .icon-box.user')
        userMenu.profile_icon = document.getElementById('profile_icon')
        userMenu.x = document.querySelector('#user_menu .header .x')
        userMenu.profile_picture = document.getElementById('profile_picture')
        userMenu.tags = document.querySelectorAll('#user_menu [tag]')

        userMenu.fill()
        
        onEventElement('#sair', () => {
            userMenu.close()
            unlogged()
        })
        
        onEventElement('#user_history_button', () => {
            userMenu.close()
            calcHistory.open()
        })

        onEventElement('#user_config_button', async () => {
            const html = await fetch('/html/user_config.html').then(res => res.text())
            document.querySelector('main').insertAdjacentHTML('beforeend', html)
        })
        
        userMenu.profile_icon.addEventListener('click', () => userMenu.icon_box.classList.toggle('on'))
        userMenu.x.addEventListener('click', () => userMenu.icon_box.classList.toggle('on'))
        
    }, 
    fill: function() {
        userMenu.profile_icon.src = User.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        userMenu.profile_picture.src = User.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        userMenu.tags.forEach(el => el.textContent = User[el.getAttribute('tag')])
    }, 
    open: function() {
        userMenu.icon_box.classList.add('on')
    }, 
    close: function() {
        userMenu.icon_box.classList.remove('on')
    }, 
    toggle: function() {
        userMenu.icon_box.classList.toggle('on')
    }, 
    delete: function() {
        return new Promise(function(resolve) {
            userMenu.close()
            setTimeout(() => {
                userMenu.icon_box.remove()
                resolve()
            }, 500)
        })
    }
}

export default userMenu