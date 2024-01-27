const apiKey = "b593159dca6f0e8b5ac1ef3be469e616";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const Tashkent = "Tashkent";
const HTTP_200 = 200;

const cityNameInputElement = document.getElementById("city-input-txt");
const weatherIconImgElement = document.getElementById("weather-icon-img");


// By default country is Tashkent
getWeatherData(Tashkent);

cityNameInputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let cityName = cityNameInputElement.value
        getWeatherData(cityName);
        cityNameInputElement.value = ''
    }
})

document.getElementById("search-btn").addEventListener("click", () => {
    let cityName = cityNameInputElement.value
    getWeatherData(cityName);
    cityNameInputElement.value = ''
})

async function getWeatherData(cityName) {
    let response = await fetch(apiUrl + `&q=${cityName}&appid=${apiKey}`);

    if (response.status === HTTP_200) {
        // Removing error attributes
        document.getElementById("error-msg-txt").style.display = "none";
        cityNameInputElement.classList.remove("error");

        let responseBody = await response.json();
        document.getElementById("temperature-h3").innerHTML = responseBody.main.temp.toFixed(1) + "&deg;C";
        document.getElementById("city-name-txt").innerHTML = responseBody.name;
        document.getElementById("humidity-value").innerHTML = responseBody.main.humidity + "%";
        document.getElementById("wind-value").innerHTML = responseBody.wind.speed.toFixed(1) + " km/h";
        updateWeatherImage(responseBody.weather[0].main);
    }
    else {
        // HTTP 404 especially
        document.getElementById("error-msg-txt").style.display = "block";
        cityNameInputElement.classList.add("error");
    }
}

async function updateWeatherImage(main) {
    if (main === "Clouds") {
        weatherIconImgElement.src = "images/clouds.png";
    }
    else if (main === "Clear") {
        weatherIconImgElement.src = "images/clear.png";
    }
    else if (main === "Drizzle") {
        weatherIconImgElement.src = "images/drizzle.png";
    }
    else if (main === "Rain") {
        weatherIconImgElement.src = "images/rain.png";
    }
    else if (main === "Snow") {
        weatherIconImgElement.src = "images/snow.png";
    }
    else if (main === "Mist") {
        weatherIconImgElement.src = "images/mist.png";
    }
}
