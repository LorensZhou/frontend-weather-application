

function sortedWithoutEmptyString(arrayCityNames) {
    //alle dubbele waarden eruit filteren
    const filteredCityNames = [...new Set(arrayCityNames)];
    // New array with filtered values, with no null, undefined, or empty strings
    let filteredNoEmptyString = filteredCityNames.filter(function (e) {
        return e; // Returns only the truthy values
    });
    return filteredNoEmptyString.sort((a, b) => a.localeCompare(b));
}

export default sortedWithoutEmptyString;