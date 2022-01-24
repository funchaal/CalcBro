export default function fill() {
    document.querySelectorAll('[user-data]').forEach(el => {
        const attr = el.getAttribute('user-data')
        const data = attr === 'fullname' ? `${User.name} ${User.lastname}` : User[attr]
        if (el.tagName === 'SPAN') el.textContent = data
        else if (el.tagName === 'INPUT') el.value = data
        else if (el.tagName === 'IMG') el.src = data || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    })
}