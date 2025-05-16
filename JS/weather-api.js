
        // Jouw OpenWeatherMap API Key
        const apiKey = 'f8b61a17841c5c39fa7aca06e0e9be37';

        const weatherContainer = document.getElementById("weather-container");
        const errorDisplay = document.getElementById('error');

        const units = 'metric'; // Gebruik metrische eenheden
        const lang = 'nl'; // Taal instellen op Nederlands

        // Coördinaten voor Lier, Vlaanderen, België
        const lierLatitude = 51.1333;
        const lierLongitude = 4.5667;

        async function fetchCurrentWeatherForLier() {
            try {
                weatherContainer.innerHTML = '';
                errorDisplay.innerHTML = '';

                // Bouw de API URL voor de huidige weersomstandigheden
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lierLatitude}&lon=${lierLongitude}&appid=${apiKey}&units=${units}&lang=${lang}`;

                const response = await fetch(apiUrl);
                const data = await response.json();

                // Toon een foutmelding als er een probleem is met de API-aanvraag
                if (data.cod != 200) {
                    errorDisplay.innerHTML = `Fout bij het ophalen van de weergegevens: ${data.message}`;
                    console.error('OpenWeatherMap API Fout:', data);
                    return;
                }

                let weatherInfoHTML = `
                    <div class="weather-info">Plaats: ${data.name}, ${data.sys.country}</div>
                    <div class="weather-info">Temperatuur: ${Math.round(data.main.temp)} °C</div>
                    <div class="weather-info">Beschrijving: ${data.weather[0].description}</div>
                    <div class="weather-info">Luchtvochtigheid: ${data.main.humidity}%</div>
                `;

                if (data.main.pressure) {
                    weatherInfoHTML += `<div class="weather-info">Luchtdruk (zeeniveau): ${data.main.pressure} hPa</div>`;
                }
                if (data.main.grnd_level) {
                    weatherInfoHTML += `<div class="weather-info">Luchtdruk (grondniveau): ${data.main.grnd_level} hPa</div>`;
                }

                weatherContainer.innerHTML = weatherInfoHTML;

            } catch (error) {
                errorDisplay.innerHTML = `Er is een fout opgetreden bij het ophalen van de weergegevens.`;
                console.error("Fetch fout:", error);
            }
        }

        // Roep de functie aan om de huidige weerinformatie voor Lier op te halen wanneer de pagina laadt
        fetchCurrentWeatherForLier();
