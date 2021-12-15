export default function DATALIST_HISTORY_MANAGEMENT(reference, method = 'add') {
    const data = localStorage.getItem('datalist_history')
    const current_datalist_history = data ? (data.includes(',') ? data.split(',') : [data]) : []
    if (method === 'add') {
        const new_datalist_history = reference
        current_datalist_history.unshift(new_datalist_history)
        var end_data = Array.from(new Set(current_datalist_history))
        if (end_data.length > 6) end_data.pop()
    } else if (method === 'delete') {
        var end_data = current_datalist_history.filter((el) => el !== reference)
    }
    end_data = end_data.join(',')
    localStorage.setItem('datalist_history', end_data)
}