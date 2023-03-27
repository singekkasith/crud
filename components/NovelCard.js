import * as React from 'react'
import { Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

function NovelCard(props) {
    const { title, datePublish, synopsis, author,  handleClick } = props;
    return (
        <Card bg ="dark" text = "white" style={{ width: '16.5rem' }}>
            <Card.Img variant="top" src="/addBg.webp"
                alt="Nice Background" /> 
            <Card.Body>
                <Card.Title>{title}  </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">         
                        Author: {author}
                </Card.Subtitle>
                <Card.Text>Synopsis: {synopsis} </Card.Text> 
                <Button variant="primary" href={handleClick}>View</Button>
            </Card.Body>
        </Card>
    )
}

export default NovelCard