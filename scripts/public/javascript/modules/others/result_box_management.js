export default function resultBoxManagement(open) {
    if (!screenMedia(849)) return
    const data_box_result = document.getElementById('data_box_result')
    if (!data_box_result) return
    if (open) {
        const background = document.createElement('div')

        background.id = 'data_box_result_full_background'
        background.addEventListener('mousedown', () => resultBoxManagement(false))
        document.body.appendChild(background)
        
        data_box_result.classList.add('on')
        background.style.opacity = '100%'
        background.style.visibility = 'visible'
    } else {
        const background_sel = document.getElementById('data_box_result_full_background')
        if (!background_sel) return

        data_box_result.classList.remove('on')
        data_box_result.scrollTop = 0

        background_sel.style.opacity = '0'
        setTimeout(() => background_sel.remove(), 400)
    }
}