export const dayDifference = (date1:Date,date2:Date):number =>{
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
}