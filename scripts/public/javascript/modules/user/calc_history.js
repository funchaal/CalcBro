import fetcher from '../others/fetcher.js'
import calcAll from '../calc/calc_all.js'

const no_data = '<span class="no-data text-tm-ifc">Sem histórico por enquanto :/</span>'

function newOption (title, subtitle, link, result, labels, inputs, id) {
        const more_details_box = labels.map((el, index) => {
            const a = `
            <label class="text-tm-ifc">${el}</label>
            <span class="input-value">${inputs[index] ? inputs[index] : '-'}</span>
            `
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

const calcHistory = {
    create: async function() {
        calcHistory.icon_box = document.querySelector('.header .icon-box.calc-history')
        calcHistory.icon = document.querySelector('.header .icon-box.calc-history img')
        calcHistory.x = document.querySelector('#calc_history_menu .header .x')
        calcHistory.list = document.querySelector('#calc_history_menu .list')

        const data = User.userActivity.history.calc

        data.forEach(o => calcHistory.list.insertAdjacentHTML('beforeend', calcHistory.newOption(o.title, o.subtitle, o.link, o.result, o.labels, o.inputs, o._id)))
        
        calcHistory.icon.addEventListener('click', () => calcHistory.toggle())
        calcHistory.x.addEventListener('click', () => calcHistory.close())

        !calcHistory.list.hasChildNodes() && calcHistory.list.insertAdjacentHTML('beforeend', no_data)
        
        onEventElement('#calc_history_menu .list .option > div', (el) => {
            const id = el.parentElement.getAttribute('object-id')
            const link = el.parentElement.getAttribute('link')
            calcHistory.close()
            calcHistory.goTo(id, link)
        })
        
        onEventElement('#calc_history_menu .list .option > .trash', (el) => {
            const id = el.parentElement.getAttribute('object-id')
            calcHistory.remove(id)
        })
    }, 
    remove: async function(id) {
        const selected = document.querySelector(`#calc_history_menu .list .option[object-id="${id}"]`)
        if (selected) {
            selected.remove()
            !calcHistory.list.hasChildNodes() && calcHistory.list.insertAdjacentHTML('beforeend', no_data)
            await setUserActivity({ $pull: { "history.calc": { _id: id } } })
        }
    }, 
    add: async function(body) {
        const a = document.querySelector('#calc_history_menu .list .no-data')
        a && a.remove()
        
        await setUserActivity({ $push: { "history.calc": body } })
        const data = User.userActivity.history.calc.at(-1)
        const array = [data.title, data.subtitle, data.link, data.result, data.labels, data.inputs, data._id]
        
        calcHistory.list.insertAdjacentHTML('beforeend', calcHistory.newOption(...array))
        
        onEventElement('#calc_history_menu .list .option:last-child > div', (el) => {
            const id = el.parentElement.getAttribute('object-id')
            const link = el.parentElement.getAttribute('link')
            calcHistory.close()
            calcHistory.goTo(id, link)
        })
        onEventElement('#calc_history_menu .list .option:last-child > .trash', (el) => {
            const id = el.parentElement.getAttribute('object-id')
            calcHistory.remove(id)
        })
    }, 
    newOption: function(title, subtitle, link, result, labels, inputs, id) {
        const more_details_box = labels.map((el, index) => `<label class="text-tm-ifc">${el}</label><span class="input-value">${inputs[index] ? inputs[index] : '-'}</span>`).join('')
        const option = `<div class="option" link="${link}" object-id="${id}">
            <img src="/images/icons/trash/trash.svg" class="trash img-tm-ifc">
            <div>
                <span class="title text-tm-ifc">${title}</span>${(subtitle !== title) ? `<span class="subtitle">${subtitle}</span>` : ''}
                <div class="result-container">
                ${more_details_box}
                <span class="result">= ${result[0]}</span>
                </div>
            </div>
            <img src="/images/icons/arrow/arrow.svg" class="arrow img-tm-ifc">
        </div>`
        return option
    }, 
    goTo: function(id, link) {
            fetcher(link).then(() => {
                const data = User.userActivity.history.calc
                const inputs = document.querySelectorAll('#data_box_form .calc-input')
        
                const obj =  data.find(o => o._id === id)
                const values = obj.inputs
                const title = obj.title
                const subtitle = obj.subtitle
        
                inputs.forEach((input, index) => values[index] ? input.value = values[index] : '')
                calcAll(title, subtitle, ...values)
            })
    }, 
    open: function() {
        calcHistory.icon_box.classList.add('on')
    }, 
    close: function() {
        calcHistory.icon_box.classList.remove('on')
    }, 
    toggle: function() {
        calcHistory.icon_box.classList.toggle('on')
    }, 
    delete: function() {
        calcHistory.close()
        setTimeout(() => calcHistory.icon_box.remove(), 500)
    }
}

export default calcHistory