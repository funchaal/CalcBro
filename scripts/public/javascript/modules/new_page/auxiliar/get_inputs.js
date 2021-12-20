export default function getInputs() {
    const inputs = []
    document.querySelectorAll('.calc-input').forEach((el) => {
        if (el.getAttribute('type') === 'checkbox') {
            inputs.push(el.checked)
        } else if (el.getAttribute('type') === 'number') {
            inputs.push(Number(el.value))
        } else {
            inputs.push(el.value)
        }
    })
    return inputs
}