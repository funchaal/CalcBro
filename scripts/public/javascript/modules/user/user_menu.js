import fetcher from "../others/fetcher.js"
import calcHistory from "./calc_history.js"
import unlogged from './functions/unlogged.js'

const userMenu = {
    create: async function() {
        userMenu.icon_box = document.querySelector('header .header .icon-box.user')
        userMenu.profile_icon = document.getElementById('profile_icon')
        userMenu.x = document.querySelector('#user_menu .header .x')
        userMenu.profile_picture = document.getElementById('profile_picture')
        
        onEventElement('#sair', () => {
            userMenu.close()
            unlogged()
        })
        
        onEventElement('#user_history_button', () => {
            userMenu.close()
            calcHistory.open()
        })

        onEventElement('#user_config_button', async () => {
            userMenu.close()
            if (!screenMedia(849)) await fetcher('/user/account')
            else await fetcher('/user/profile')
            document.getElementById('main_container').classList.remove('off')
        })
        
        userMenu.profile_icon.addEventListener('click', () => userMenu.icon_box.classList.toggle('on'))
        userMenu.x.addEventListener('click', () => userMenu.icon_box.classList.toggle('on'))
        
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