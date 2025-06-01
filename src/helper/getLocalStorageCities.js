

function getLocalStorageCities(allowedKeys){
    const resultObject = {};
    // Controleer of localStorage beschikbaar is (niet in server-side rendering bijv.)
    if (typeof localStorage === 'undefined') {
        console.warn("localStorage is niet beschikbaar. Kan items niet ophalen.");
        return resultObject; // Retourneer een leeg object als localStorage niet beschikbaar is
    }

    const allowedKeysSet = new Set(allowedKeys);

    //Alle properties van local storage langsgaan om de waarden van de cities op te halen
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (allowedKeysSet.has(key)) {
            const stringValue = localStorage.getItem(key);
            // Controleer of de waarde niet null is (item bestaat)
            if (stringValue !== null) {
                try {
                    // Probeer te parsen, maar vang fouten op (bijv. als het geen JSON is)
                    const parsedValue = JSON.parse(stringValue);
                    resultObject[key] = parsedValue;
                } catch (error) {
                    // Als parsen mislukt, sla de ruwe string op
                    console.warn(`Kon de waarde voor sleutel "${key}" niet parsen als JSON. Opslaan als ruwe string.`, error);
                    resultObject[key] = stringValue;
                }
            }
        }
    }
    return resultObject;
}

export default getLocalStorageCities;
