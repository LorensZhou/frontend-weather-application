import kelvinToCelcius from "./kelvinToCelcius.js";
import windToBeaufortScale from "./windToBeaufortScale.js";

function calcAvgCriteriaValue(forecasts, criteria) {
    if (!forecasts || forecasts.length === 0) {
        return 0;
    }

    let totalValue=0;
    switch (criteria) {
        case "temp":
            totalValue = forecasts.reduce((sum, forecast) => sum + kelvinToCelcius(forecast.main.temp), 0);
            break;
        case "clouds":
            totalValue = forecasts.reduce((sum, forecast) => sum + forecast.clouds.all, 0);
            break;
        case "windSpeed":
            totalValue = forecasts.reduce((sum, forecast) => sum + windToBeaufortScale(forecast.wind.speed), 0);
            break;
        case "humidity":
            totalValue = forecasts.reduce((sum, forecast) => sum + forecast.main.humidity, 0);
            break;
        case "feelsLikeTemp":
            totalValue = forecasts.reduce((sum, forecast) => sum + kelvinToCelcius(forecast.main.feels_like), 0);
            break;
    }

    return totalValue / forecasts.length;
}

export default calcAvgCriteriaValue;
