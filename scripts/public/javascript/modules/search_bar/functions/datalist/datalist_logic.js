import levenshtein from '../../../algorithms/levenshtein.js'
import searchBar from '../../search_bar.js'
import fetcher from '../../../others/fetcher.js'

const search_bar = document.getElementById('search_bar')
const datalist = document.getElementById('datalist')

let option_index = -1

search_bar.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp') e.preventDefault()
    else return
    
    const options = document.querySelectorAll('#datalist li span')
    if (!options.length) return
    
    const sel = document.querySelector('#datalist li span.on')

    if (e.code === 'ArrowUp') {
        sel && sel.classList.remove('on', 'by-key')
        option_index--
        if (option_index < 0) option_index = options.length - 1
        options[option_index].classList.add('on', 'by-key')
    } else if (e.code === 'ArrowDown') {
        sel && sel.classList.remove('on', 'by-key')
        option_index++
        if (option_index > options.length - 1) option_index = 0
        options[option_index].classList.add('on', 'by-key')
    }

    search_bar.value = options[option_index].textContent
    search_bar.setAttribute('temp', '')
})

function organizer(input) {
    const db_keys = Object.keys(linkDB)
    const db_normalized = db_keys.map((el) => el.toRaw__())
    
    let seq = []
    
    db_normalized.forEach((el, index) => {if (el.includes(input)) seq.push([levenshtein(input, el), index])})
    
    if (!seq.length) {
        db_normalized.forEach((el, index) => {seq.push([levenshtein(input, el), index])})
        seq = seq.filter((el) => db_keys[el[1]].length <= 6 ? el[0] <= 1 : el[0] <= 2)
    }
    
    if (!seq.length || seq.length <= 2) {
        const sub_db = []
        db_keys.forEach((el) => Object.keys(linkDB[el]).forEach((sub_el) => sub_db.push([el, sub_el.toRaw__()])))
        
        sub_db.forEach((val) => {
            if (val[1].includes(input)) seq.push([levenshtein(input, val[1]), db_keys.indexOf(val[0])])
        })
        
        if (!seq.length) {
            sub_db.forEach((val, index) => seq.push([levenshtein(input, val[1]), db_keys.indexOf(val[0])]))
            seq = seq.filter((val) => val[0] <= 3)
        }
    }
    
    seq.sort((a, b) => {
        if (a[0] > b[0]) return 1
        if (a[0] < b[0]) return -1
        return 0
    })

    seq = seq.map((val) => db_keys[val[1]])
    seq = Array.from((new Set(seq)))
    seq = seq.slice(0, 5)
    return seq
}

function createAlgorithm(data, type) {
    const options = []

    for (let i in data) {
        const link = linkDB[data[i]][Object.keys(linkDB[data[i]])[0]]
        const title = data[i]

        if (type === 'normal') {
            var option_str = `<li><img src="/images/icons/lupa/lupa.svg" alt=""><span class="option" link="${link}">${title}</span></li>`
        } else if (type === 'history') {
            var option_str = `<li class="history"><img src="/images/icons/trash/trash.svg" class="delete-icon" alt=""><span class="option history" link="${link}">${title}</span><img src="/images/icons/clock/clock.svg" alt=""><img src="/images/icons/lupa/lupa.svg" alt=""></li>`
        } else {
            throw new Error('não existe esse tipo')
        }

        options.push(option_str)

        if (i <= 1) {
            const sub_keys = Object.keys(linkDB[data[i]])
            const sub_options = []
            if (sub_keys.length >= 2) {
                sub_keys.forEach((el) => {
                    sub_options.push(`<button class="option" link="${linkDB[data[i]][el]}" type="button">${el}</button>`)
                })
            }
            options.push(`<li reference="${data[i]}" class="sub-option-container">${sub_options.join('')}</li>`)
        }
    }

    return options.join('')
}

export default function datalistLogic() {
    if (search_bar.value === '') {
        const localDB = localStorage.getItem('datalist_history')
        if (!localDB) {
            datalist.innerHTML = '<span class="no-data">Pesquise alguma coisa :)</span>'
        } else {
            const data = [...localDB.split(',')]

            const options = createAlgorithm(data, 'history')
            datalist.innerHTML = options
            
            onEventElement('#datalist li .delete-icon', (el) => {
                const reference = el.parentElement.querySelector('.option').textContent
                searchBar.datalist.historyManagement(reference, 'delete')
                searchBar.mediaManagement(true)
            })

        }
    } else {
        const options = createAlgorithm(organizer(search_bar.value.toRaw__()), 'normal')
        if (options) {
            datalist.innerHTML = options
        } else {
            datalist.innerHTML = '<span class="no-data">Sem correspondência.</span>'
        }
    }

    search_bar.removeAttribute('temp')

    option_index = -1

    onEventElement('#datalist .option', (el) => {
        const reference = el.parentElement.getAttribute('reference') || el.textContent
        const link = el.getAttribute('link')
        
        search_bar.value = reference
        fetcher(link)
        
        searchBar.mediaManagement(false)
        searchBar.datalist.historyManagement(reference)
    })

    onEventElement('#datalist li span', (el, index) => {
        const sel = document.querySelector('#datalist li span.on')
        sel && sel.classList.remove('on', 'by-key')

        el.classList.add('on')
        option_index = index
    }, 'mouseover')

    onEventElement('#datalist li span', (el, index) => {
        el.classList.remove('on')
        option_index = index
    }, 'mouseout')

}