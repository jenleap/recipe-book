import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';

import { getFoods } from '../actions/foodActions';

function CreateRecipe({ history }) {
    const dispatch = useDispatch();
    const foodsList = useSelector(state => state.foodsList);
    const { loading, error, foods } = foodsList;

    useEffect(() => {
       dispatch(getFoods())
    }, [ dispatch ]);

    const createRecipeHandler = () => {
        console.log("sending recipe");
        // history.push(`/recipes/${id}`);
        console.log(foods);
    }

    return (
        <div>
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control type="text" placeholder="Ex: Chocolate Cupcakes" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Servings</Form.Label>
                            <Form.Control type="number" />
                        </Form.Group>

                        <Form.Group>
                            <Form.File id="exampleFormControlFile1" label="Recipe photo" />
                        </Form.Group>

                        <Button 
                            variant="primary"
                            type="button"
                            onClick={ createRecipeHandler }>
                            Create Recipe
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default CreateRecipe
