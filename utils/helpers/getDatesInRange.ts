export const getDatesInRangeToSend = (startDate:Date,endDate:Date): number[] => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const date = new Date(start.getTime()) 
  
  let dates = []

  while(date <= end){
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate()+1)
  }

  return dates
}

export const getDatesInRangeToCheck = (startDate:Date,endDate:Date): number[] => {
    const start = transformUTC(startDate)
    const end = transformUTC(endDate)
    const date = new Date(start.getTime()) 
    
    let dates = []
  
    while(date <= end){
        dates.push(new Date(date).getTime())
        date.setDate(date.getDate()+1)
    }
  
    return dates
  }

  const transformUTC = ((date:Date):Date => {
      const newDate = new Date(date)
      let year = newDate.getFullYear();
      let month = newDate.getMonth();
      let day = newDate.getDate();
      let hours = newDate.getHours();
      let minutes = newDate.getMinutes();
      let seconds = newDate.getSeconds();

      // Creating a new date object with the adjusted UTC values
      let utcDate = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
      return utcDate
  })