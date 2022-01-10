import fetcher from '../others/fetcher.js'
import calcAll from '../calc/calc_all.js'

function option (title, subtitle, link, result, labels, inputs, id) {
        const more_details_box = labels.map((el, index) => {
            const a = `<label class="text-tm-ifc">${el}</label><span class="input-value">${inputs[index] ? inputs[index] : '-'}</span>`
            return a
        })

        const option = `<div class="option" link="${link}" object-id="${id}">
            <img src="/images/icons/trash/trash.svg" class="trash img-tm-ifc">
            <div>
                <span class="title text-tm-ifc">${title}</span>${(subtitle !== title) ? `<span class="subtitle">${subtitle}</span>` : ''}
                <div class="result-container">
                ${more_details_box.join('')}
                <span class="result">= ${result[0]}</span>
                </div>
            </div>
            <img src="/images/icons/arrow/arrow.svg" class="arrow img-tm-ifc">
            </div>`
        return option
}

function click(link, id) {
    fetcher(link).then(() => {
        const data = userData.history.calc
        const inputs = document.querySelectorAll('#data_box_form .calc-input')
        const values = data.find(o => o._id === id).inputs
        const title = data.find(o => o._id === id).title
        const subtitle = data.find(o => o._id === id).subtitle

        inputs.forEach((input, index) => values[index] ? input.value = values[index] : '')
        calcAll(title, subtitle, ...values)
    })
}

const calcHistoryMenu = {
    create: function() {
        const icon = document.querySelector('.header .icon-box.user-history img')
        icon.addEventListener('click', () => icon.parentElement.classList.toggle('on'))
        const x = document.querySelector('#calc_history_menu .header .x')
        x.addEventListener('click', () => icon.parentElement.classList.toggle('on'))
        const list = document.querySelector('#calc_history_menu .list')
        if (userData.history.calc[0] === undefined) {
            list.insertAdjacentHTML('beforeend', `<span class="no-data">Sem histórico por enquanto :/</span>`)
            return
        } else {
            const a = document.querySelector('#calc_history_menu .list .no-data')
            if (a) a.remove()
        }
        userData.history.calc.forEach(el => {
            list.insertAdjacentHTML('beforeend', option(el.title, el.subtitle, el.link, el.result, el.labels, el.inputs, el._id))    
        })
        onEventElement('#calc_history_menu .list .option > div', (el) => {
            const link = el.parentElement.getAttribute('link')
            const id = el.parentElement.getAttribute('object-id')
            click(link, id)
        })
        onEventElement('#calc_history_menu .list .option > .trash', (el) => {
            const id = el.parentElement.getAttribute('object-id')
            calcHistoryMenu.remove(id)
        })
    }, 
    remove: function(id) {
        const selected = document.querySelector(`#calc_history_menu .list .option[object-id="${id}"]`)
        console.log(id)
        if (selected) {
            selected.remove()
            
            setUserData({ $pull: { "history.calc": { _id: id } } }).then(() => {
                if (userData.history.calc[0] === undefined) {
                    const list = document.querySelector('#calc_history_menu .list')
                    list.insertAdjacentHTML('beforeend', `<span class="no-data">Sem histórico por enquanto :/</span>`)
                } else {
                    const a = document.querySelector('#calc_history_menu .list .no-data')
                    if (a) a.remove()
                }
            })
        }
    }, 
    add: function(...data) {
        if (userData.history.calc[0] !== undefined) {
            const a = document.querySelector('#calc_history_menu .list .no-data')
            if (a) a.remove()
        }
        const list = document.querySelector('#calc_history_menu .list')
        
        list.insertAdjacentHTML('beforeend', option(...data))

        onEventElement('#calc_history_menu .list .option > div', (el) => {
            const link = el.parentElement.getAttribute('link')
            const id = el.parentElement.getAttribute('object-id')
            click(link, id)
        })
        onEventElement('#calc_history_menu .list .option > .trash', (el) => {
            const id = el.parentElement.getAttribute('object-id')
            calcHistoryMenu.remove(id)
        })
    }
}

export default calcHistoryMenu