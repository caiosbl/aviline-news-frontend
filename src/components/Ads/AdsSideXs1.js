import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import {Row,Container} from 'reactstrap';

class AdsSideXs1 extends Component {


  render() {
    return (
   <Container>
        <Row className="show-grid" style={{marginBottom:20}}>
            <Image src="/adsSideXs1.png"  width={'100%'} height={'20%'}/>
        </Row>
        </Container>
    );
  }
}
export default AdsSideXs1;
