import {useEffect, useState} from 'react';
import './CurrentWeather.css';
import SearchableInput from '../../components/searchableInput/SearchableInput';
import cities from '../../constants/cities.js';
import Button from '../../components/button/Button.jsx';
import sortedWithoutEmptyString from "../../helper/sortedWithoutEmptyString.js";
import findCityWeatherData from "../../helper/findCityWeatherData.js";
import ForecastTable from "../../components/forecastTable/ForecastTable.jsx";
import Loading from "../../components/loading/Loading.jsx";
import calcAvgCriteriaValue from "../../helper/calcAvgCriteriaValue.js";

function CurrentWeather() {
    const [searchMethod, setSearchMethod] = useState("");
    const [sortingDisabled, tglSortingDisabled] = useState(true);
    const [cityInputDisabled, tglCityInputDisabled] = useState(true);
    const [submitBtnDisabled, tglSubmitBtnDisabled] = useState(true);
    const [searchMethodDisabled, tglSearchMethodDisabled] = useState(false);
    const [newSearchBtnDisabled, tglNewSearchBtnDisabled] = useState(true);

    const [loading, tglLoading] = useState(false);
    const [cityData, setCityData] = useState([]);
    const [dataToDisplay, setDataToDisplay] = useState([]); // Data die we willen weergeven na het ophalen
    const [numbersOfHoursForecast, setNumbersOfHoursForecast] = useState(12); // Aantal uren voor de voorspelling
    const [errors, setErrors] = useState([]);
    const [criteria, setCriteria] = useState("temp");
    const [sortMethod, setSortMethod] = useState("lowToHigh");

    const cityNames = cities.map((city) => city.name);

    const [city1, setCity1] = useState("");
    const [city2, setCity2] = useState("");
    const [city3, setCity3] = useState("");
    const [city4, setCity4] = useState("");
    const [city5, setCity5] = useState("");
    const [city6, setCity6] = useState("");

    const handleSearch1 = (value) => setCity1(value);
    const handleSearch2 = (value) => setCity2(value);
    const handleSearch3 = (value) => setCity3(value);
    const handleSearch4 = (value) => setCity4(value);
    const handleSearch5 = (value) => setCity5(value);
    const handleSearch6 = (value) => setCity6(value);

    useEffect(() => {

        if (searchMethod === "without-sorting")
        {
            tglSortingDisabled(true);
            tglCityInputDisabled(false);
            tglSubmitBtnDisabled(false);
        }
        else if(searchMethod === "with-sorting")
        {
            tglSortingDisabled(false);
            tglCityInputDisabled(false);
            tglSubmitBtnDisabled(false);
        }
        else if (searchMethod === "")
        {
            tglSortingDisabled(true);
            tglCityInputDisabled(true);
            tglSubmitBtnDisabled(true);
        }

    }, [searchMethod]);

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

        tglSearchMethodDisabled(true);
        tglCityInputDisabled(true);
        tglSortingDisabled(true);
        tglSubmitBtnDisabled(true);

        tglNewSearchBtnDisabled(false);
    };

    useEffect(() => {
        //bepaal welke data weergeven aan de hand van searchMethod
        if (searchMethod === "without-sorting") {
            setDataToDisplay(cityData);
        } else if (searchMethod === "with-sorting") {
            const sortedCityData = [...cityData].sort((a, b) => {
                const avgA = calcAvgCriteriaValue(a.forecasts, criteria);
                const avgB = calcAvgCriteriaValue(b.forecasts, criteria);
                if (sortMethod === "lowToHigh") {
                    return avgA - avgB; // Laag naar hoog
                }
                else if (sortMethod === "highToLow") {
                    return avgB - avgA; // Hoog naar laag
                }
            });
            setDataToDisplay(sortedCityData);
        }
    }, [searchMethod, cityData, criteria, sortMethod]);

    function handleNewSearchBtnClick() {
        tglSearchMethodDisabled(false);
        if (searchMethod === "without-sorting") {
            tglCityInputDisabled(false);
            tglSortingDisabled(true);
            tglSubmitBtnDisabled(false);
        }
        else if (searchMethod === "with-sorting") {
            tglCityInputDisabled(false);
            tglSortingDisabled(false);
            tglSubmitBtnDisabled(false);
        }
    }

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
                    <label htmlFor="search-method">
                        zoek methode:
                    </label>
                    <select name="search"
                            id="search-method"
                            value={searchMethod}
                            disabled={searchMethodDisabled}
                            onChange={(e) => setSearchMethod(e.target.value)}>
                        <option value="">--kies een zoekmethode--</option>
                        <option value="without-sorting">zonder sortering op criteria's</option>
                        <option value="with-sorting">met sortering op criteria's</option>
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
                                <label htmlFor="criteria-selection" >
                                    Selecteer een sorteer weer-criteria:
                                </label>

                                <select name="criteria"
                                        id="criteria-selection"
                                        value={criteria}
                                        disabled={sortingDisabled}
                                        onChange={(e) => setCriteria(e.target.value)}>
                                    <option value="temp">temperatuur</option>
                                    <option value="feelsLikeTemp">gevoelstemperatuur</option>
                                    <option value="clouds">bewolking</option>
                                    <option value="windSpeed">windkracht</option>
                                    <option value="humidity">luchtvochtigheid</option>
                                </select>
                            </div>
                            <div className="search-criteria-wrapper">
                                <label htmlFor="sorting-field">sorteer methode:</label>

                                <select name="sorting"
                                        id="sorting-field"
                                        value={sortMethod}
                                        disabled={sortingDisabled}
                                        onChange={(e) => setSortMethod(e.target.value)}>
                                    <option value="lowToHigh">laag naar hoog</option>
                                    <option value="highToLow">hoog naar laag</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-button-flex">
                            <div className="form-button-inner-flex">
                                <div className="form-button-container">
                                    <Button
                                        type="button"
                                        className="secondary"
                                        disabled={newSearchBtnDisabled}
                                        onClick={handleNewSearchBtnClick}
                                    >Nieuwe Zoekactie
                                    </Button>
                                </div>
                                <div className="form-button-container">
                                    <Button
                                        type="submit"
                                        className="secondary"
                                        disabled={submitBtnDisabled}
                                    >Ophalen zoekresultaten
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>

                <section className="display-data-section">
                    {loading && <Loading loadingText="De gegevens worden opgehaald..."/>}
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

                    {dataToDisplay.length > 0 && (
                        <div className="city-data-container">
                            <h2>Opgehaalde gegevens:</h2>

                            {dataToDisplay.map((data) => (
                                <div key={data.name} className="city-data-item">
                                    <h3>{data.name}</h3>
                                    <ForecastTable
                                        forecasts = {data.forecasts}
                                        tglAverage={true}
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