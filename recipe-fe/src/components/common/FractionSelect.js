import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

function FractionSelect({ decimalNum, amountChanged }) {
    const [wholeNum, setWholeNum] = useState(0);
    const [decNum, setDecNum] = useState("0");

    useEffect(() => {
        convertDecimal();
    }, []);

    const convertDecimal = () => {
        setWholeNum(Math.floor(decimalNum));
        setDecNum(decimalNum - Math.floor(decimalNum));
    }

    const updateWhole = (e) => {
        setWholeNum(e);
        console.log(e, decimalNum);
        amountChanged(parseFloat(e) + parseFloat(decNum));
    }

    const updateFraction = (e) => {
        setDecNum(e);
        amountChanged(parseFloat(wholeNum) + parseFloat(e));
    }

    return (
        <Col xs={3}>
            <Row>
                <Col>
                    <Form.Control 
                        type="number"
                        value={ wholeNum }
                        onChange={(e) => updateWhole(e.target.value)}>    
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Control 
                        as="select"
                        defaultValue={ decNum }
                        onChange={(e) => updateFraction(e.target.value)}> 
                        <option value="0"> </option>
                        <option value="0.25">1/4</option>
                        <option value="0.333">1/3</option>
                        <option value="0.5">1/2</option>
                        <option value="0.666">2/3</option>
                        <option value="0.75">3/4</option>
                    </Form.Control>
                </Col>
            </Row>
        </Col>
    )
}

export default FractionSelect
