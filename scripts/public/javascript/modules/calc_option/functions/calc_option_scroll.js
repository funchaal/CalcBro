export default function calcOptionScroll(e, distance) {
    const calc_option = document.getElementById('calc_option')
    if (distance) calc_option.scrollLeft += distance
    calc_offset = calc_option.scrollLeft
}