import { change_offset } from "../new_calc_content.js"

export default function CALC_OPTION_SCROLL(e, distance) {
    const calc_option = document.getElementById('calc_option')
    if (distance) calc_option.scrollLeft += distance
    change_offset(calc_option.scrollLeft)
}