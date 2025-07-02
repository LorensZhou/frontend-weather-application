
function windToBeaufortScale(windSpeedMetresPerSecond) {
    if (windSpeedMetresPerSecond < 0.2) {
        return 0; // Calm
    } else if (windSpeedMetresPerSecond < 1.5) {
        return 1; // Light air
    } else if (windSpeedMetresPerSecond < 3.3) {
        return 2; // Light breeze
    } else if (windSpeedMetresPerSecond < 5.4) {
        return 3; // Gentle breeze
    } else if (windSpeedMetresPerSecond < 7.9) {
        return 4; // Moderate breeze
    } else if (windSpeedMetresPerSecond < 10.7) {
        return 5; // Fresh breeze
    } else if (windSpeedMetresPerSecond < 13.8) {
        return 6; // Strong breeze
    } else if (windSpeedMetresPerSecond < 17.1) {
        return 7; // Near gale
    } else if (windSpeedMetresPerSecond < 20.7) {
        return 8; // Gale
    } else if (windSpeedMetresPerSecond <24.4) {
        return 9; // Strong gale
    } else if (windSpeedMetresPerSecond < 28.4) {
        return 10; // Storm
    } else if (windSpeedMetresPerSecond < 32.6) {
        return 11; // Violent storm
    } else {
        return 12; // Hurricane
    }
}

export default windToBeaufortScale;