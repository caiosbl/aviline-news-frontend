import React, { Component } from 'react';
import { Image, Row} from 'react-bootstrap';


class AdsSideMd extends Component {


  render() {
    return (
   
        <Row className="show-grid" style={{marginBottom:20}}>
            <Image src="/adsSide1.png"  width={'100%'} height={'20%'}/>
        </Row>

    );
  }
}
export default AdsSideMd;
