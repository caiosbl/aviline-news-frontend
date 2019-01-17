import React, { Component } from 'react';
import { Image, Row } from 'react-bootstrap';


class AdsHome1 extends Component {


  render() {
    return (
   
        <Row className="show-grid" style={{marginBottom:20, marginRight:1}}>
            <Image src="/adsSide1.png"  width={'90%'} height={'20%'}/>
        </Row>

    );
  }
}
export default AdsHome1;
