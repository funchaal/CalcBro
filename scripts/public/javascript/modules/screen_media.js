export default function SCREEN_MEDIA(size = 499) {
    if (window.innerWidth <= size) return true
    else return false
}