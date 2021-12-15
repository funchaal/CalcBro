export default function WRITE_ON_CLIPBOARD(content) {
    return new Promise(function (resolve, reject) {
        if (!content) {
            reject(new Error('empty'))
            return
        }
        navigator.clipboard.writeText(content)
            .then(() => resolve())
            .catch((err) => reject(err))
    })
}