import styles from './Calculator.module.css';
import { useState, useEffect } from 'react';

function Calculator ({ toggleVisibility }) {
    
    const [acc1, setAcc1] = useState([]);
    const [acc2, setAcc2] = useState(0);

    const handleClick = (num) => {
        if (num === '.' && acc1.includes('.')) return;
        setAcc1(prev => [...prev, num]);
    };

    const handleOperation = (type) => {
        const value = Number(acc1.join(''));
        
        if (!acc2) {
            setAcc2(value); 
            setAcc1([]);
            return;
        } 

        if (!isNaN(value)) {
        setAcc2(prev =>
            type === '+' ? prev + value : 
            type === '-' ? prev - value : 
            type === '*' ? prev * value : 
            type === '/' ? prev / value : prev
        );
        setAcc1([]);
        }
        
    };

    const handleCanc = () => {
        setAcc2(0)
    }


    return (
        <div className={styles.calculatorContainer}>
            <button className={styles.close} onClick={toggleVisibility}>Close</button>
            <button className={styles.delete} onClick={handleCanc}>Del</button>
            <input className={styles.acc1} type='text' value={acc2} disabled={true}/>
            <input type='text' value={acc1.join('')} disabled={true}/>
            <div className={styles.numbers}>
                {[1,2,3,4,5,6,7,8,9,0, '.'].map(num => <button onClick={() => handleClick(num)}>{num}</button>)}
            </div>
            <div className={styles.operators}>
                {['+', '-', '*', '/'].map(op => <button onClick={() => handleOperation(op)}>{op}</button>)}
            </div>
            
            
        </div>
    );
}

export default function CalculatorContainer () {

    const [visible, setVisible] = useState(false)

    const handleClickVisible = () => {
        setVisible(!visible);
    }

    return (
    <>
        {
            !visible ?

            <div className={styles.calculatorIconContainer}>
                <button className={styles.calculatorVisibleButton} onClick={handleClickVisible}>_</button>
            </div>
            
            : <Calculator toggleVisibility={handleClickVisible}/>
        }
        

    </>

    )
}

