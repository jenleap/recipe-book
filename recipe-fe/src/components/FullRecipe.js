import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Table } from 'react-bootstrap';

import Loader from '../components/common/Loader';
import Message from '../components/common/Message';

import { getRecipe } from '../actions/recipeActions';

function FullRecipe({ match }) {
    const dispatch = useDispatch();
    const recipeDetails = useSelector(state => state.recipeDetails);
    const { loading, error, recipe } = recipeDetails;

    useEffect(() => {
       dispatch(getRecipe(match.params.id))
    }, [ dispatch, match ]);

    return (
        <div>
            { loading ? <Loader />
                : error ? <Message variant="danger">{ error }</Message>
                    :
                    <Row>
                        <Col md={6}>
                            <Card>
                                <Card.Header>{ recipe.name }</Card.Header>
                                <Card.Img src={ recipe.image } className="rounded-0" />
                                <Card.Body>{ recipe.description }</Card.Body>
                            </Card>
                            <Table>
                                <thead>
                                    <tr>Per serving</tr>
                                </thead>
                                <tbody>
                                    { Object.keys(recipe.nutri_info).map(key => (
                                        <tr>
                                            <td>{ key }</td>
                                            <td>{ recipe.nutri_info[key] }</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        <Col md={6}>
                            <h3>Ingredients</h3>
                            <ListGroup>
                                { recipe.ingredients.map(i => (
                                    <ListGroup.Item>
                                        <p>{ i.amount } { i.food.measure } { i.food.name }</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
            }
        </div>
    )
}

export default FullRecipe
