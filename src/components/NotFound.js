import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import '../styles/NotFound.css';


class NotFound extends Component {

    render() {

     return(
     <Grid>
         
        
         <Row className="show-grid">
         <Col xsHidden md={3} />
         <Col xs={8} md={6} >
        
         <h1 id = "notFound">Ops, a página que você estava procurando não existe...</h1>
         </Col>
         <Col xsHidden md={2} />
         </Row>

         
         
    </Grid>);
    }
}

export default NotFound;
