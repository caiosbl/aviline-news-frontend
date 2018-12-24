import React, { Component } from 'react';
import {Card,CardImg,CardImgOverlay,CardTitle,CardText} from 'reactstrap';



class CardSpotlightNews extends Component {

    render() {

     return(
        <Card inverse>
        <CardImg width="100%" src="https://www.avisite.com.br/imgnoticiashome/frangos_atual2.gif" alt="Card image cap" />
        <CardImgOverlay>
            <CardTitle>Card Title</CardTitle>
            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
            <CardText>
                <small className="text-muted">Last updated 3 mins ago</small>
            </CardText>
        </CardImgOverlay>
    </Card>);
    }
}

export default CardSpotlightNews;
