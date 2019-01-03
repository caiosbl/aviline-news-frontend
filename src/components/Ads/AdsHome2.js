import React, { Component } from 'react';
import { Image, Row} from 'react-bootstrap';


class AdsHome2 extends Component {


  render() {
    return (
   
        <Row className="show-grid" style={{marginBottom:20, marginRight:1}}>
            <Image src="/adsSide.png"  width={'90%'} height={'20%'}/>
        </Row>

    );
  }
}
export default AdsHome2;
