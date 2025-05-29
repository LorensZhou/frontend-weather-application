
function formatDutchTime(posixTimestamp) {

    // POSIX timestamp is in seconden, Date gebruikt milliseconden
    const date = new Date(posixTimestamp * 1000);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const shortOptions = {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
    };
    const dutchDate = date.toLocaleDateString('nl-NL', shortOptions);
    const dutchTime = date.toLocaleTimeString('nl-NL', options);
    return `${dutchDate} ${dutchTime}`;
}

export default formatDutchTime;