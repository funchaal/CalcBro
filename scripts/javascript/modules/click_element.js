export default function CLICK_ELEMENT(selector, callback) {
    document.querySelectorAll(selector).forEach((element) => {
        element.onclick = () => {
            if (callback) {
                Promise.resolve(callback(element))
                                .then(() => CLICK_ELEMENT(selector, callback))
            }
        }
    })
}