import React, { Component } from 'react';
import { Card, CardBody, Badge, CardHeader,Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import '../styles/CardSpotlightNews.css';
import MaterialIcon from 'material-icons-react';
import Moment from 'react-moment';
import 'moment/locale/pt-br';




class CardNextEvents extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: '',
            load: true
        };
    }


    getNextEvents(data) {

        var cont = 0;
        var nextDates = [];

        data.forEach((event) => {
            const dateStartEvent = new Date(event.dateStart);
            var dateEndEvent = new Date(event.dateFinish);
            dateEndEvent.setHours(23, 59, 59);
            const today = new Date();

            if ((dateStartEvent >= today || dateEndEvent >= today) && cont <= 2) {

                nextDates.push(event);
                cont++;
            }
        });

        return nextDates;
    }

    async getData(that) {

        fetch("https://aviline.herokuapp.com/api/event")
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {

                const date = res.sort((a, b) => { return new Date(a.dateStart) - new Date(b.dateStart) });
                that.setState({ data: date, load: false });
            });

    }


    eventIsToday(startDate, endDate) {
        const startDate_ = new Date(startDate);
        var endDate_ = new Date(endDate);
        endDate_.setHours(23, 59, 59);
        const today = new Date();
        return today >= startDate_ && today <= endDate_;
    }



    render() {

        this.state.load && this.getData(this);
        const events = this.state.data;


        return (

            this.state.load ? <Spinner /> :
                <Card>
                    <CardHeader style={{ backgroundColor: '#dc3545' }}>
                        <h4 style={{ fontFamily: 'Squada One, cursive', color: 'white' }}>
                            <span style={{ marginRight: 4 }}><MaterialIcon icon="event_note" color="white" size={20} /></span>
                            Próximos Eventos</h4></CardHeader>

                    <CardBody>

                        <Table>

                            <tbody>
                                {this.getNextEvents(events).map((event) => {
                                    return <tr key={event.slug}>
                                        <th scope="row" >
                                            {
                                                this.eventIsToday(event.dateStart, event.dateFinish)
                                                    ? <Badge color="secondary"
                                                        style={{
                                                            fontSize: 14,
                                                            fontFamily: 'Roboto Condensed',
                                                        }}>
                                                        Hoje
                                                </Badge>
                                                    : <Moment format="DD/MM"
                                                        style={{
                                                            color: "grey",
                                                            fontSize: 14,
                                                            fontFamily: 'Roboto Condensed',
                                                        }}>
                                                        {event.dateStart}
                                                    </Moment>

                                            }
                                        </th>
                                       <td
                                            style={{ fontFamily: 'Roboto Condensed', width: 400 }}
                                        > <Link to={'events/' + event.slug}> {event.title}</Link></td>
                                    </tr>
                                })}

                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
        );
    }
}

export default CardNextEvents;
