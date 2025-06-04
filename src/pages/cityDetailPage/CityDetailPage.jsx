import {React, useState}  from 'react';
import './CityDetailPage.css';
import {Link, useParams} from 'react-router-dom';
import cities from "../../constants/cities.js";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";
import Loading from "../../components/loading/Loading.jsx";
import ForecastTable from "../../components/forecastTable/ForecastTable.jsx";

function CityDetailPage() {
    const {id} = useParams();
    const [forecasts, setForecasts] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const {name, inhabitants} = cities.find((city) => {
        return city.number.toString() === id;
    });

    const fetchWeatherData = async () => {
        try{
            toggleError(false);
            toggleLoading(true);
            const language = "nl";

            const resultGeocodes =
                await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${import.meta.env.VITE_API_KEY}`);
            const geocodeCity = resultGeocodes.data.find((resultGeocode)=>{
                if(resultGeocode.country === "NL" || resultGeocode.country === "GB" || resultGeocode.country === "IT"){
                    return true;
                }
                return false;
            });
            console.log(`lat waarde = ${geocodeCity.lat} en lon waarde = ${geocodeCity.lon}`);

            const resultWeatherCity =
                await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${geocodeCity.lat}&lon=${geocodeCity.lon}&appid=${import.meta.env.VITE_API_KEY}&lang=${language}`)
            console.log(resultWeatherCity.data.list);
            setForecasts(resultWeatherCity.data.list.slice(0, 9));
        }
        catch (error) {
            console.error("Error fetching weather data:", error);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <div>
            <div className="button-container">
                <Button  type="button"
                         onClick={fetchWeatherData}
                         variant="primary">
                    ophalen weervoorspelling per uur
                </Button>
            </div>
            {error && <ErrorMessage
                message="Het is niet gelukt om de weervoorspellingen op te halen"/>}
            {loading && <Loading
                loadingText="De weervoorspellingen worden opgehaald..."/>}

            <div className="header-forecast"><p>De stad is {name} met {inhabitants} inwoners</p></div>

            {/*de voorspellingen worden weergegeven in een tabel*/}
            <ForecastTable
                forecasts={forecasts}
            />

            <Link to="/cities" className="back-link">
                <p>Terug naar de overzichtspagina</p>
            </Link>

        </div>
    );
}

export default CityDetailPage;