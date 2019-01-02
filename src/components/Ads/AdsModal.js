import React, { Component } from 'react';
import { Image, Row, Col, Grid } from 'react-bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';



class AdsModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: true,
     
    };

    this.toggle = this.toggle.bind(this);
    
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }



  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={false}>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>
          <Image src="/adsModal.png"  width={'90%'} height={'20%'} style={{margin: 20}}/>
          </ModalBody>
          
        </Modal>
      </div>

    );
  }
}
export default AdsModal;
