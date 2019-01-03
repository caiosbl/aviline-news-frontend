import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import {Col as ColR} from 'reactstrap';
import LatestNews from './LatestNews';
import CardSpotlightNews from './CardSpotlightNews'
import Spinner from './Spinner';
import CardSecondaryNews from './CardSecondaryNews';
import CardQuotation from './CardQuotation';
import CardNextEvents from './CardNextEvents';
import '../styles/Home.css';
import AdsHome1 from './Ads/AdsHome1';
import AdsHome2 from './Ads/AdsHome2';
import AdsHome3 from './Ads/AdsHome3';
import AdsHome4 from './Ads/AdsHome4';
import { Visible, Hidden } from 'react-grid-system';



class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            load: true,
            notFound: false
        };
    }

    componentDidMount() {
        document.title = "Portal Aviline";
    }

    async getData(that) {

        fetch("https://aviline.herokuapp.com/api/post")
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                res.length === 0 ? that.setState({ notFound: true, load: false }) :
                    that.setState({ data: res, load: false });
            });

    }


    render() {

        this.state.load && this.getData(this);

        return (
            <Grid>

                <Row>
                    <Col md={4} mdPull={4} style={{ marginBottom: 10 }}>
                        {this.state.load || this.state.notFound ? <Spinner /> :
                            <CardSpotlightNews position={1} data={this.state.data} />}
                    </Col>

                    <Col md={4} mdPull={6} style={{ marginBottom: 10 }}>
                        {this.state.load || this.state.notFound ? <Spinner /> :
                            <CardSpotlightNews position={2} data={this.state.data} />}
                    </Col>

                    <Col md={4} mdPull={4} style={{ marginBottom: 10 }}>
                        {this.state.load || this.state.notFound ? <Spinner /> :
                            <CardSpotlightNews position={3} data={this.state.data} />}
                    </Col>
                </Row>

                <Row>

                    <Col md={2} mdPull={2} style={{ marginBottom: 3 }}>
                        {this.state.load || this.state.notFound ? <Spinner /> :
                            <div><CardSecondaryNews position={4} data={this.state.data} />
                                <CardSecondaryNews position={5} data={this.state.data} /></div>}
                    </Col>
                    <Col md={2} mdPull={2} style={{ marginBottom: 3 }}>
                        {this.state.load || this.state.notFound ? <Spinner /> : <div>
                            <CardSecondaryNews position={6} data={this.state.data} />
                            <CardSecondaryNews position={7} data={this.state.data} /></div>}
                    </Col>
                    <Col md={2} mdPull={2} style={{ marginBottom: 3 }}>
                        {this.state.load || this.state.notFound ? <Spinner /> : <div>
                            <CardSecondaryNews position={8} data={this.state.data} />
                            <CardSecondaryNews position={9} data={this.state.data} /></div>}
                    </Col>
                    <Col md={2} mdPull={2} style={{ marginBottom: 3 }}>
                        {this.state.load || this.state.notFound ? <Spinner /> : <div>
                            <CardSecondaryNews position={10} data={this.state.data} />
                            <CardSecondaryNews position={11} data={this.state.data} /></div>}
                    </Col>
                    <Col md={4} mdPull={2} style={{ marginBottom: 3 }}>
                        <CardNextEvents />
                    </Col>


                </Row>

                <Row style={{ marginTop: 2 }}>

                    <Col md={8} mdPull={4} style={{ marginBottom: 40 }}>

                        <Hidden xs sm>
                        <Grid>
                            <Row>

                                <Col md={3} >
                                    <AdsHome1 />
                                </Col>
                                <Col md={3}>
                                    <AdsHome2 />
                                </Col>
                                <Col md={3}>
                                    <AdsHome3 />
                                </Col>
                                <Col md={3}>
                                    <AdsHome4 />
                                </Col>
                            </Row>
                            </Grid>

                        </Hidden>

                        <Visible xs sm>
                        <Grid >
                            <Row style={{marginLeft:2}}>
                                <ColR sm={6} xs={6}>
                                    <AdsHome1 />
                                </ColR>
                                <ColR sm={6} xs={6}>
                                    <AdsHome2 />
                                </ColR>
                            </Row>
                            <Row style={{marginLeft:2}}>
                                <ColR sm={6} xs={6}>
                                    <AdsHome3 />
                                </ColR>
                                <ColR sm={6} xs={6}>
                                    <AdsHome4 />
                                </ColR>
                            </Row>
                            </Grid>
                        </Visible>


                        <Row>
                            <Grid>
                            {this.state.load || this.state.notFound ? <Spinner /> :
                                <LatestNews data={this.state.data} />}
                                </Grid>
                        </Row>
                    </Col>

                    <Col md={4} mdPull={2} style={{ marginBottom: 10 }}>
                        <CardQuotation />
                    </Col>

                </Row>


            </Grid>
        );
    }
}

export default Home;
