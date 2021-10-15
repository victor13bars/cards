export const trueDate = (str) => {
    console.log(str)
    let [date, time] = str.split('T')
    date = date.split('-').reverse().join('.')
    time = time.slice(0, 8)
    str = date + ' - ' + time
    return str
}