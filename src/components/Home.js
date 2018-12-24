import React, { Component } from 'react';
import { Col, Grid } from 'react-bootstrap';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from 'reactstrap';
import LatestNews from './LatestNews';
import '../styles/Home.css';



class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Col md={6} mdPull={6} >
                    <Card>
                        <CardHeader tag="h6" id="CardTitle"><h4>Últimas Notícias</h4></CardHeader>
                        <CardBody>
                            <LatestNews />
                        </CardBody>
                    </Card>
                </Col>


            </Grid>
        );
    }
}

export default Home;
