import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Row, Col, Container } from 'reactstrap';
import { Visible, Hidden } from 'react-grid-system';

class AdsTop extends Component {


  render() {
    return (

      <Container style={{marginTop:10,marginBottom:10}}>
        <Row>
        <Hidden xs sm>
          <Col  md={{ size: 10, offset: 1 }}>
            <Image src="/ads1.png" style={{width:'100%',height:'80%'}} />
          </Col>
          </Hidden>

          <Visible xs sm>
          <Col xs={12} sm={12}>
            <Image src="/ads1.png" style={{width:'100%'}} />
          </Col>
          </Visible>
        </Row>
      </Container>
    );
  }
}
export default AdsTop;
