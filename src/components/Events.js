import React, { Component } from 'react';
import EventCard from './EventCard';
import NotFound from './NotFound';
import Spinner from './Spinner';

class Event extends Component {

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
                res.length === 0 ? that.setState({ notFound: true, load: false }) :
                that.setState({ events: res, load: false });
            });

    }

    render() {

        this.state.load &&
        this.getData(this);

        const events = this.state.events;


        return (
            this.state.notFound ? <NotFound /> : 
            this.state.load ? <Spinner/> :
            
            <div>
                {
                events.map((event) => { 

                    return (<EventCard data={event} />);
                }
                )
               
                
                })
            </div>
        );
    }
}

export default Event;
