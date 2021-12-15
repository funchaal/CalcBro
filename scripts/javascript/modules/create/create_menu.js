import FETCHER from "../fetcher.js"

export default function CREATE_MENU(db) {
    const menu_icon_box = document.getElementById('menu_icon_box')
    const menu_container = document.getElementById('menu_container')
    let parent_keys = Object.keys(db)
    parent_keys.sort()
    let a = ''
    parent_keys.forEach((key) => {
        let child_keys = Object.keys(db[key])
        if (child_keys.length > 1) {
            let b = ''
            child_keys.forEach((subkey) => b = b.concat(`<li class="option" link="${db[key][subkey]}">${subkey}</li>`))
            b = `<ul class="sub-option">${b}</ul>`
            a = a.concat(`<li class="option"><span>${key}</span>${b}</li>`)
        } else {
            a = a.concat(`<li class="option" link="${db[key][key]}"><span>${key}</span></li>`)
        }
    })

    const list = document.createElement('ul')
    list.id = 'menu_list'
    list.innerHTML = a
    menu_container.appendChild(list)

    const options = document.querySelectorAll('#menu_list > .option')
    const option_links = document.querySelectorAll('#menu_list [link]')
    const menu_management = function() {
        let timer = 0
        const options = document.querySelectorAll('#menu_list > .option')
        options.forEach((el) => {
            el.classList.contains('on') ? timer = 0 : timer += 30
            setTimeout(() => {
                el.classList.toggle('animated')
                el.classList.toggle('fade_in_right')
                el.classList.toggle('on')
            }, timer)
        })
    }

    options.forEach((el) => {
        el.addEventListener('click', (e) => {
            if (e.currentTarget.classList.contains('open')) {
                el.classList.remove('open')
            } else {
                const a = document.querySelector('#menu_list > .open')
                if (a) a.classList.remove('open')
                if (e.currentTarget.childNodes.length > 1) e.currentTarget.classList.add('open')
            }
        })
    })

    option_links.forEach((el) => {
        el.addEventListener('click', (e) => {
            const link = e.currentTarget.getAttribute('link')
            FETCHER(link)
            menu_icon_box.classList.toggle('on')
            menu_container.classList.toggle('on')
            menu_management()
        })
    })

    menu_icon_box.addEventListener('click', () => {
        menu_icon_box.classList.toggle('on')
        menu_container.classList.toggle('on')
        menu_management()
    })
}