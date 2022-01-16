import fetcher from './modules/others/fetcher.js'
import preChoice from './modules/pre_choice/pre_choice.js'
import newPage from './modules/new_page/new_page.js'
import searchBar from './modules/search_bar/search_bar.js'
import resultBoxManagement from './modules/others/result_box_management.js'
import create from './modules/create/create.js'
import userLog from './modules/user/user_log/user_log.js'
import login from "./modules/user/user_log/functions/login.js"
import logged from './modules/user/functions/logged.js'
import unlogged from './modules/user/functions/unlogged.js'

const theme_switch = document.getElementById('theme_switch')

const logo = document.getElementById('logo')

const search_bar_form = document.getElementById('search_bar_form')
const search_bar = document.getElementById('search_bar')
const datalist = document.getElementById('datalist')

const search_bar_x = document.querySelector('#search_bar_form > .x')
const search_bar_icon = document.querySelector('header .icon-box.search-button img')
const search_bar_arrow_back = document.querySelector('#search_bar_form .arrow-back')

let link_db = null
window.User = {}
window.UserState = false

window.setUserActivity = async function (body) {
    console.log(User)
    console.log(User._id)
    const res = await fetch(`/api/user/userActivity/update/${User._id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        method: 'PUT', 
        body: JSON.stringify(body)
    })
    const data = await res.json()
    User.userActivity = data
}

window.setUserState = async function (state) {
    UserState = state
    if (state) {
        await logged()
    } else {
        unlogged()
    }
}

window.setCookie = function (cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

window.getCookie = function (cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

if (getCookie('username')) {
    login({
        username: getCookie('username'), 
        token: getCookie('token')
    })
}

String.prototype.toCapitalize__ = function() {
    return this.charAt(0).toUpperCase() + this.slice(1, this.length)
}

String.prototype.toRaw__ = function() {
    return this.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
}

window.equals__ = function (array_1, array_2) {
    if (!array_2)
        return false;

    if (array_1.length != array_2.length)
        return false;

    for (var i = 0, l=array_1.length; i < l; i++) {
        // Check if we have nested array_2s
        if (array_1[i] instanceof Array && array_2[i] instanceof Array) {
            // recurse into the nested array_2s
            if (!equals__(array_1[i], array_2[i]))
                return false;       
        }           
        else if (array_1[i] != array_2[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}

window.isEmpty__ = function(string) {
    return string === ''
}

window.isEveryEmpty__ = function(...num) {
    return num.every((el) => el === '' || el === undefined || el === null || el === 0)
}

window.isSomeEmpty__ = function(...num) {
    return num.some((el) => el === '' || el === undefined || el === null || el === 0)
}

window.isNumeric__ = function(string) {
    return !isNaN(string) || !isNaN(Number(string))
}

window.isEveryNumeric__ = function(...num) {
    return num.every((el) => el !== '' && (!isNaN(el) || !isNaN(Number(el))))
}

window.isSomeNumeric__ = function(...num) {
    return num.some((el) => el !== '' && (!isNaN(el) || !isNaN(Number(el))))
}

window.isEven__ = function(num) {
    return Number(num) === num && num % 2 === 0
}

window.isOdd__ = function(num) {
    return Number(num) === num && num % 2 !== 0
}

window.isInt__ = function(num) {
    return Number(num) === num && num % 1 === 0
}

window.isFloat__ = function(num) {
    return Number(num) === num && num % 1 !== 0
}

window.screenMedia = function(size = 499) {
    if (window.innerWidth <= size) return true
    else return false
}

window.writeOnClipboard = function (content) {
    return new Promise(function (resolve, reject) {
        if (!content) {
            reject(new Error('empty'))
            return
        }
        navigator.clipboard.writeText(content)
            .then(() => resolve())
            .catch((err) => reject(err))
    })
}

window.message = function (message, type = 'normal') {
    if (!message) return
    let container = document.getElementById('message_container')

    if (!container) {
        container = document.createElement('div')
        container.id = 'message_container'
        document.body.appendChild(container)
    }

    const func_1 = function(element) {
        element.classList.remove('fade-in-down')
        element.classList.add('fade-out-up')

        setTimeout(() => {
            element.remove()

            const childs = container.childNodes
            if (childs.length === 0) container.remove()
        }, 200)
    }

    const message_box = document.createElement('div')
    message_box.classList.add('message-box')

    const span = document.createElement('span')
    span.textContent = message

    let remove_timer = 2000

    if (type === 'normal') remove_timer = 800

    message_box.classList.add(type)

    message_box.appendChild(span)

    let timer = 0

    const atual_message = document.querySelectorAll('#message_container .message-box')
    
    if (atual_message[0]) {
        atual_message.forEach((el) => func_1(el))
        timer = 100
    }
    container.appendChild(message_box)

    setTimeout(() => {
        message_box.classList.add('animated', 'fade-in-down')
        setTimeout(() => func_1(message_box), remove_timer)
    }, timer)
}

window.onEventElement = function(selector, callback, event = 'click') {
    if (!callback) throw new Error('no callback')
    document.querySelectorAll(selector).forEach((el, index) => {
        el.addEventListener(event, (e) => callback(el, index, e))
    })
}

window.theme = function(newTheme) {
    const a = document.querySelector('[theme]')
    const b = newTheme || theme_switch.checked ? 'dark' : 'light'
    if (newTheme) {
        a.setAttribute('theme', b)
        if (newTheme === 'dark') theme_switch.checked = true
        else if (newTheme === 'light') theme_switch.checked = false
    } else {
        a.setAttribute('theme', b)
    }
}

window.addEventListener('load', () => {
    const load_blocker = document.getElementById('load_blocker')
    load_blocker.classList.add('off')
    setTimeout(() => load_blocker.remove(), 200)
})

window.addEventListener('popstate', () => fetcher(window.location.href, true))

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => theme(e.matches ? "dark" : "light"))

window.addEventListener('blur', () => searchBar.mediaManagement(false))

window.calc_offset = 0

window.content_title = ''

const h_login_btn = document.querySelector('.icon-box.login button')

h_login_btn.addEventListener('click', () => {
    h_login_btn.classList.add('cb-state-on')
    h_login_btn.disabled = true
    userLog()
})

fetch('/JSON/link_db.json')
.then((response) => response.json())
.then((data) => link_db = data)
.then(() => {
    create.menu(link_db)
    searchBar.datalist.logic(link_db)
})

fetch('/statistics/MostAcessed')
.then((response) => response.json())
.then((data) => {
    preChoice.create(data)
    newPage()
    })

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) theme('dark')

logo.addEventListener('click', (e) => {
    e.preventDefault()
    fetcher('/home')
})

theme_switch.addEventListener('change', () => {
    theme()
})

search_bar_icon.addEventListener('click', () => searchBar.mediaManagement(true))

search_bar_arrow_back.addEventListener('click', () => searchBar.mediaManagement(false))

search_bar.addEventListener('input', () => searchBar.datalist.logic(link_db))

search_bar.addEventListener('focus', () => {
    searchBar.datalist.logic(link_db)
    search_bar.select()
})

search_bar_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const option = document.querySelector('#datalist .option')
    if (!option) return
    const link = option.getAttribute('link')
    const reference = option.textContent
    search_bar.value = reference
    searchBar.mediaManagement(false)
    fetcher(link)
    searchBar.datalist.historyManagement(reference)
})

datalist.addEventListener('click', (e) => {
    if (e.target.classList.contains('datalist')) searchBar.mediaManagement(true)
})

search_bar_x.addEventListener('click', () => {
    searchBar.mediaManagement(true)
    search_bar.value = ''
    searchBar.datalist.logic(link_db)
})

window.addEventListener('resize', () => {
    if (!screenMedia()) {
        if (screenMedia(849)) {
            resultBoxManagement(false)
        }
        searchBar.mediaManagement(false)
        preChoice.translate()
    }
})