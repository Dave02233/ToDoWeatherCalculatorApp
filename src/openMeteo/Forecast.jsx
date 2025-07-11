import { useEffect, useState } from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import fetchMeteoData from './openMeteo';
import style from './Forecast.module.css'

export default function Articles() {
    const { id } = useParams();
    const { toDoListItems } = useOutletContext();

    const [meteoData, setMeteoData] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        if (toDoListItems) {
            const item = toDoListItems.find((utente) => utente.id === id);
            if (item) {
                setSelectedData(item);
                fetchMeteoData(item.creationDate, item.expirationDate)
                    .then((result) => setMeteoData(result))
                    .catch(console.error);
            }
        }
    }, [id, toDoListItems]);

    if (!selectedData || !meteoData) {
        return <h2>Caricamento dati meteo...</h2>;
    }

    const scadenza = new Date(selectedData.expirationDate);

    if (scadenza < new Date()) {
        return <h2>Nessun dato disponibile</h2>;
    }

    return (
        <>
            <h6>Meteo per l'elemento con ID: {id}</h6>
            <Link to="/" className={style.closeButton}>CHIUDI</Link>
            <div className={style.forecastContainer}>
                {meteoData.time.map((time, index) => (
                    <div key={index}>
                        {
                            meteoData.precipitationProbabilityMax[index] > 25 ? 
                            <img src={`${import.meta.env.BASE_URL}Forecast/pioggia.png`} />
                            : meteoData.precipitationProbabilityMax[index] <= 25 && meteoData.precipitationProbabilityMax[index] > 5 ?
                            <img src={`${import.meta.env.BASE_URL}Forecast/nuvolo.png`} />
                            :<img src={`${import.meta.env.BASE_URL}Forecast/sole.png`} />
                        }
                        <h3>{time.toISOString().split('T')[0]}</h3>
                        <hr />
                        <h4>Max: {meteoData.temperature2mMax[index].toFixed(1)}°C</h4> 
                        <h4>Min: {meteoData.temperature2mMin[index].toFixed(1)}°C</h4>
                        <hr />
                        <h4>Pioggia: {meteoData.precipitationProbabilityMax[index]}%</h4>
                    </div>
                ))}
            </div>
        </>
    );
}
