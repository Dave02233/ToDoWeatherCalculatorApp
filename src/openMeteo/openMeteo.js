async function getLocationAndTImezone() {

    try{
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const timezone = position.
            })
    }catch(e){
        console.error()
    }

}


export async function fetchMeteoData(latitude, longitude, timezone, forecast) {

    timezone = encodeURIComponent(timezone);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&timezone=${timezone}&forecast_days=${forecast}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();  
        console.log(data);
        return data;
    } catch (error) {
        console.error("Errore durante il fetch dei dati meteo:", error);
    }

}

fetchMeteoData(45.6183, 9.2025, 'Europe/Berlin', 2);
