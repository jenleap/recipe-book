import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import RecipeItem from './partials/RecipeItem';
import Loader from './common/Loader';
import Message from './common/Message';

import { getRecipes } from '../actions/recipeActions';

function Home() {
    const dispatch = useDispatch();
    const recipeList = useSelector(state => state.recipeList);
    const { error, loading, recipes } = recipeList;

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    return (
        <div>
            <h1>Recent Recipes</h1>
            { loading ? <Loader />
                : error ? <Message variant="danger">{ error }</Message>
                    : 
                    <Row>
                        { recipes.map(r => (
                            <Col key={r.id} sm={12} m={6} lg={4} xl={3}>
                                <RecipeItem recipe={ r }/>
                            </Col>
                         ))}
                    </Row>
            }
        </div>
    )
}

export default Home
