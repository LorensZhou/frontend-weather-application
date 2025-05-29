import {useState}  from 'react';
import './CityDetailPage.css';
import {Link, useParams} from 'react-router-dom';
import cities from "../../constants/cities.js";
import axios from "axios";
import kelvinToCelcius from "../../helper/kelvinToCelcius.js";
import urlForWeatherIcon from "../../helper/urlForWeatherIcon.js";
import formatDutchTime   from "../../helper/formatDutchTime.js";
import Button from "../../components/button/Button.jsx";

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
            <Button  type="button"
                     onClick={fetchWeatherData}
                     variant="primary">
                ophalen weervoorspelling per uur
            </Button>
            {error && <p className="error">Er is iets misgegaan. Het is niet gelukt om de weervoorspellingen op te halen</p>}
            {loading && <p>Loading...</p>}

            <div className="header-forecast"><p>De stad is {name} met {inhabitants} inwoners</p></div>
            {forecasts.length > 0 &&
                <table className="forecast-table">
                    <thead>
                    <tr>
                        <th>Tijd</th>
                        <th>Weer</th>
                        <th>Temperatuur</th>
                        <th>Voelt als</th>
                        <th>Luchtvochtigheid</th>
                    </tr>
                    </thead>
                    <tbody>
                    {forecasts.map((forecast) => {
                        return (
                            <tr key={forecast.dt}>
                                <td>{formatDutchTime(forecast.dt)}</td>
                                <td className="weather-icon-td"><img className="weather-icon-style" src={urlForWeatherIcon(forecast.weather[0].icon)} alt="weer icon"/></td>
                                <td>{kelvinToCelcius(forecast.main.temp)}°C</td>
                                <td>{kelvinToCelcius(forecast.main.feels_like)}°C</td>
                                <td>{forecast.main.humidity}%</td>
                            </tr>);
                    })
                    }
                    </tbody>
                </table>
            }

            <Link to="/cities" className="back-link">
                <p>Terug naar de overzichtspagina</p>
            </Link>

        </div>
    );
}

export default CityDetailPage;