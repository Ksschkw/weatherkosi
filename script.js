const WEATHER = "f38d23efd7154af9aa1162039252603"
async function searchWeather(city = null) {
    const cityInput = city || document.getElementById('cityInput').value;
    if (!cityInput) return;

    try {
        // Fetch current weather + 3-day forecast
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER}&q=${cityInput}&days=3`
        );
        const data = await response.json();

        updateUI(data);
    } catch (error) {
        alert('City not found!');
    }
}

function updateUI(data) {
    // Current Weather
    document.getElementById('currentWeather').innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <div class="weather-main">
            <img src="${data.current.condition.icon}">
            <div>
                <p class="neon">${data.current.temp_c}°C</p>
                <p>${data.current.condition.text}</p>
            </div>
        </div>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind: ${data.current.wind_kph} km/h</p>
    `;

    // 3-Day Forecast
    document.getElementById('forecast').innerHTML = data.forecast.forecastday.map(day => `
        <div class="forecast-day">
            <p>${new Date(day.date).toLocaleDateString('en', {weekday: 'short'})}</p>
            <img src="${day.day.condition.icon}">
            <p>${day.day.maxtemp_c}°C</p>
            <p>${day.day.condition.text}</p>
        </div>
    `).join('');
}

// Initial load for default city (Lagos)
searchWeather('Lagos');