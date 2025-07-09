import styles from './Calculator.module.css';
import { useState, useEffect } from 'react';

function Calculator ({ toggleVisibility }) {
    
    const [acc1, setAcc1] = useState(0);
    const [acc2, setAcc2] = useState(0);
    const [result, setResult] = useState(0);

    useEffect( () => {
        setResult(acc1 + acc2);
        console.log('render')
    }, [acc1])

    const handleClick1 = () => {
        setAcc1(prev => {
            prev.toString() += 1
        })
    }


    return (
        <>
            <button onClick={toggleVisibility}>Close</button>
            <input disabled={true} value={result} />
            <br />
            <button onClick={handleClick1}>1</button>
        </>
    );
}

export default function CalculatorContainer () {

    const [visible, setVisible] = useState(false)

    const handleClickVisible = () => {
        setVisible(!visible);
    }

    return (
        <div className={styles.calculatorContainer}>
            {
                visible 
                ? <Calculator toggleVisibility={handleClickVisible}/>
                : <button className={styles.calculatorVisibleButton} onClick={handleClickVisible}>_</button>
            }
        </div>
    )
}

