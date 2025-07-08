import { fetchWeatherApi } from "openmeteo";

export async function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                reject({
                    latitude: 45.6,
                    longitude: 9.2
                });
            }
        );
    });
}


export default async function fetchMeteoData(creationDate, endDate) {

    const position = await getLocation();
    
    
    const start = new Date(creationDate);
    let end = new Date(endDate);
    const now = new Date();

    const maxEnd = new Date(now);
    maxEnd.setDate(maxEnd.getDate() + 14);

    if (end > maxEnd) {
        end = maxEnd;
    }

    const params = {
        "latitude": position.latitude,
        "longitude": position.longitude,
        "daily": ["temperature_2m_max", "temperature_2m_min", "precipitation_probability_max"],
        "start_date": now.toISOString().split("T")[0],
        "end_date": end.toISOString().split("T")[0]
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const daily = response.daily();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        daily: {
            time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature2mMax: daily.variables(0).valuesArray(),
            temperature2mMin: daily.variables(1).valuesArray(),
            precipitationProbabilityMax: daily.variables(2).valuesArray(),
        },
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    /*
    for (let i = 0; i < weatherData.daily.time.length; i++) {
        console.log(
            weatherData.daily.time[i].toISOString(),
            weatherData.daily.temperature2mMax[i],
            weatherData.daily.temperature2mMin[i],
            weatherData.daily.precipitationProbabilityMax[i]
        );
    }
    */

    console.log(weatherData.daily)

    return weatherData.daily;
}


//fetchMeteoData(45.6183, 9.2025, 'Europe/Berlin', 2);
