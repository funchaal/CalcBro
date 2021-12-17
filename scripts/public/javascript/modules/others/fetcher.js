import newPage from "../new_page/new_page.js"
import loadingBar from "./loading_bar.js"

export default function fetcher(link, onpopstate = false) {
    return new Promise(function(resolve, reject) {
        loadingBar.start()
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
                newPage()
            }, 200)
        })
        .then(() => loadingBar.finish())
        .then(() => resolve())
    })
}
