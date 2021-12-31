export default function resultBoxManagement(open) {
    if (!screenMedia(849)) return
    const data_box_result = document.getElementById('data_box_result')
    if (!data_box_result) return
    if (data_box_result.getAttribute('type') !== 'hide') return
    if (open) {
        const background = document.createElement('div')

        background.id = 'data_box_result_full_background'
        
        document.body.appendChild(background)

        background.addEventListener('mousedown', () => resultBoxManagement(false))
        
        data_box_result.classList.add('on')
        setTimeout(() => background.classList.add('on'))
    } else {
        const background = document.getElementById('data_box_result_full_background')
        if (!background) return

        data_box_result.scrollTo(0, 0)

        data_box_result.classList.remove('on')
        background.classList.remove('on')

        setTimeout(() => background.remove(), 400)
    }
}