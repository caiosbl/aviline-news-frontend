import React, { Component } from 'react';
import { Col, Grid } from 'react-bootstrap';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter, Row, CardImg, CardImgOverlay } from 'reactstrap';
import LatestNews from './LatestNews';
import CardSpotlightNews from './CardSpotlightNews'
import '../styles/Home.css';



class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>

                <Row>
                    <Col md={3} mdPull={6} >
                        



                    </Col>





                    <Col md={6} mdPull={6} >
                        <Card>
                            <CardHeader tag="h6" id="LatestNewsTitle"><h4>Últimas Notícias</h4></CardHeader>
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
