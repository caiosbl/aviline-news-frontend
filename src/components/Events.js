import React, { Component } from 'react';
import EventItem from './EventItem';
import NotFound from './NotFound';
import Spinner from './Spinner';
import { Grid, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

class Events extends Component {

    constructor(props) {
        super(props);

        this.state = {
            load: true,
            events: "",
            notFound: false
        };
    }

    async getData(that) {

        fetch(`http://aviline.herokuapp.com/api/event`)
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                const data = res.sort((a, b) => { return new Date(a.dateStart) - new Date(b.dateStart) });
                res.length === 0 ? that.setState({ notFound: true, load: false }) :
                    that.setState({ events: data, load: false });
            });

    }

    getBreadcrumb() {
        return (

            <Breadcrumb>
                <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Eventos</BreadcrumbItem>
            </Breadcrumb>

        );
    }

    render() {

        this.state.load &&
            this.getData(this);

        const events = this.state.events;


        return (

            <Grid>
                {this.getBreadcrumb()}
                {this.state.notFound ? <NotFound /> :
                    this.state.load ? <Spinner /> :
                        <div>
                            <Col xs={6} md={4} />
                            <Col xs={12} md={8} >
                                {events.map((event) => { return <EventItem event={event} /> })}
                            </Col>
                        </div>}

            </Grid>

        );
    }
}

export default Events;
