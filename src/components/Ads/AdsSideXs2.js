import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import {Row,Container} from 'reactstrap';

class AdsSideXs2 extends Component {


  render() {
    return (
   <Container>
        <Row className="show-grid" style={{marginBottom:20}}>
            <Image src="/adsSideXs2.png"  width={'100%'} height={'20%'}/>
        </Row>
        </Container>
    );
  }
}
export default AdsSideXs2;
