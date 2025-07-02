
import React from 'react';
import './ForecastTable.css';
import kelvinToCelcius from '../../helper/kelvinToCelcius.js';
import urlForWeatherIcon from '../../helper/urlForWeatherIcon.js';
import formatDutchTime from '../../helper/formatDutchTime.js';
import windToBeaufortScale from "../../helper/windToBeaufortScale.js";
import calcAvgCriteriaValue from "../../helper/calcAvgCriteriaValue.js";
import dutchNumberFormat from "../../helper/dutchNumberFormat.js";

function ForecastTable({ forecasts, tglAverage }) {
    const averageClouds=dutchNumberFormat(calcAvgCriteriaValue(forecasts, "clouds"));
    const averageTemp= dutchNumberFormat(calcAvgCriteriaValue(forecasts, "temp"));
    const averageHumidity= dutchNumberFormat(calcAvgCriteriaValue(forecasts, "humidity"));
    const averageWindSpeedBeaufort= dutchNumberFormat(calcAvgCriteriaValue(forecasts, "windSpeed"));
    const averageFeelsLikeTemp= dutchNumberFormat(calcAvgCriteriaValue(forecasts, "feelsLikeTemp"));

    if (!forecasts || forecasts.length === 0) {
        return <p>Geen weersvoorspellingen beschikbaar.
            Druk op de button om weersvoorspellingen op te halen</p>
    } else if (forecasts.length > 0) {
        return (
            <table className="forecast-table">
                <thead>
                <tr>
                    <th>Tijd</th>
                    <th>Weer</th>
                    <th>Omschrijving</th>
                    <th>Bewolking</th>
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
                        <td>{forecast.weather[0].description}</td>
                        <td>{forecast.clouds.all}%</td>
                        <td>{kelvinToCelcius(forecast.main.temp)}°C</td>
                        <td>{kelvinToCelcius(forecast.main.feels_like)}°C</td>
                        <td>{forecast.main.humidity}%</td>
                        <td>{windToBeaufortScale(forecast.wind.speed)}</td>
                    </tr>
                ))}

                {/* rij weergeven voor de waarden van gemiddelden */}
                {tglAverage && <tr className="average-row">
                        <td>Gemiddeld</td>
                        <td></td>
                        <td></td>
                        <td>{averageClouds}%</td>
                        <td>{averageTemp}°C</td>
                        <td>{averageFeelsLikeTemp}°C</td>
                        <td>{averageHumidity}%</td>
                        <td>{averageWindSpeedBeaufort}</td>
                </tr>
                }
                </tbody>
            </table>
        );
    }
}

export default ForecastTable;