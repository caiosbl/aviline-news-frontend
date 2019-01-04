import React, { Component } from 'react';
import { FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { Container,Row } from 'reactstrap';




class Footer extends Component {
    
    constructor(props) {
        super(props);


        this.state = {
            opacity1:0.5,
            opacity2:0.5,
            opacity3:0.5
        };


    }

    render() {


        return (
            <Container fluid={true} style={{
                width: 'auto', backgroundColor: '#dc3545',
                color: 'white', fontFamily: 'Roboto Condensed',
            }}>


                <Container>
                    <Row style={{ paddingTop: 40, paddingBottom: 40 }} >
                       
                        <a href="https://facebook.com/Portalaviline" 
                        onMouseEnter={() => this.setState({opacity1:1.0})} 
                        onMouseLeave={() => this.setState({opacity1:0.5})} 
                        style={{opacity:this.state.opacity1}}>
                            <FaFacebook size={40} style={{ marginLeft: 5, color: 'white' }} />
                        </a>

                        <a href={"https://twitter.com/portalaviline"}
                         onMouseEnter={() => this.setState({opacity2:1.0})} 
                         onMouseLeave={() => this.setState({opacity2:0.5})}
                         style={{opacity:this.state.opacity2}}> 
                        
                            <FaTwitter size={40} style={{ marginLeft: 5, color: 'white' }} />
                        </a>

                        <a href={"mailto:comercial@aviline.com.br"}
                         onMouseEnter={() => this.setState({opacity3:1.0})} 
                         onMouseLeave={() => this.setState({opacity3:0.5})}
                         style={{opacity:this.state.opacity3}}
                        >
                        <FaEnvelope id="button" size={40} style={{ marginLeft: 5, color: 'white' }} />
                        </a>

                        <h6 style={{ marginBottom: 2, marginLeft: 'auto' }}>By {" "}
                            <span><img src={"/cslogo.png"} width={'50px'} style={{opacity:1.0}} id="cslogo"></img></span></h6>

                    </Row>
                </Container>


            </Container>
        );
    }
}

export default Footer;
