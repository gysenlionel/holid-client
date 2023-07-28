export const includesTupleCountries = (
    countries: string[][],
    country: string
): string[] | null => {
    const found = countries.find((x) => x[0] == country);

    if (found) {
        return found;
    } else {
        return null;
    }
};