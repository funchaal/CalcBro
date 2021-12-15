import NEW_PAGE_LOAD from "./new_page_load.js"
import { LOADING_BAR_START, LOADING_BAR_FINISH } from "./loading_bar.js"

export default function FETCHER(link, onpopstate = false) {
    return new Promise(function(resolve, reject) {
        LOADING_BAR_START()
        if (!onpopstate) history.pushState('', '', link)
        fetch(link)
        .then((response) => response.text())
        .then((html) => {
            const a = html.split('<main>')[1].split('</main>')[0]
            const main = document.querySelector('main')
            main.classList.add('off')
            setTimeout(() => {
                main.innerHTML = a
                main.classList.remove('off')
                NEW_PAGE_LOAD()
            }, 200)
        })
        .then(() => LOADING_BAR_FINISH())
        .then(() => resolve())
    })
}
