import React, { Component } from 'react';
import { Card, CardBody, Badge, CardHeader, CardText,Container,Row,Col } from 'reactstrap';
import {Image} from 'react-bootstrap';
import Spinner from './Spinner';
import '../styles/CardSpotlightNews.css';
import MaterialIcon from 'material-icons-react';
import { Visible, Hidden} from 'react-grid-system';
import { Link } from 'react-router-dom';



const HeaderQuotationStyle = {
    width: 'auto',
    color: '#dc3545',
    borderBottom: '3px solid #dc3545',
    marginTop: 3
};


class CardColumns extends Component {


    constructor(props) {
        super(props);
        this.state = {
            columns: '',
            load: true,
            color: 'white',
            shadow: ''

        };

        this.renderItems = this.renderItems.bind(this);
    }


  
    async getColumns(that) {

        fetch(`https://aviline.herokuapp.com/api/column-author`)
            .then(function (response) {
                return response.json();
            }).then(function (res) {
                that.setState({ columns: res, load: false });
            });
    }

    renderItems(){
        return(
            this.state.columns.map(
                (column) =>  
                
                <Link to={`/columns/${column.slug}`} 
                onMouseEnter={() => this.setState({ shadow: '2px 2px 25px black'})} 
                onMouseLeave={() => this.setState({ shadow: 'none'})} 
                style={{textDecoration: 'none'}}
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
            
            
            )
        
        
        
      
        
        );
    }

    

    render() {

        this.state.load && this.getColumns(this);

     
        return (



            <Card>
                <CardHeader style={{ backgroundColor: '#dc3545' }}>
                    <h4 style={{ fontFamily: 'Squada One, cursive', color: 'white' }}>
                        <span style={{ marginRight: 4 }}><MaterialIcon icon="contacts" color="white" size={20} /></span>
                        Colunas</h4></CardHeader>

               { this.state.load ?
                <Spinner/> : 
               
               <CardBody>
                   <Container>

                   {this.renderItems()}
                   </Container>
                  
                </CardBody>

               }


            </Card>
        );
    }
}

export default CardColumns;
