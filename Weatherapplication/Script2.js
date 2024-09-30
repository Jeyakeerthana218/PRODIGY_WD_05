const apiKey = '7d24fc3ca2572f40f0b9c806e68a8f5f'; // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    if (city === '') {
        alert('Please enter a city name');
    } else {
        getWeather(city);
    }
});

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7d24fc3ca2572f40f0b9c806e68a8f5f`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            alert('Error fetching data');
            console.error(error);
        });
}

function displayWeather(data) {
    // Show the weather result section
    document.getElementById('weather-result').style.display = 'block';

    // Update the HTML content with weather data
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}(\u00B0C)`;
// Append °C symbol
    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Construct the URL for the weather icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Set the weather icon source and display it
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src = iconUrl;
    weatherIcon.style.display = 'block';  // Make sure the icon is visible
}
