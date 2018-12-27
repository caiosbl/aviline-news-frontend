import React, { Component } from 'react';
import { Col, Grid } from 'react-bootstrap';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter, Row, CardImg, CardImgOverlay } from 'reactstrap';
import LatestNews from './LatestNews';
import CardSpotlightNews from './CardSpotlightNews'
import MaterialIcon from 'material-icons-react';
import CardSecondaryNews from './CardSecondaryNews';
import CardQuotation from './CardQuotation';
import '../styles/Home.css';



class Home extends Component {

    constructor(props) {
        super(props);
    }

    

    render() {
        return (
            <Grid>

                <Row>
                    <Col md={4} mdPull={4} style={{marginBottom: 10}}>
                        <CardSpotlightNews position={1} />

                    </Col>

                    <Col md={4} mdPull={6} style={{marginBottom: 10}}>
                        <CardSpotlightNews position={2} />
                    </Col>

                    <Col md={4} mdPull={4} style={{marginBottom: 10}}>
                        <CardSpotlightNews position={3} />
                    </Col>


                </Row>


                <Row>

                <Col md={2} mdPull={2} style={{marginBottom: 10}}>
                        <CardSecondaryNews position={1} />
                        <CardSecondaryNews position={2} />
                    </Col>
                    <Col md={2} mdPull={2} style={{marginBottom: 10}}>
                        <CardSecondaryNews position={2} />
                        <CardSecondaryNews position={1} />
                    </Col>
                    <Col md={2} mdPull={2} style={{marginBottom: 10}}>
                        <CardSecondaryNews position={3} />
                        <CardSecondaryNews position={1} />
                    </Col>
                    <Col md={2} mdPull={2} style={{marginBottom: 10}}>
                        <CardSecondaryNews position={4} />
                        <CardSecondaryNews position={1} />
                    </Col>
                    <Col md={4} mdPull={2} style={{marginBottom: 10}}>
                        <CardQuotation/>
                        
                    </Col>
    
                </Row>

                <Row style={{marginTop: 10}}>

                    <Col md={8} mdPull={4}>
                        <Card>
                            <CardHeader tag="h6" id="LatestNewsTitle">
                                <span style={{ marginTop: 20 }}>
                                    <MaterialIcon icon="history" color="white" />
                                </span> <span style={{ fontSize: 26, paddingBottom: 60 }}>Mais Notícias</span>
                            </CardHeader>
                            <CardBody>
                                <LatestNews />
                            </CardBody>
                        </Card>
                    </Col>

                </Row>


            </Grid>
        );
    }
}

export default Home;
