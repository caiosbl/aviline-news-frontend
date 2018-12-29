import React, { Component } from 'react';
import { Card, CardBody, Badge, CardHeader, CardText, Table } from 'reactstrap';
import { Row, Grid, Col } from 'react-bootstrap';
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

        var nextDates = [];

        data.map((event) => {

            const dateStartEvent = new Date(event.dateStart);
            const dateEndEvent = new Date(event.dateFinish);
            const today = new Date();
            if ((dateStartEvent - today) > 0 || (dateEndEvent - today) > 0)
                nextDates.push(event);
        });

        return nextDates;
    }

    async getData(that) {

        fetch("https://aviline.herokuapp.com/api/event")
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {

                const date = res.sort((a, b) => { return new Date(a.dateStart) - new Date(b.dateStart) })
                that.setState({ data: date, load: false });
            });

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
                                        <th scope="row">
                                            <Moment format="DD/MM"
                                             style={{ color: "grey", 
                                             fontSize: 14,
                                             fontFamily: 'Roboto Condensed' 
                                             }}>
                                                {event.dateStart}
                                            </Moment>
                                        </th>
                                        <td
                                        style={{fontFamily: 'Roboto Condensed' }}
                                        >{event.title}</td>
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
