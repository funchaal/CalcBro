import fetcher from "../../others/fetcher.js"
import searchBar from '../search_bar.js'

export default function searchBarInit() {
    const search_bar_form = document.getElementById('search_bar_form')
    const search_bar = document.getElementById('search_bar')
    const datalist = document.getElementById('datalist')

    const search_bar_x = document.querySelector('#search_bar_form > .x')
    const search_bar_icon = document.querySelector('header .icon-box.search-button img')
    const search_bar_arrow_back = document.querySelector('#search_bar_form .arrow-back')

    search_bar_icon.addEventListener('click', () => searchBar.mediaManagement(true))

    search_bar_arrow_back.addEventListener('click', () => searchBar.mediaManagement(false))

    search_bar.addEventListener('input', () => searchBar.datalist.logic())

    search_bar.addEventListener('focus', () => {
        if (!search_bar.hasAttribute('temp')) {
            searchBar.datalist.logic()
            search_bar.select()
        }
    })

    search_bar_form.addEventListener('submit', (e) => {
        e.preventDefault()
        const option = document.querySelector('#datalist .option.on.by-key') || document.querySelector('#datalist .option')
        if (!option) return
        search_bar.removeAttribute('temp')
        const link = option.getAttribute('link')
        const reference = option.textContent
        search_bar.value = reference
        searchBar.mediaManagement(false)
        fetcher(link)
        searchBar.datalist.historyManagement(reference)
    })

    datalist.addEventListener('click', (e) => {
        if (e.target.classList.contains('datalist')) searchBar.mediaManagement(true)
    })

    search_bar_x.addEventListener('click', () => {
        searchBar.mediaManagement(true)
        search_bar.value = ''
        searchBar.datalist.logic()
    })
}