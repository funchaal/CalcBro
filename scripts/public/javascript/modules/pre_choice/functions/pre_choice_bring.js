import preChoice from '../pre_choice.js'

export default function preChoiceBring() {
    const selected = document.querySelector('#pre_choice_mover .on')
    if (!selected) return
    const b = window.innerWidth
    const c = selected.getBoundingClientRect().left
    const d = selected.offsetWidth
    let e
    if (c + d + 100 > b) {
        e = c - b + (b / 4) + (d / 2)
        if (e < 0) return
    } else if (c - d - 100 < 0) {
        e = -c + (b / 4) + (d / 2)
        if (e < 0) return
        e = -e
    } else {
        return
    }
    preChoice.translate(null, e)            
} 