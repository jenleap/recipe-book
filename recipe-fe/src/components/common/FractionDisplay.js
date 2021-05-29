import React, { useEffect, useState } from 'react'

function FractionDisplay({ decimalNum }) {
    const [wholeNum, setWholeNum] = useState('');
    const [fraction, setFraction] = useState('');

    useEffect(() => {
        convertDecimalToFraction();
    })

    const convertDecimalToFraction = () => {
        const convertWhole = Math.floor(decimalNum);
        if (convertWhole > 0) {
            setWholeNum(convertWhole);
        } else {
            setWholeNum('');
        }

        const fracNum = decimalNum - convertWhole;

        switch(fracNum) {
            case 0.25:
                setFraction('1/4');
                break;
            case 0.33:
                setFraction('1/3');
                break;
            case 0.5:
                setFraction('1/2');
                break;
            case 0.66:
                setFraction('2/3');
                break;
            case 0.75:
                setFraction('3/4');
                break;
            default:
                setFraction('')
        }
    }

    return (
        <span>
            { wholeNum } { fraction }
        </span>
    )
}

export default FractionDisplay
