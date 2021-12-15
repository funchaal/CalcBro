import FETCHER from './modules/fetcher.js'
import SCREEN_MEDIA from './modules/screen_media.js'
import THEME_CHANGER from './modules/theme_changer.js'
import SEARCH_BAR_MANAGEMENT from './modules/search_bar/search_bar_manager.js'
import CREATE_SHOW_RESULT_BUTTON from './modules/create/create_show_result_button.js'
import PRE_CHOICE_TRANSLATE from './modules/pre_choice/pre_choice_translate.js'
import NEW_PAGE_LOAD from './modules/new_page_load.js'
import DATALIST_LOGIC from './modules/search_bar/datalist_logic.js'
import DATALIST_HISTORY_MANAGEMENT from './modules/search_bar/datalist_history_management.js'
import RESULT_BOX_MANAGEMENT from './modules/result_box_management.js'
import CREATE_MENU from './modules/create/create_menu.js'

const pre_choice_mover = document.getElementById('pre_choice_mover')
const pre_choice_buttonl = document.getElementById('pre_choice_buttonl')
const pre_choice_buttonr = document.getElementById('pre_choice_buttonr')

const search_bar_form = document.getElementById('search_bar_form')
const search_bar = document.getElementById('search_bar')
const datalist = document.getElementById('datalist')

const search_bar_x = document.querySelector('#search_bar_form > .x')
const search_bar_icon = document.querySelector('header .icon-box.search-button img')
const search_bar_arrow_back = document.querySelector('#search_bar_form .arrow-back')

const logo = document.getElementById('logo')

let calc_link

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
    return num.every((el) => el === '')
}

window.isSomeEmpty__ = function(...num) {
    return num.some((el) => el === '')
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

fetch('/JSON/calc_link.json')
.then((response) => response.json())
.then((data) => calc_link = data)
.then(() => {
    CREATE_MENU(calc_link)
})

window.addEventListener('popstate', () => FETCHER(window.location.href, true))

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) THEME_CHANGER('dark')

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => THEME_CHANGER(e.matches ? "dark" : "light"))

window.addEventListener('blur', () => SEARCH_BAR_MANAGEMENT(false))

logo.addEventListener('click', (e) => {
    e.preventDefault()
    FETCHER('/home')
})

theme_switch.addEventListener('change', () => {
    THEME_CHANGER()
})

if (!SCREEN_MEDIA()) {
    PRE_CHOICE_TRANSLATE()
    pre_choice_mover.addEventListener('wheel', (e) => PRE_CHOICE_TRANSLATE(e))
    pre_choice_buttonl.addEventListener('click', () => PRE_CHOICE_TRANSLATE(null, -200))
    pre_choice_buttonr.addEventListener('click', () => PRE_CHOICE_TRANSLATE(null, 200))
}

NEW_PAGE_LOAD()

search_bar_icon.addEventListener('click', () => SEARCH_BAR_MANAGEMENT(true))

search_bar_arrow_back.addEventListener('click', () => SEARCH_BAR_MANAGEMENT(false))

search_bar.addEventListener('input', () => DATALIST_LOGIC(calc_link))

search_bar.addEventListener('focus', () => {
    DATALIST_LOGIC(calc_link)
    search_bar.select()
})

search_bar_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const option = document.querySelector('#datalist .option')
    if (!option) return
    const link = option.getAttribute('link')
    const reference = option.textContent
    search_bar.value = reference
    SEARCH_BAR_MANAGEMENT(false)
    FETCHER(link)
    DATALIST_HISTORY_MANAGEMENT(reference)
})

datalist.addEventListener('click', (e) => {
    if (e.target.classList.contains('datalist')) SEARCH_BAR_MANAGEMENT(true)
})

search_bar_x.addEventListener('click', () => {
    SEARCH_BAR_MANAGEMENT(true)
    search_bar.value = ''
    DATALIST_LOGIC(calc_link)
})

document.querySelectorAll('#pre_choice .option').forEach((el) => {
    el.addEventListener('click', (sel) => {
        FETCHER(sel.target.getAttribute('link'))
    })
})

window.addEventListener('resize', () => {
    if (!SCREEN_MEDIA()) {
        if (SCREEN_MEDIA(849)) {
            RESULT_BOX_MANAGEMENT(false)
        }
        SEARCH_BAR_MANAGEMENT(false)
        PRE_CHOICE_TRANSLATE()
    }
    CREATE_SHOW_RESULT_BUTTON()
})

function calcSorteio() {
    GET_INPUTS()
    let total = []
    if (v3 > v1 - v2 + 1 && !valor_switch_1) {
        alert('nao da')
        return
    }
    for (let i = 1; i <= v3; i++) {
        let a
        if (!valor_switch_1) {
            do {
                a = !valor_switch_2 ? Math.floor(Math.random() * (v1 - v2 + 1)) + v2 : Number((Math.random() * (v1 - v2) + v2).toFixed(2))
            } while (total.some((value) => value === a))
            total.push(a)
        } else {
            a = !valor_switch_2 ? Math.floor(Math.random() * (v1 - v2 + 1)) + v2 : Number((Math.random() * (v1 - v2 + 1) + v2).toFixed(2))
            total.push(a)
        }
    }
    total = total.join(' ')
    document.getElementById('sorteio_result_text').textContent = total
}