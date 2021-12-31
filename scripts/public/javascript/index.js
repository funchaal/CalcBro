import fetcher from './modules/others/fetcher.js'
import preChoice from './modules/pre_choice/pre_choice.js'
import newPage from './modules/new_page/new_page.js'
import searchBar from './modules/search_bar/search_bar.js'
import resultBoxManagement from './modules/others/result_box_management.js'
import create from './modules/create/create.js'

const theme_switch = document.getElementById('theme_switch')

const logo = document.getElementById('logo')

const search_bar_form = document.getElementById('search_bar_form')
const search_bar = document.getElementById('search_bar')
const datalist = document.getElementById('datalist')

const search_bar_x = document.querySelector('#search_bar_form > .x')
const search_bar_icon = document.querySelector('header .icon-box.search-button img')
const search_bar_arrow_back = document.querySelector('#search_bar_form .arrow-back')

let link_db
let most_acessed_db

String.prototype.toCapitalize__ = function() {
    return this.charAt(0).toUpperCase() + this.slice(1, this.length)
}

String.prototype.toRaw__ = function() {
    return this.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
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
    document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener(event, (e) => callback(el, e))
    })
}

window.themeChange = function(theme) {
    const a = document.querySelector('[theme]')
    const b = theme || theme_switch.checked ? 'dark' : 'light'
    if (theme) {
        a.setAttribute('theme', b)
        if (theme === 'dark') theme_switch.checked = true
        else if (theme === 'light') theme_switch.checked = false
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

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => themeChange(e.matches ? "dark" : "light"))

window.addEventListener('blur', () => searchBar.mediaManagement(false))

window.calc_offset = 0

window.content_title = ''

window.statistic_db_data = {
    mostAcessed: {
        pageLink: window.location.pathname, 
        fetchLink: ''
    }
}

fetch('/JSON/link_db.json')
    .then((response) => response.json())
    .then((data) => link_db = data)
    .then(() => {
        create.menu(link_db)
        searchBar.datalist.logic(link_db)
    })

fetch('/statistics')
    .then((response) => response.json())
    .then((data) => most_acessed_db = data)
    .then(() => preChoice.create(most_acessed_db))

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) themeChange('dark')

logo.addEventListener('click', (e) => {
    e.preventDefault()
    fetcher('/home')
})

theme_switch.addEventListener('change', () => {
    themeChange()
})

newPage()

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