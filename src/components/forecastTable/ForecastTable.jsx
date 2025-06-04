
import React from 'react';
import './ForecastTable.css';
import kelvinToCelcius from '../../helper/kelvinToCelcius.js';
import urlForWeatherIcon from '../../helper/urlForWeatherIcon.js';
import formatDutchTime from '../../helper/formatDutchTime.js';
import windToBeaufortScale from "../../helper/windToBeaufortScale.js";

function ForecastTable({ forecasts }) {
    if (!forecasts || forecasts.length === 0) {
        return <p>Geen weersvoorspellingen beschikbaar.
            Druk op de button om weersvoorspellingen op te halen</p>
    }
    else if (forecasts.length > 0) {
        return (
            <table className="forecast-table">
                <thead>
                <tr>
                    <th>Tijd</th>
                    <th>Weer</th>
                    <th>Temperatuur</th>
                    <th>Voelt als</th>
                    <th>Luchtvochtigheid</th>
                    <th>Windkracht</th>
                </tr>
                </thead>
                <tbody>
                {forecasts.map((forecast) => (
                    <tr key={forecast.dt}>
                        <td>{formatDutchTime(forecast.dt)}</td>
                        <td className="weather-icon-td">
                            <img
                                className="weather-icon-style"
                                src={urlForWeatherIcon(forecast.weather[0].icon)}
                                alt="weer icon"
                            />
                        </td>
                        <td>{kelvinToCelcius(forecast.main.temp)}°C</td>
                        <td>{kelvinToCelcius(forecast.main.feels_like)}°C</td>
                        <td>{forecast.main.humidity}%</td>
                        <td>{windToBeaufortScale(forecast.wind.speed)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}

export default ForecastTable;