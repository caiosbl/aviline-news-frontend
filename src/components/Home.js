import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import { } from 'reactstrap';
import LatestNews from './LatestNews';
import CardSpotlightNews from './CardSpotlightNews'
import MaterialIcon from 'material-icons-react';
import Spinner from './Spinner';
import CardSecondaryNews from './CardSecondaryNews';
import CardQuotation from './CardQuotation';
import '../styles/Home.css';



class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            load: true,
            notFound: false
        };
    }

    async getData(that) {

        fetch("https://aviline.herokuapp.com/api/post")
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                res.length == 0 ? that.setState({ notFound: true, load: false }) :
                that.setState({ data: res, load: false });
            });

    }
    

    render() {

        this.state.load && this.getData(this);

        return (
            <Grid>

                <Row>
                    <Col md={4} mdPull={4} style={{marginBottom: 10}}>
                    {this.state.load || this.state.notFound ? <Spinner /> :
                        <CardSpotlightNews position={1} data={this.state.data} />}
                    </Col>

                    <Col md={4} mdPull={6} style={{marginBottom: 10}}>
                    {this.state.load || this.state.notFound ? <Spinner /> :
                        <CardSpotlightNews position={2} data={this.state.data} />}
                    </Col>

                    <Col md={4} mdPull={4} style={{marginBottom: 10}}>
                    {this.state.load || this.state.notFound ? <Spinner /> :
                        <CardSpotlightNews position={3} data={this.state.data} />}
                    </Col>


                </Row>


                <Row>

                <Col md={2} mdPull={2} style={{marginBottom: 10}}>
                {this.state.load || this.state.notFound ? <Spinner /> :
                        <div><CardSecondaryNews position={1} data={this.state.data} />
                        <CardSecondaryNews position={2} data={this.state.data} /></div>}
                    </Col>
                    <Col md={2} mdPull={2} style={{marginBottom: 10}}>
                    {this.state.load || this.state.notFound ? <Spinner /> : <div>
                        <CardSecondaryNews position={2} data={this.state.data}/>
                        <CardSecondaryNews position={1} data={this.state.data}/></div>}
                    </Col>
                    <Col md={2} mdPull={2} style={{marginBottom: 10}}>
                    {this.state.load || this.state.notFound ? <Spinner /> : <div>
                        <CardSecondaryNews position={3} data={this.state.data}/>
                        <CardSecondaryNews position={1} data={this.state.data}/></div>}
                    </Col>
                    <Col md={2} mdPull={2} style={{marginBottom: 10}}>
                    {this.state.load || this.state.notFound ? <Spinner /> : <div>
                        <CardSecondaryNews position={4} data={this.state.data}/>
                        <CardSecondaryNews position={1} data={this.state.data}/></div>}
                    </Col>
                    <Col md={4} mdPull={2} style={{marginBottom: 10}}>
                        <CardQuotation/>    
                    </Col>
    
                </Row>

                <Row style={{marginTop: 10}}>

                    <Col md={8} mdPull={4} style={{marginBottom: 40}}>
                    {this.state.load || this.state.notFound ? <Spinner /> : 
                    <LatestNews />}
                    </Col>

                </Row>


            </Grid>
        );
    }
}

export default Home;
