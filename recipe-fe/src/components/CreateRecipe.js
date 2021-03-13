import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form, Card } from 'react-bootstrap';

import { createRecipe } from '../actions/recipeActions';
import FoodSelector from './partials/FoodSelector';
import FractionDisplay from '../components/common/FractionDisplay';

function CreateRecipe({ history }) {
    const [foodSelector, showFoodSelector] = useState(false);
    const [stepCreator, showStepCreator] = useState(false);
    const [activeStep, setActiveStep] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [servings, setServings] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [image, setImage] = useState(undefined);
    const [imagePreview, setImagePreview] = useState(undefined);

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {

        } else {
            history.push('/');
        }
    }, [ userInfo, history ]);

    const addIngredient = (food) => {
        setIngredients([
            ...ingredients,
            food
        ]);
        //showFoodSelector(false);
    }

    const convertIngredients = () => {
        return ingredients.map(i => {
            return {
                'foodId': i.id,
                'amount': parseFloat(i.amount)
            }
        });
    }

    const addStep = () => {
        setSteps([
            ...steps,
            {
                description: activeStep,
                order: steps.length + 1
            }
        ]);
        setActiveStep('');
    }

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const createRecipeHandler = (e) => {
        e.preventDefault();

        const recipe = {
            'name': name,
            'description': description,
            'servings': parseInt(servings),
            'ingredients': convertIngredients(),
            'steps': steps
        };

        const data = new FormData();
        data.append("recipe", JSON.stringify(recipe))

        if (image) {
            data.append("image", image);
        }

        dispatch(createRecipe(data));
        console.log("sending recipe", data);
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

                        { (imagePreview) ? <img src={imagePreview} className="w-25" /> : null }

                        <Form.Group className="mt-3">
                            <Form.File 
                                label="Recipe photo"
                                id="image-file"
                                custom
                                onChange={uploadFileHandler} />
                        </Form.Group>

                        <h3>Ingredients <span onClick={() => showFoodSelector(true)}><i className="fas fa-plus ml-5"></i></span></h3>
                            <ListGroup>
                                { (ingredients) ? (ingredients.map(i => (
                                    <ListGroup.Item key={i.id}>
                                        <p className="text-lowercase">
                                            <FractionDisplay decimalNum={i.amount} />
                                            &nbsp; { i.measure } { i.name }</p>
                                    </ListGroup.Item>
                                ))) : null}
                            </ListGroup>

                        { (foodSelector) ? <FoodSelector selectFood={addIngredient} /> : null }

                        <h3>Steps <span onClick={() => showStepCreator(true)}><i className="fas fa-plus ml-5"></i></span></h3>
                            <ListGroup>
                                { (steps) ? (steps.map(s => (
                                    <ListGroup.Item key={s.order}>
                                        <p>{s.order}. { s.description }</p>
                                    </ListGroup.Item>
                                ))) : null}
                            </ListGroup>

                        { (stepCreator) ? (
                            <Card className="p-2 mt-3 mb-3">
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control 
                                            type="text"
                                            value={ activeStep }
                                            onChange={(e) => setActiveStep(e.target.value)}>    
                                        </Form.Control>
                                    </Col>
                                    <Button variant="primary" className="mr-4" onClick={addStep}>Add</Button>
                                </Row>
                            </Card>
                        ) : null }
                        

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
