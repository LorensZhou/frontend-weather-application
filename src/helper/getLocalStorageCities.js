

function getLocalStorageCities(allowedKeys){
    const resultObject = {};
    // Controleer of localStorage beschikbaar is (niet in server-side rendering bijv.)
    if (typeof localStorage === 'undefined') {
        console.warn("localStorage is niet beschikbaar. Kan items niet ophalen.");
        return resultObject; // Retourneer een leeg object als localStorage niet beschikbaar is
    }

    const allowedKeysSet = new Set(allowedKeys);

    //Alle properties van local storage langsgaan om de waarden van de cities op te halen corresponderen met de opgegeven keys
    for (let i = 0; i < localStorage.length; i++) {
        //de key is city1, city2, etc., de waarde van de key wordt gevuld met de naam van een stad
        const key = localStorage.key(i);
        if (allowedKeysSet.has(key)) {
            const stringValue = localStorage.getItem(key);
            // Controleer of de waarde niet null is (item bestaat)
            if (stringValue !== null) {
                    //we hoeven de stringValue niet te parsen als json,
                    // want we hebben alleen de naam van de stad nodig die is altijd een string
                    resultObject[key] = stringValue;
            }
        }
    }
    return resultObject;
}

export default getLocalStorageCities;
