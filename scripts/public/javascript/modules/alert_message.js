export default function ALERT_MESSAGE(massage, type = 'normal') {
    let container = document.getElementById('massage_container')
    if (!container) {
        container = document.createElement('div')
        container.id = 'massage_container'
        document.body.appendChild(container)
    }
    const func_1 = function(element) {
        element.classList.remove('fade-in-down')
        element.classList.add('fade-out')
        setTimeout(() => {
            element.remove()
            const childs = container.childNodes
            if (childs.length === 0) container.remove()
        }, 400)
    }
    const massage_box = document.createElement('div')
    massage_box.classList.add('massage-box')

    const span = document.createElement('span')
    span.textContent = massage

    const img = document.createElement('img')
    img.classList.add('x')

    if (type === 'normal') {
        massage_box.classList.add('normal')
        img.src = '/images/icons/x/x_dark.svg'
    } else if (type === 'red') {
        massage_box.classList.add('red')
        img.src = '/images/icons/x/x_light.svg'
    } else if (type === 'green') {
        massage_box.classList.add('green')
        img.src = '/images/icons/x/x_light.svg'
    }

    img.addEventListener('click', (e) => {
        const parent = e.target.parentElement
        func_1(parent)
    })

    massage_box.appendChild(span)
    massage_box.appendChild(img)
    container.appendChild(massage_box)
    massage_box.classList.add('animated', 'fade-in-down')
    setTimeout(() => func_1(massage_box), 4000)
}