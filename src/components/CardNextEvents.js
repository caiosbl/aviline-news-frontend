import React, { Component } from 'react';
import { Card, CardBody, Badge, CardHeader, CardText, Table } from 'reactstrap';
import { Row, Grid, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import '../styles/CardSpotlightNews.css';
import MaterialIcon from 'material-icons-react';
import Moment from 'react-moment';
import 'moment/locale/pt-br';



const HeaderQuotationStyle = {
    width: 300,
    color: 'red',
    borderBottom: '3px solid red',
    marginTop: 3
};


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

        data.map((event) => {

            const dateStartEvent = new Date(event.dateStart);
            const dateEndEvent = new Date(event.dateFinish);
            const today = new Date();
            if (((dateStartEvent - today) > 0 || (dateEndEvent - today) > 0) && cont <= 3)
                nextDates.push(event);
                cont++;
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
        const endDate_ = new Date(endDate);
        const today = new Date();
        return today >= startDate_ && today <= endDate_;
    }





    render() {

        this.state.load && this.getData(this);
        const events = this.state.data;




        return (

            this.state.load ? <Spinner /> :
                <Card>
                    <CardHeader style={{ backgroundColor: '#CC0000' }}>
                        <h4 style={{ fontFamily: 'Squada One, cursive', color: 'white' }}>
                            <span style={{ marginRight: 4 }}><MaterialIcon icon="event_note" color="white" size={20} /></span>
                            Próximos Eventos</h4></CardHeader>

                    <CardBody>

                        <Table>

                            <tbody>
                                {this.getNextEvents(events).map((event) => {
                                    return <tr>
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
                                        <Link to={'events/' + event.slug}> <td
                                            style={{ fontFamily: 'Roboto Condensed',  width: 400}}
                                        >{event.title}</td></Link>
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
