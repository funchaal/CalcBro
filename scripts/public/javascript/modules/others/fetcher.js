import newPage from "../new_page/new_page.js"
import loadingBar from "./loading_bar.js"

let count = 0

export default function fetcher(link, onpopstate = false) {
    return new Promise(function(resolve, reject) {
        loadingBar.start()
        if (!onpopstate) history.pushState('', '', link)
        fetch(link)
        .then((response) => response.text())
        .then((html) => {
            const a = html.split('<main>')[1].split('</main>')[0]
            const main = document.querySelector('main')
            setTimeout(() => {
                main.innerHTML = a
                newPage()
                resolve(true)
            }, 200)
            loadingBar.finish()

            if (count === 0) {
                fetch('/statistics/MostAcessed', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }, 
                    method: 'POST', 
                    body: JSON.stringify({ link: link })
                })
                count++
            }
        })
        .catch((err) => console.log(err.message))
    })
}
