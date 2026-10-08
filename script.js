const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const displayDiv = document.getElementById('display');
const apiKey = '5769fa62db2dd7b90d91eae8209ad21a';

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const cityName = cityInput.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
    .then(response => {
        // response.ok is true if status is 200 (success), false if 404/500 (error)
        if (!response.ok) {
            throw new Error("City not found");
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the data for debugging
        displayDiv.innerHTML = `
            <p>Current temperature: ${data.main.temp}°C</p>
            <p>Feels like: ${data.main.feels_like}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
        `;
    })
    .catch(error => {
        // This catches any errors (network issues or city not found)
        displayDiv.innerHTML = `<p style="color: red;">${error.message}. Please try again!</p>`;
    });
});

