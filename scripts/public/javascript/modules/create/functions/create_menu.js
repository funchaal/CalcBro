import fetcher from "../../others/fetcher.js"

export default function createMenu(db) {
    const menu_icon_box = document.getElementById('menu_icon_box')
    const menu_container = document.getElementById('menu_container')
    const db_keys = Object.keys(db)

    db_keys.sort()
    
    const menu_list = document.createElement('ul')
    menu_list.id = 'menu_list'
    let first_letter = ''

    db_keys.forEach((key, index) => {
        const db_subkeys = Object.keys(db[key])

        if (key[0] !== first_letter && index !== 0) {
            const divisor = document.createElement('div')
            divisor.classList.add('divisor')
            menu_list.append(divisor)
        }

        first_letter = key[0]

        if (db_subkeys.length > 1) {
            const sub_option_container = document.createElement('ul')
            sub_option_container.classList.add('sub-option-container')

            db_subkeys.forEach((subkey) => {
                const li = document.createElement('li')
                li.classList.add('option')
                li.setAttribute('link', db[key][subkey])
                li.textContent = subkey
                li.classList.add('text-tm-ifc')
                sub_option_container.append(li)
            })

            const li = document.createElement('li')
            const span = document.createElement('span')

            li.classList.add('option')
            span.textContent = key
            span.classList.add('text-tm-ifc')

            li.append(span, sub_option_container)

            menu_list.append(li)
        } else {
            const li = document.createElement('li')
            const span = document.createElement('span')
            
            li.classList.add('option')
            li.setAttribute('link', db[key][key])
            span.textContent = key
            span.classList.add('text-tm-ifc')

            li.append(span)

            menu_list.append(li)
        }
    })

    menu_container.append(menu_list)
    
    onEventElement('#menu_container #menu_list > .option', (el) => {
        if (el.classList.contains('on')) {
            el.classList.remove('on')
        } else {
            const a = document.querySelector('#menu_container #menu_list > .option.on')
            if (a) a.classList.remove('on')
            if (el.childNodes.length > 1) el.classList.add('on')
        }
    })

    onEventElement('#menu_container #menu_list [link]', (el) => {
        fetcher(el.getAttribute('link'))
        menu_icon_box.classList.toggle('on')
    })

    menu_icon_box.addEventListener('click', () => menu_icon_box.classList.toggle('on'))
}