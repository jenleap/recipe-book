import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RecipeItem({ recipe }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/recipe/${ recipe.id }`}>
                {
                    (recipe.image) ? 
                        <Card.Img src={ recipe.image } /> : 
                        <span><i class="fas fa-utensils"></i></span>
                }
            </Link>
            <Card.Body>
                <Link to={`/recipes/${recipe.id}`}>
                    <Card.Title as='div'>
                        <strong>{ recipe.name }</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default RecipeItem
