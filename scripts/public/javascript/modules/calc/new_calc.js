import calcHistory from "../user/calc_history.js"

export default async function newCalc (title, subtitle, link, result, labels, inputs) {
    const obj = {
        title: title, 
        subtitle: subtitle, 
        link: link, 
        result: result, 
        labels: labels, 
        inputs: inputs
    }

    const data = User.userActivity.history.calc
    if (!data.some(el => equals__(Object.values(obj), Object.values(el).slice(0, Object.values(el).length - 1)))) calcHistory.add(obj)
}