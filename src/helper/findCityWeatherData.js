import axios from "axios";

async function findCityWeatherData(name, numberHours) {
    try {
        const apiKey = "c8fd9b357dda6f6f42618f436f5686a7";
        const language = "nl";

        // Stap 1: Geocode ophalen
        const resultGeocodes = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${apiKey}`);

        const geocodeCity = resultGeocodes.data.find((resultGeocode) => {
            if (resultGeocode.country === "NL" ) {
                return true;
            }
            return false;
        });

        if (!geocodeCity) {
            //werp een custom error object met de stadsnaam
            const customError = new Error(`Geen geldige geocode gevonden voor "${name}" in NL`);
            customError.cityName = name; //voeg een extra property toe voor de stadsnaam
            throw customError;
        }

        //Stap 2: weer data ophalen
        const resultWeatherCity = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${geocodeCity.lat}&lon=${geocodeCity.lon}&appid=${apiKey}&lang=${language}`);

        // Retourneer een object met zowel de geocode als de weersvoorspellingen
        return {
            name: name,
            geocode: geocodeCity,
            forecasts: resultWeatherCity.data.list.slice(0, numberHours) // Eerste 10 uurlijkse voorspellingen
        };

    } catch (error) {
        console.error(`Fout bij het ophalen van data voor "${name}":`, error);
        //Als de error al onze custom error is, geef die door
        if(error.cityName){
            throw error;
        }
        else
        {
        // Anders, maak een nieuwe custom error van de onverwachte error
        const customError = new Error(error.message ? `${error.message} (Stad: ${name})` : `Onbekende fout voor stad: ${name}`);
        customError.cityName = name; //voeg de stadsnaam toe
        throw customError;
        }
    }
}

export default findCityWeatherData;
