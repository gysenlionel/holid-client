export const stringToDate = (dateString: string): { startDate: Date, endDate: Date } => {
  const datePart = JSON.parse(dateString).startDate.split("-");
  const startDate = new Date(
    `${datePart[2]}/${datePart[1]}/${datePart[0]}`
  );

  const datePartEnd = JSON.parse(dateString).endDate.split("-");
  const endDate = new Date(
    `${datePartEnd[2]}/${datePartEnd[1]}/${datePartEnd[0]}`
  );

  return { startDate, endDate }
}

export const stringToStartDate = (dateStr: any): Date => {
  const [day, month, year] = dateStr.split("-")
  return new Date(year, month - 1, day)

}