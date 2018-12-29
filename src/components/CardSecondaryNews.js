import React, { Component } from 'react';
import {  CardText } from 'reactstrap';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';




class CardSecondaryNews extends Component {


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
    
             if(!(data.length < position))
                    that.setState({ data: data[position - 1], load: false });
    }

    render() {

        this.state.load &&
            this.getData(this);

        const data = this.state.data;

        return (

            (this.state.load) ? <Spinner /> :
              
            <div>
                    
                    {data.categories[0] !== undefined &&
                    <div style={{
                        width:100, 
                        color: 'red',
                        borderBottom: '3px solid red',
                        marginBottom: '10px'}}>
                        
                        <h5>{data.categories[0].name}</h5></div>}

                    <Link to={"/news/" + data.slug} id="link">
                 
                        <CardText>
                        <h6>{data.title}</h6>
                        </CardText>
                   
                </Link></div>);
    }
}

export default CardSecondaryNews;