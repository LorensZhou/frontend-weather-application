import kelvinToCelcius from './kelvinToCelcius.js';
import windToBeaufortScale from './windToBeaufortScale.js';

function calcAvgCriteriaValue(forecasts, criteria, tglDailySearch) {
    if (!forecasts || forecasts.length === 0) {
        return 0;
    }

    let totalValue=0;
    switch (criteria) {
        case "temp":
            if (tglDailySearch) {
                totalValue = forecasts.reduce((sum, forecast) => sum + kelvinToCelcius(forecast.temp.day), 0);
            } else {
                totalValue = forecasts.reduce((sum, forecast) => sum + kelvinToCelcius(forecast.main.temp), 0);
            }
            break;
        case "clouds":
            if (tglDailySearch) {
                totalValue = forecasts.reduce((sum, forecast) => sum + forecast.clouds, 0);
            } else {
                totalValue = forecasts.reduce((sum, forecast) => sum + forecast.clouds.all, 0);
            }
            break;
        case "windSpeed":
            if (tglDailySearch) {
                totalValue = forecasts.reduce((sum, forecast) => sum + windToBeaufortScale(forecast.speed), 0);
            } else{
                totalValue = forecasts.reduce((sum, forecast) => sum + windToBeaufortScale(forecast.wind.speed), 0);
            }
            break;
        case "humidity":
            if (tglDailySearch) {
                totalValue = forecasts.reduce((sum, forecast) => sum + forecast.humidity, 0);
            } else {
                totalValue = forecasts.reduce((sum, forecast) => sum + forecast.main.humidity, 0);
            }
            break;
        case "feelsLikeTemp":
            if (tglDailySearch) {
                totalValue = forecasts.reduce((sum, forecast) => sum + kelvinToCelcius(forecast.feels_like.day), 0);
            } else {
                totalValue = forecasts.reduce((sum, forecast) => sum + kelvinToCelcius(forecast.main.feels_like), 0);
            }
            break;
    }

    return totalValue / forecasts.length;
}

export default calcAvgCriteriaValue;
