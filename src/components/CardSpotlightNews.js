import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, Badge, CardText } from 'reactstrap';
import Spinner from './Spinner';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import '../styles/CardSpotlightNews.css';



class CardSpotlightNews extends Component {


    constructor(props) {
        super(props);
        this.state = {
            position: props.position,
            load: true,
            data: props.data

        };
    }


    getData(that) {


        const data = that.state.data;
        
        const position = that.state.position;

        if (!(data.length < position))
            that.setState({ data: data[position - 1], load: false });

    }

    render() {
            
        this.state.load && this.getData(this);
        const data = this.state.data;

        return (

            (this.state.load) ? <Spinner /> :
                <Link to={"/news/" + data.slug} id="link">
                    <Card inverse id="Card">
                        <CardImg width="100%" height="220" src={data.image.url}
                            alt="Card image cap" style={{ opacity: 0.5 }} />
                        <CardImgOverlay>
                            {data.categories[0] !== undefined &&
                                <CardText>
                                    <Badge color="danger" id="badge"><h6>{data.categories[0].name}</h6></Badge>
                                </CardText>}
                            <CardText id='CardTitle'>
                                <h4 style={{ fontSize: '400' }}>{data.title}</h4>
                            </CardText>
                        </CardImgOverlay>
                    </Card>
                </Link>);
    }
}

export default CardSpotlightNews;
