import React, { Component } from 'react';
import EventCard from './EventCard';
import NotFound from './NotFound';
import Spinner from './Spinner';

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

    render() {

        this.state.load &&
        this.getData(this.state.slug, this);

        const event = this.state.event;


        return (
            this.state.notFound ? <NotFound /> : this.state.load ? <Spinner/> : <EventCard data={event} />
        );
    }
}

export default Event;
