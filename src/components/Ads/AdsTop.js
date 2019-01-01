import React, { Component } from 'react';
import { Image, Row, Col, Grid } from 'react-bootstrap';
import '../../styles/Ads1.css';

class AdsTop extends Component {


  render() {
    return (

      <Grid id="grid">
        <Row className="show-grid">
          <Col xsHidden md={2} />
          <Col xs={8} md={6} >
            <Image src="/ads1.png" id="ads" />
          </Col>
          <Col xsHidden md={2} />
        </Row>


      </Grid>




    );
  }
}
export default AdsTop;
