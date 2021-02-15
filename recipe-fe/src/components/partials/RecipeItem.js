import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RecipeItem({ recipe }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/recipe/${ recipe.id }`}>
                <Card.Img src={ recipe.image } />
            </Link>
            <Card.Body>
                <Link to={`/recipe/${recipe.id}`}>
                    <Card.Title as='div'>
                        <strong>{ recipe.name }</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default RecipeItem
