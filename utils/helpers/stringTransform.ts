export const capitalizeFirstLetter = (string: string):string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const capitalizeFirstLetterInWord = (string: string):string => {
    return string.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}


