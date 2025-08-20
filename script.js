document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "3e889fd6c639ae123c1e94496783f3de";
    const cityinput = document.getElementById("city-input");
    let defaultcities = ["Bengaluru", "Mumbai", "Delhi", "Chennai", "Jammu","Udupi"];
    const weatherContainer = document.getElementById("weatherContainer");
    const loading = document.getElementById("loading");
    const errorMessage =document.getElementById("error");
    
    let allweatherData = [];
    cityinput.addEventListener("keyup", async (e) => {
        weatherContainer.innerHTML = "";
        const city = e.target.value.trim().toLowerCase();
        if (city === "") {
            loaddefaultcities();
            return;
        }
             const data = await fetchWeather(city);
        if (data) {
            // weatherContainer.innerHTML = "";
            displayWeather(data);
            
             }
    });

    async function fetchWeather(city) {
        try {
        
            loading.textContent = "Loading data...";
            errorMessage.textContent = "";
         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            loading.textContent = "";
            return data;
        }
        catch (error) {
            loading.textContent = "";
            // weatherContainer.innerHTML = "";
            errorMessage.textContent = error.message;
        }
        
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <h1>${name}</h1>
        <p>${main.temp}°C</p>
        <p>${weather[0].description}`;
        weatherContainer.appendChild(card);
    };
    
    async function loaddefaultcities() {
        weatherContainer.innerHTML = "";
        for (let city of defaultcities) {
            const data = await fetchWeather(city);
            if (data) displayWeather(data);
        }
        
    }
    loaddefaultcities();
})