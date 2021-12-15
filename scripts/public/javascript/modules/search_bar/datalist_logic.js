import levenshtein from '../levenshtein.js'
import CLICK_ELEMENT from '../click_element.js'
import SEARCH_BAR_MANAGEMENT from './search_bar_manager.js'
import DATALIST_HISTORY_MANAGEMENT from './datalist_history_management.js'
import FETCHER from '../fetcher.js'

const search_bar = document.getElementById('search_bar')
const datalist = document.getElementById('datalist')

function ORGANIZER(input, db) {
    let sequence = []
    const db_keys = Object.keys(db)
    const string = input
    const db_normalized = db_keys.map((el) => el.toRaw__())
    
    db_normalized.forEach((el, index) => {if (el.includes(string)) sequence.push([levenshtein(string, el), index])})
    
    if (!sequence.length) {
        db_normalized.forEach((el, index) => {sequence.push([levenshtein(string, el), index])})
        sequence = sequence.filter((el) => db_keys[el[1]].length <= 6 ? el[0] <= 1 : el[0] <= 2)
    }
    
    if (!sequence.length || sequence.length <= 2) {
        const sub_db = []
        db_keys.forEach((el) => Object.keys(db[el]).forEach((sub_el) => sub_db.push([el, sub_el.toRaw__()])))
        
        sub_db.forEach((val) => {
            if (val[1].includes(string)) sequence.push([levenshtein(string, val[1]), db_keys.indexOf(val[0])])
        })
        
        if (!sequence.length) {
            sub_db.forEach((val, index) => sequence.push([levenshtein(string, val[1]), db_keys.indexOf(val[0])]))
            sequence = sequence.filter((val) => val[0] <= 3)
        }
    }
    
    sequence.sort((a, b) => {
        if (a[0] > b[0]) return 1
        if (a[0] < b[0]) return -1
        return 0
    })

    sequence = sequence.map((val) => db_keys[val[1]])
    sequence = Array.from((new Set(sequence)))
    sequence = sequence.slice(0, 5)
    return sequence
}

export default function DATALIST_LOGIC(db) {
    if (!db) throw new Error('no database inserted')
    const string = search_bar.value.toRaw__()
    if (string === '') {
        let data = localStorage.getItem('datalist_history')
        if (!data) {
            datalist.innerHTML = '<span class="no-results">zzz</span>'
            return
        }
        data = data.includes(',') ? data.split(',') : [data]
        let a = data
        var options = []
        for (let i in a) {
            options.push(`<li class="history"><img src="/images/icons/clock/clock.svg" alt=""><img src="/images/icons/lupa/lupa.svg" alt=""><img src="/images/icons/trash/trash.svg" class="delete-icon" alt=""><span class="option history" link="${db[a[i]][Object.keys(db[a[i]])[0]]}">${a[i]}</span></li>`)
            if (i <= 1) {
                let b = Object.keys(db[a[i]])
                let d = ''
                if (b.length >= 2) {
                    b.forEach((element) => {
                        d = d.concat(`<button class="option" link="${db[a[i]][element]}" type="button">${element}</button>`)
                    })
                }
                options.push(`<li reference="${a[i]}" class="sub-option">${d}</li>`)
            }
        }
        options = options.join('')
        datalist.innerHTML = options
        document.querySelectorAll('#datalist li .delete-icon').forEach((el) => {
            el.addEventListener('click', (e) => {
                const reference = e.target.nextElementSibling.textContent
                DATALIST_HISTORY_MANAGEMENT(reference, 'delete')
                SEARCH_BAR_MANAGEMENT(true)
            })
        })
    } else {
        const a = ORGANIZER(string, db)
        var options = []
        for (let i in a) {
            options.push(`<li><img src="/images/icons/lupa/lupa.svg" alt=""><span class="option" link="${db[a[i]][Object.keys(db[a[i]])[0]]}">${a[i]}</span></li>`)
            if (i <= 1) {
                let b = Object.keys(db[a[i]])
                let d = ''
                if (b.length >= 2) {
                    b.forEach((element) => {
                        d = d.concat(`<button class="option" link="${db[a[i]][element]}" type="button">${element}</button>`)
                    })
                }
                options.push(`<li reference="${a[i]}" class="sub-option">${d}</li>`)
            }
        }
        options = options.join('')
        if(options) {
            datalist.innerHTML = options
        } else {
            datalist.innerHTML = '<span class="no-results">Sem correspondência.</span>'
        }
    }
    CLICK_ELEMENT('#datalist .option', (element) => {
        const reference = element.parentElement.getAttribute('reference') || element.textContent
        const link = element.getAttribute('link')
        search_bar.value = reference
        FETCHER(link)
        SEARCH_BAR_MANAGEMENT(false)
        DATALIST_HISTORY_MANAGEMENT(reference)
    })
}