const compact = <T>(array: (T | undefined | null)[] | undefined): T[] => {
 return (array?.filter(Boolean) as T[]) ?? []
}

export default compact