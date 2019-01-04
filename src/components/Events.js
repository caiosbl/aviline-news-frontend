import React, { Component } from 'react';
import EventItem from './EventItem';
import NotFound from './NotFound';
import Spinner from './Spinner';
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody, Input, Label} from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import StickyBox from "react-sticky-box/dist/esnext";
import ReactGA from 'react-ga';


class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            load: true,
            events: "",
            notFound: false,
            filterType: "Título",
            titleSearch: "",
            filtered: [],
            date: '',
            location: ''
        };

        this.filterByTitle = this.filterByTitle.bind(this);
        this.handlerTitle = this.handlerTitle.bind(this);
        this.handlerDate = this.handlerDate.bind(this);
        this.handlerLocation = this.handlerLocation.bind(this);
    }

    componentDidMount(){
        document.title = "Portal Aviline - Eventos";
      }

    getNextEvents(data) {

        var nextDates = [];

        data.map((event) => {
            const dateStartEvent = new Date(event.dateStart);
            var dateEndEvent = new Date(event.dateFinish);
            dateEndEvent.setHours(23, 59, 59);
            const today = new Date();

            if ((dateStartEvent >= today || dateEndEvent >= today)) {
                nextDates.push(event);
            }
        });

        return nextDates;
    }

    async getData(that) {
        fetch(`https://aviline.herokuapp.com/api/event`)
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                const data = res.sort((a, b) => { return new Date(a.dateStart) - new Date(b.dateStart) });

                const nextEvents = that.getNextEvents(data);
                res.length === 0 ? that.setState({ notFound: true, load: false }) :
                    that.setState({ events: nextEvents, filtered: nextEvents, load: false });

               
            });
    }

    handlerTitle(e) {
        const title = e.target.value;
        this.setState({ titleSearch: title });
        this.filterByTitle(title);
    }

    handlerDate(e) {
        const date = e.target.value;
        this.setState({ date: date });
        this.filterByDate(date);
    }

    handlerLocation(e) {
        const location = e.target.value;
        this.setState({ location: location });
        this.filterByLocation(location);
    }

    filterByDate(date) {
        const date_ = new Date(date);
        const filteredData = this.state.events.filter(function (e) {
            const startDate_ = new Date(e.dateStart.slice(0, 10));
            var endDate_ = new Date(e.dateFinish);
            endDate_.setHours(23, 59, 59);
            const day = new Date(date_);
            return day >= startDate_ && day <= endDate_;

        });
        console.log(filteredData);
        this.setState({ filtered: date === "" ? this.state.events : filteredData });
    }

    filterByTitle(title) {
        const filteredData = this.state.events.filter(e => e.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
        this.setState({ filtered: title.trim() === '' ? this.state.events : filteredData });
    }

    filterByLocation(location) {
        const filteredData = this.state.events.filter(e => e.location.toLowerCase().indexOf(location.toLowerCase()) !== -1);
        this.setState({ filtered: location.trim() === '' ? this.state.events : filteredData });
    }

    getFilterCard(that) {
        return (
            <Card style={{ margin: 20 }} id="filterCard">
                <CardHeader style={{ backgroundColor: '#dc3545', color: 'white', fontFamily: 'Squada One, cursive' }}>
                    <h3><span style={{ marginRight: 4 }}><MaterialIcon icon="search" color="white" size={20} /></span>Filtrar</h3></CardHeader>
                <CardBody>
                    <Label for="exampleSelect">Filtrar por:</Label>
                    <Input type="select" name="select"
                        value={this.state.filterType}
                        onChange={(e) => this.setState({ filterType: e.target.value })}>
                        <option>Título</option>
                        <option>Data</option>
                        <option>Localização</option>
                    </Input>

                    {this.state.filterType === 'Título' &&
                        <Input type="text" name="title"
                            value={this.state.titleSearch}
                            style={{ marginTop: 10 }}
                            placeholder={'Digite o título que deseja buscar ...'}
                            onChange={this.handlerTitle}>
                        </Input>
                    }

                    {this.state.filterType === 'Data' &&
                        <Input type="date" name="date"
                            value={this.state.date}
                            style={{ marginTop: 10 }}
                            placeholder={'Digite o título que deseja buscar ...'}
                            onChange={this.handlerDate}>
                        </Input>
                    }

                    {this.state.filterType === 'Localização' &&
                        <Input type="text" name="location"
                            value={this.state.location}
                            style={{ marginTop: 10 }}
                            placeholder={'Digite a Localização que deseja...'}
                            onChange={this.handlerLocation}>
                        </Input>
                    }

                </CardBody>
            </Card>

        );
    }

    getBreadcrumb() {
        return (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Eventos</BreadcrumbItem>
            </Breadcrumb>
        );
    }

    renderItems(events){
        return(
            events.length === 0 ? 
            <h3  style={{ fontFamily: 'Roboto Condensed, sans-serif',margin:20 }}>
            Ops, não há resultados....
            </h3>:
            events.map((event) => { return <EventItem event={event} /> }))
        
        
        ;
    }

    initializeGA(){
        ReactGA.initialize('UA-131777803-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }




    render() {

        this.initializeGA();

        this.state.load && this.getData(this);
        const events = this.state.filtered;

        return (
            <Grid>
                <Row>
                    <Col xs={12} md={12} >
                        {this.getBreadcrumb()}
                    </Col>
                </Row>

                {this.state.notFound ? <NotFound /> :
                    this.state.load ? <Spinner /> :
                        <Row>

                            <Col xs={4} md={4} >
                                <StickyBox>   {this.getFilterCard(this)} </StickyBox>
                            </Col>
                            <Col xs={8} md={8} id="col" >
                                {this.renderItems(events)}

                            </Col>


                        </Row>

                }

            </Grid>

        );
    }
}

export default Events;
