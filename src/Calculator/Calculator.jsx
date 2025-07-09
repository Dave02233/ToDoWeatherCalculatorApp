import styles from './Calculator.module.css';
import { useState } from 'react';

export default function Calculator () {

    const [visible, setVisible] = useState(false)

    const handleClickVisible = () => {
        setVisible(!visible);
    }

    return (
        <>
            {
                visible 
                ? <h1>Ecco la calcolatrice</h1>
                : <button className={styles.calculatorVisibleButton} onClick={handleClickVisible}>_</button>
            }
        </>
    )
}