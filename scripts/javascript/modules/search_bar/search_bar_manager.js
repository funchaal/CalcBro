import SCREEN_MEDIA from "../screen_media.js"

const search_bar_form = document.getElementById('search_bar_form')
const search_bar = document.getElementById('search_bar')

export default function SEARCH_BAR_MANAGER_MEDIA(open) {
    if (SCREEN_MEDIA(849)) {
        if (open) {
            search_bar_form.style.display = 'flex'
            search_bar.focus()
        } else {
            search_bar_form.style.display = 'none'
            search_bar.blur()
        }
    } else {
        if (open) {
            search_bar.focus()
        } else {
            search_bar.blur()
        }
        search_bar_form.style.display = 'flex'
    }
}