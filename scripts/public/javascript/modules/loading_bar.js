export const LOADING_BAR_START = function() {
    const container_sel = document.getElementById('loading_bar_container')
    if (container_sel) container_sel.remove()

    const header_sel = document.querySelector('header')
    const container = document.createElement('div')
    const bar = document.createElement('div')

    container.id = 'loading_bar_container'
    bar.id = 'loading_bar'
    
    container.appendChild(bar)
    header_sel.appendChild(container)
    
    bar.classList.add('in-progress')
}

export const LOADING_BAR_FINISH = function() {
    const container = document.getElementById('loading_bar_container')
    const bar = document.getElementById('loading_bar')
    
    bar.style.animationPlayState = 'paused'
    bar.classList.remove('in-progress')
    bar.style.transitionDuration = '0ms'
    bar.style.width = bar.offsetWidth + 'px'
    bar.style.transitionDuration = '300ms'
    
    setTimeout(() => bar.style.width = '100%', 10)
    setTimeout(() => bar.style.opacity = '0', 410)
    setTimeout(() => container.remove(), 710)
}