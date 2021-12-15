import SCREEN_MEDIA from "../screen_media.js"
import CALC_OPTION_TRANSLATE from "./calc_option_translate.js"
import CALC_OPTION_SCROLL from "./calc_option_scroll.js"
import { calc_offset } from "../new_calc_content.js"

export default function CALC_OPTION_BRING() {
    const calc_option = document.getElementById('calc_option')
    const a = document.querySelector('#calc_option .on')
    const b = calc_option.offsetWidth
    const c = SCREEN_MEDIA() ? a.offsetLeft - calc_offset : a.offsetLeft + calc_offset
    let d
    if (c + a.offsetWidth + 50 > b) {
        d = c - b + a.offsetWidth + 80
        if (d < 0) return
    } else if (c - 50 < 0) {
        d = -c + a.offsetWidth + 10
        if (d < 0) return
        d = -d
    } else {
        d = 0
    }
    if (SCREEN_MEDIA()) {
        CALC_OPTION_SCROLL(null, d)
    } else {
        CALC_OPTION_TRANSLATE(null, d)
    }
}