import React, { Component } from 'react';
import EventCard from './EventCard';
import NotFound from './NotFound';
import Spinner from './Spinner';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Grid} from  'react-bootstrap';
import { Link } from 'react-router-dom';

class Event extends Component {

    constructor(props) {
        super(props);

        this.state = {
            load: true,
            slug: props.match.params.id,
            event: "",
            notFound: false
        };
    }

    async getData(slug, that) {

        fetch(`http://aviline.herokuapp.com/api/event/${slug}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                res.length === 0 ? that.setState({ notFound: true, load: false }) :
                that.setState({ event: res[0], load: false });
            });

    }

    getBreadcrumb(that) {
        return (

            <Breadcrumb>
                <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/events'>Eventos</Link></BreadcrumbItem>
                <BreadcrumbItem active>{that.state.event.title}</BreadcrumbItem>
            </Breadcrumb>

        );
    }

    render() {

        this.state.load &&
        this.getData(this.state.slug, this);

        const event = this.state.event;


        return (
            this.state.notFound ? <NotFound /> : this.state.load ? <Spinner/> : 
            
            <Grid>
                {this.getBreadcrumb(this)}
            <EventCard data={event} />
            </Grid>
        );
    }
}

export default Event;
