import React, { Component } from 'react';
import { Card,CardHeader, Badge, CardText ,CardBody} from 'reactstrap';
import Spinner from './Spinner';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';




class CardSecondaryNews extends Component {


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
              
            <div>
                    
                    {data.categories[0] !== undefined &&
                    <div style={{
                        width:100, 
                        color: 'red',
                        borderBottom: '3px solid red',
                        marginBottom: '10px'
                
                
                }
                    
                    }><h5>{data.categories[0].name}</h5></div>}

                    <Link to={"/news/" + data.slug} id="link">
                 
                        <CardText>
                        <h6>{data.title}</h6>
                        </CardText>
                   
                </Link></div>);
    }
}

export default CardSecondaryNews;