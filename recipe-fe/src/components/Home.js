import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import RecipeItem from './partials/RecipeItem';
import Loader from './common/Loader';
import Message from './common/Message';
import Paginate from './common/Paginate';

import { getRecipes } from '../actions/recipeActions';

function Home() {
    const dispatch = useDispatch();
    const recipeList = useSelector(state => state.recipeList);
    const { error, loading, recipes, page, totalPages } = recipeList;

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    const searchRecipes = (selectedPage = 1) => {
        dispatch(getRecipes('', selectedPage));
    }

    return (
        <div>
            <h1>Recent Recipes</h1>
            { loading ? <Loader />
                : error ? <Message variant="danger">{ error }</Message>
                    : 
                    <div>
                        <Row>
                            { recipes.map(r => (
                                <Col key={r.id} sm={12} m={6} lg={4} xl={3}>
                                    <RecipeItem recipe={ r }/>
                                </Col>
                            ))}
                            
                        </Row>
                        <Row>
                            <Paginate 
                                totalPages={totalPages}
                                page={page}
                                itemCall={searchRecipes}
                            />
                        </Row>
                    </div>
            }
        </div>
    )
}

export default Home
