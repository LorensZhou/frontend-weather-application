import {useEffect, useState} from 'react';
import './CurrentWeather.css';
import SearchableInput from '../../components/searchableInput/SearchableInput';
import cities from '../../constants/cities.js';
import Input from '../../components/input/Input.jsx';
import weatherCategories from '../../constants/weatherCategories.js';
import Button from '../../components/button/Button.jsx';
import sortedWithoutEmptyString from "../../helper/sortedWithoutEmptyString.js";
import findCityWeatherData from "../../helper/findCityWeatherData.js";
import ForecastTable from "../../components/forecastTable/ForecastTable.jsx";
import Loading from "../../components/loading/Loading.jsx";

function CurrentWeather() {
    const [searchMethod, setSearchMethod] = useState("");
    const [criteriaDisabled, tglCriteriaDisabled] = useState(true);
    const [cityInputDisabled, tglCityInputDisabled] = useState(true);
    const [formBtnDisabled, tglFormBtnDisabled] = useState(true);
    const [loading, tglLoading] = useState(false);
    const [allCitySearchTerms, setAllCitySearchTerms] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [numbersOfHoursForecast, setNumbersOfHoursForecast] = useState(5); // Aantal uren voor de voorspelling
    const [errors, setErrors] = useState([]);


    const cityNames = cities.map((city) => city.name);

    const [city1, setCity1] = useState("");
    const [city2, setCity2] = useState("");
    const [city3, setCity3] = useState("");
    const [city4, setCity4] = useState("");
    const [city5, setCity5] = useState("");
    const [city6, setCity6] = useState("");

    const [selectedWeather, setSelectedWeather] = useState('');
    const [preferredTemp, setPreferredTemp] = useState('');
    const [preferredWindSpeed, setPreferredWindSpeed] = useState('');

    const handleSearch1 = (value) => setCity1(value);
    const handleSearch2 = (value) => setCity2(value);
    const handleSearch3 = (value) => setCity3(value);
    const handleSearch4 = (value) => setCity4(value);
    const handleSearch5 = (value) => setCity5(value);
    const handleSearch6 = (value) => setCity6(value);

    const handleWeatherChange = (event) => setSelectedWeather(event.target.value);
    const handleTempChange = (event) => setPreferredTemp(event.target.value);
    const handleWindChange = (event) => setPreferredWindSpeed(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        const currentAllCitySearchTerms = [
            city1,
            city2,
            city3,
            city4,
            city5,
            city6,
        ];

        setAllCitySearchTerms(currentAllCitySearchTerms);
        console.log("All Search Terms:", allCitySearchTerms);

        tglLoading(true);
        setCityData([]);
        setErrors([]);

        const citiesWithValues = sortedWithoutEmptyString(currentAllCitySearchTerms);

        const promises = citiesWithValues.map(name => findCityWeatherData(name, numbersOfHoursForecast));

        //In de results worden alle promises opgeslagen, zowel de fulfilled als de rejected
        const results = await Promise.allSettled(promises);

        const fulfilledData = [];
        const rejectedErrors = [];

        results.forEach(result => {
            if (result.status === 'fulfilled') {
                fulfilledData.push(result.value); // Hier zit het object { name, geocode, forecasts }
            } else {
                // result.reason is nu het Error object dat we hebben gegooid
                const errorObject = result.reason;
                const cityName = errorObject.cityName || 'Onbekende stad'; //haal de stadsnaam uit de error
                const errorMessage = errorObject.message || 'Onbekende fout';
                rejectedErrors.push({name: cityName, message: errorMessage});
            }
        });

        setCityData(fulfilledData);
        setErrors(rejectedErrors);
        tglLoading(false);

        console.log("data succesvol:", fulfilledData);
        console.log("Errors:", rejectedErrors);
        console.log("results", results);

        tglCriteriaDisabled(true);
        tglCityInputDisabled(true);
        tglFormBtnDisabled(true);
        setSearchMethod("");

        // Reset the input velden voor de plaatsen
        setCity1("");
        setCity2("");
        setCity3("");
        setCity4("");
        setCity5("");
        setCity6("");
    };

    useEffect(() => {

        if (searchMethod === "without-location")
        {
            tglCriteriaDisabled(false);
            tglCityInputDisabled(true);
            tglFormBtnDisabled(false);
        }
        else if(searchMethod === "with-location")
        {
            tglCriteriaDisabled(false);
            tglCityInputDisabled(false);
            tglFormBtnDisabled(false);
        }
        else if (searchMethod === "")
        {
            tglCriteriaDisabled(true);
            tglCityInputDisabled(true);
            tglFormBtnDisabled(true);
        }

    }, [searchMethod]);

    return (
        <>
            <div className="current-weather-container">
                <section className="explanation-text-container">
                    <h1>Zoeken met huidige weer</h1>
                    <p>Hier kunt u zoeken met ingave van locatie of zonder ingave van locatie voor het weer van huidige moment.
                        U kunt maximaal 6 locaties opgeven. Als u zoekt zonder locatie, dan worden random 6 locaties voor u geselecteerd. U kunt alleen zoeken op locatie met meer dan 10.000 inwoners in Zuid-Holland.
                        Daarnaast kunt u minimaal een tot maximaal drie criteria's opgeven voor uw voorkeur van weer.</p>
                </section>

                <div className="search-method-container">
                    <select name="search" id="search-method" value={searchMethod} onChange={(e) => setSearchMethod(e.target.value)}>
                        <option value="">--kies een zoekmethode--</option>
                        <option value="without-location">zoeken zonder locatie</option>
                        <option value="with-location">zoeken met locatie</option>
                    </select>
                </div>
                
                <section className="search-section">
                    <form className="search-form-flex" onSubmit={handleSubmit}>
                        <div className="search-inputs-flex">
                            <div className="search-input-wrapper">
                                <SearchableInput
                                    items={cityNames}
                                    onSearch={handleSearch1}
                                    label="plaats 1"
                                    inputId="city1"
                                    inputName="city1"
                                    initialValue={city1}
                                    maxSuggestions={20}
                                    disabled={cityInputDisabled}
                                />
                            </div>
                            <div className="search-input-wrapper">
                                <SearchableInput
                                    items={cityNames}
                                    onSearch={handleSearch2}
                                    label="plaats 2"
                                    inputId="city2"
                                    inputName="city2"
                                    initialValue={city2}
                                    maxSuggestions={20}
                                    disabled={cityInputDisabled}
                                />
                            </div>
                            <div className="search-input-wrapper">
                                <SearchableInput
                                    items={cityNames}
                                    onSearch={handleSearch3}
                                    label="plaats 3"
                                    inputId="city3"
                                    inputName="city3"
                                    initialValue={city3}
                                    maxSuggestions={20}
                                    disabled={cityInputDisabled}
                                />
                            </div>
                            <div className="search-input-wrapper">
                                <SearchableInput
                                    items={cityNames}
                                    onSearch={handleSearch4}
                                    label="plaats 4"
                                    inputId="city4"
                                    inputName="city4"
                                    initialValue={city4}
                                    maxSuggestions={20}
                                    disabled={cityInputDisabled}
                                />
                            </div>
                            <div className="search-input-wrapper">
                                <SearchableInput
                                    items={cityNames}
                                    onSearch={handleSearch5}
                                    label="plaats 5"
                                    inputId="city5"
                                    inputName="city5"
                                    initialValue={city5}
                                    maxSuggestions={20}
                                    disabled={cityInputDisabled}
                                />
                            </div>
                            <div className="search-input-wrapper">
                                <SearchableInput
                                    items={cityNames}
                                    onSearch={handleSearch6}
                                    label="plaats 6"
                                    inputId="city6"
                                    inputName="city6"
                                    initialValue={city6}
                                    maxSuggestions={20}
                                    disabled={cityInputDisabled}
                                />
                            </div>
                        </div>
                        <div className="search-criteria-flex">
                            <div className="search-criteria-wrapper">
                                <label htmlFor="weatherSelection" className="weather-selection-container">
                                    Selecteer het weer:
                                </label>
                                <select
                                    id="weatherSelection"
                                    name="weather"
                                    value={selectedWeather}
                                    onChange={handleWeatherChange}
                                    disabled={criteriaDisabled}>
                                    <option value="">-- Selecteer een optie --</option>
                                    {weatherCategories.map((category, index) => (
                                        <option key={`${index}-${category}`} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className="search-criteria-wrapper">
                                <div className="temp-selection-container">
                                    <Input
                                        type="number"
                                        name="temperature"
                                        labelText="voorkeur temperatuur:"
                                        required={false}
                                        value={preferredTemp}
                                        handleChange={handleTempChange}
                                        disabled = {criteriaDisabled}/>
                                </div>
                            </div>
                            <div className="search-criteria-wrapper">
                                <Input
                                    type="number"
                                    name="weatherCriteria"
                                    labelText="voorkeur windkracht:"
                                    required={false}
                                    value={preferredWindSpeed}
                                    maxValue={12}
                                    minValue={0}
                                    handleChange={handleWindChange}
                                    disabled = {criteriaDisabled}/>
                            </div>

                        </div>
                        <Button
                            type="submit"
                            className="secundary"
                            disabled = {formBtnDisabled}
                        >Ophalen zoekresultaten
                        </Button>
                    </form>
                </section>

                <section className="display-data-section">
                    { loading && <Loading loadingText ="De gegevens worden opgehaald..."/>}
                    {errors.length > 0 && (
                        <div className="error-messages">
                            <h2>Fouten bij het ophalen van gegevens:</h2>
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error.name}: {error.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {cityData.length > 0 && (
                        <div className="city-data-container">
                            <h2>Opgehaalde gegevens:</h2>
                            {cityData.map((data, index) => (
                                <div key={index} className="city-data-item">
                                    <h3>{data.name}</h3>
                                    <ForecastTable
                                        forecasts = {data.forecasts}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

export default CurrentWeather;