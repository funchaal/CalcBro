import SCREEN_MEDIA from "./screen_media.js"

export default function RESULT_BOX_MANAGEMENT(open) {
    if (!SCREEN_MEDIA(849)) return
    const data_box_result = document.getElementById('data_box_result')
    if (open) {
        const background = document.createElement('div')

        background.id = 'data_box_result_full_background'
        background.addEventListener('mousedown', () => RESULT_BOX_MANAGEMENT(false))
        document.body.appendChild(background)
        
        data_box_result.classList.add('on')
        background.style.opacity = '100%'
    } else {
        const background_sel = document.getElementById('data_box_result_full_background')
        if (!background_sel) return

        data_box_result.classList.remove('on')
        data_box_result.scrollTop = 0

        background_sel.style.opacity = '0'
        setTimeout(() => background_sel.remove(), 200)
    }
}