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
            notFound: false,
            data: ''

        };
    }


    async getData(that) {

        fetch(`http://aviline.herokuapp.com/api/post`)
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                res.length < that.state.position ? that.setState({ notFound: true, load: false }) :

                    that.setState({ data: res[that.state.position - 1], load: false });
            });

    }

    render() {

        this.state.load &&
            this.getData(this);

        const data = this.state.data;

        return (

            (this.state.load || this.state.notFound) ? <Spinner /> :
                <Link to={"/news/" + data.slug} id="link">
                    <Card inverse id="Card">



                        <CardImg width="100%" height="220" src={data.image.url}
                            alt="Card image cap" style={{ opacity: 0.5 }} />
                        <CardImgOverlay>
                            {data.categories[0] !== undefined &&
                                <CardText>
                                    <Badge color="danger" id="badge"><h5>{data.categories[0].name}</h5></Badge>
                                </CardText>}
                            <CardText id='CardTitle'><h3>{data.title}</h3></CardText>
                        </CardImgOverlay>
                    </Card>
                </Link>);
    }
}

export default CardSpotlightNews;
