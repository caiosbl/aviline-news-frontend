import React, { Component } from 'react';
import { Card, CardBody, Badge, CardHeader, CardText,Container,Row,Col } from 'reactstrap';
import {Image} from 'react-bootstrap';
import Spinner from './Spinner';
import '../styles/CardSpotlightNews.css';
import MaterialIcon from 'material-icons-react';
import { Visible, Hidden} from 'react-grid-system';
import { Link } from 'react-router-dom';






class ItemCardColumn extends Component {


    constructor(props) {
        super(props);
        this.state = {
            shadow: 'none'
        };

      
    }


    render(){

        const column = this.props.data;

        return(
                
                <Link to={`/columns/${column.slug}`} 
                onMouseEnter={() => this.setState({ shadow: '2px 2px 25px black'})} 
                onMouseLeave={() => this.setState({ shadow: 'none'})} 
                style={{textDecoration: 'none',color: 'white'}}
                > 
                
                <Row style={{background: '#dc3545',boxShadow: this.state.shadow,
                borderRadius:8.0}}>

            
                    <div style={{margin:10}}>
                   
                   <Row>
                    <Col md={4} xs={6} sm={6}>
                    <Image src={column.image.secure_url} 
                    style={{ width: '80%', height: '90%', borderRadius: '10%', border: `3px solid ${this.state.color}`}} />
                   </Col>

                    <Col md={7} xs={6} sm={6} style={{ fontFamily: 'Squada One, cursive',color: this.state.color }}>
                   <Visible xs sm><h3 style={{paddingTop: '30%'}}>{column.name}</h3></Visible>
                   <Hidden xs sm><h4 style={{paddingTop: '10%'}}>{column.name}</h4></Hidden>
                    </Col>
                    </Row>
                    </div>
                </Row>
                </Link>
            
        );
    }

    

   
}

export default ItemCardColumn;
