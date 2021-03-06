import calcOption from '../calc_option.js';

export default function calcOptionBring() {
    const calc_option = document.getElementById('calc_option')
    const a = document.querySelector('#calc_option_mover .on')
    const b = calc_option.offsetWidth
    const c = screenMedia() ? a.offsetLeft - calc_offset : a.offsetLeft + calc_offset
    let d
    if (c + a.offsetWidth + 50 > b) {
        d = c - b + (a.offsetWidth) + (a.offsetWidth / 2)
        if (d < 0) return
    } else if (c - 50 < 0) {
        d = -c + (a.offsetWidth / 1.5)
        if (d < 0) return
        d = -d
    } else {
        d = 0
    }
    if (screenMedia()) {
        calcOption.scroll(null, d)
    } else {
        calcOption.translate(null, d)
    }
}