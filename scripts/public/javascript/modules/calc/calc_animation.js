import resultBoxManagement from "../others/result_box_management.js"

const calcAnimation = {
    out: function() {
        const zzz = document.getElementById('zzz')
        const calc_result_content_container = document.getElementById('calc_result_content_container')
        zzz.style.opacity = '0'
        calc_result_content_container.style.opacity = '0'
    }, 
    in: function() {
        const zzz = document.getElementById('zzz')
        const calc_result_content_container = document.getElementById('calc_result_content_container')
        zzz.style.display = 'none'
        calc_result_content_container.style.display = 'flex'
        calc_result_content_container.style.opacity = '1'
        resultBoxManagement(true)
    }, 
    error: function() {
        let a = document.getElementById('data_box_form')
        let func_1 = () => {
            a.classList.remove('animate__animated', 'animate__headShake')
            a.removeEventListener('animationend', func_1)
        }
        a.classList.add('animate__animated', 'animate__headShake')
        a.addEventListener('animationend', func_1)
    }
}
export default calcAnimation