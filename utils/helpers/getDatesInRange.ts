
export const getDatesInRange = (startDate:Date,endDate:Date) => {
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