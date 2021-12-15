const theme_switch = document.getElementById('theme_switch')

export default function THEME_CHANGER(theme) {
    const a = document.querySelector('[theme]')
    const b = theme || theme_switch.checked ? 'dark' : 'light'
    if (theme) {
        a.setAttribute('theme', b)
        if (theme === 'dark') theme_switch.checked = true
        else if (theme === 'light') theme_switch.checked = false
    } else {
        a.setAttribute('theme', b)
    }
}