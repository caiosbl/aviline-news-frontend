import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, Badge} from 'reactstrap';
import Spinner from './Spinner';
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
                    {data.image !== undefined ?
                        <CardImg width="100%" height="220" src={data.image.secure_url}
                            alt="Card image cap" style={{ opacity: 0.5 }} />
                        
                        : <CardImg width="100%" height="220" src={"https://res.cloudinary.com/aviline/image/upload/v1546358108/avicultura.jpg"}
                        alt="Card image cap" style={{ opacity: 0.5 }} />
                        }
                        <CardImgOverlay>
                            {data.categories[0] !== undefined &&
                                    <Badge color="danger" id="badge">
                                    <h6>{data.categories[0].name}</h6>
                                    </Badge>}
                            <div id='CardTitle' style={{marginTop: 5}}>
                                <h4 style={{ fontSize: '400' }}>{data.title}</h4>
                            </div>
                        </CardImgOverlay>
                    </Card>
                </Link>);
    }
}

export default CardSpotlightNews;
