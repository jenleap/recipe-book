import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

import FractionDisplay from '../common/FractionDisplay';
import FractionSelect from '../common/FractionSelect';

import { getFoods, clearFoodsList } from '../../actions/foodActions';

function FoodSelector({ selectFood }) {
    const [selectedFood, setFood] = useState(undefined);
    const [query, setQuery] = useState('');

    const dispatch = useDispatch();
    const foodsList = useSelector(state => state.foodsList);
    const { loading, error, foods } = foodsList;

    const chooseFood = (food) => {
        setFood(food);
        dispatch(clearFoodsList()); 
    }

    const updateFood = (amount) => {
        selectedFood.amount = amount;
        console.log(amount);
    }

    const addFood = () => {
        selectFood(selectedFood);
        setFood(undefined);
    }

    const searchFoods = () => {
        dispatch(getFoods(query)); 
    }

    return (
        <Card className="p-2 mt-3 mb-3">
            {(selectedFood) ? (
                <Row>
                    <FractionSelect 
                        decimalNum={ selectedFood.amount }
                        amountChanged={updateFood}
                    />
                    <Col>
                        <Row className="justify-content-between">
                            <span className="mt-1 text-lowercase"> {selectedFood.measure} {selectedFood.name} </span>
                            <Button variant="primary" className="mr-4" onClick={addFood}>Add</Button>
                        </Row>
                    </Col>
                </Row>
            ) : (
                <Col>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control 
                                type="text"
                                value={ query }
                                onChange={(e) => setQuery(e.target.value)}>    
                            </Form.Control>
                        </Col>
                        <Button variant="primary" onClick={searchFoods}><i className="fas fa-search"></i></Button>
                    </Row>
                    { (foods) ? 
                    <Col>
                        { foods.map(f => (
                            <Row key={f.id}>
                                <span className="text-lowercase" onClick={() => chooseFood(f)}>
                                    <FractionDisplay decimalNum={f.amount} />
                                    &nbsp; { f.measure } { f.name }</span>
                            </Row>
                        ))}
                    </Col>
                 : null}
                </Col>
            )}
        </Card>
    )
}

export default FoodSelector
