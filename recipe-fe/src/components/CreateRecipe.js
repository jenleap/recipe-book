import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';


import { createRecipe } from '../actions/recipeActions';
import FoodSelector from './common/FoodSelector';

function CreateRecipe({ history }) {
    const [foodSelector, showFoodSelector] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [servings, setServings] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {

        } else {
            history.push('/');
        }
    }, [ dispatch, userInfo, history ]);

    const addIngredient = (food) => {
        setIngredients([
            ...ingredients,
            food
        ]);
        console.log(food);
    }

    const convertIngredients = () => {
        return ingredients.map(i => {
            return {
                'foodId': i.id,
                'amount': i.amount
            }
        });
    }

    const createRecipeHandler = (e) => {
        e.preventDefault();

        const recipe = {
            'name': name,
            'description': description,
            'servings': servings,
            'ingredients': convertIngredients()
        };

        console.log("sending recipe", recipe);
        // history.push(`/recipes/${id}`);
    }

    return (
        <div>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ex: Chocolate Cupcakes"
                                onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                onChange={(e) => setDescription(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Servings</Form.Label>
                            <Form.Control 
                                type="number" 
                                onChange={(e) => setServings(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.File label="Recipe photo" />
                        </Form.Group>

                        <h3>Ingredients <span onClick={() => showFoodSelector(true)}><i className="fas fa-plus ml-5"></i></span></h3>
                            <ListGroup>
                                { (ingredients) ? (ingredients.map(i => (
                                    <ListGroup.Item key={i.id}>
                                        <p className="text-lowercase">{ i.amount } { i.measure } { i.name }</p>
                                    </ListGroup.Item>
                                ))) : null}
                            </ListGroup>

                        { (foodSelector) ? <FoodSelector selectFood={addIngredient} /> : null }
                        

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
