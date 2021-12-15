const complementar_functions = {
    isEven: function isEven(num) {
        return !(num % 2)
    }, 
    isOdd: function isOdd(num) {
        return !!(num % 2)
    }, 
    isNumeric: function isNumeric(...num) {
        return !isNaN(this) || !isNaN(Number(this))
    }, 
    isFloat: function isInt(num) {
        return !(Number(num)) === num && num % 1 === 0
    }, 
    isInt: function isInt(num) {
        return !(Number(num)) === num && num % 1 !== 0
    }
}

export default complementar_functions