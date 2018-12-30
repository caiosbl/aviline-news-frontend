import React, { Component } from 'react';
import { Grid, Col, Image, Row } from 'react-bootstrap';
import { Card, CardHeader, CardFooter, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import Moment from 'react-moment';
import 'moment/locale/pt-br';



class EventItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            event: props.event
        };
    }



    render() {


        const event = this.state.event;
        const hasImage = event.image !== undefined;
        const mdDataCol = hasImage ? 8 : 12;


        return (
            <Card style={{ margin: 20 }}>
                <CardHeader style={{ backgroundColor: '#CC0000', color: 'white', fontFamily: 'Roboto Condensed, sans-serif' }}>
                    <h4><b>{event.title}</b></h4>
                </CardHeader>

                <CardBody>
                    <Grid>
                        <Row>
                            {hasImage && <Col xs={6} md={4} >

                                <Image src={event.image.url} thumbnail />

                            </Col>

                            }

                            <Col xs={12} md={mdDataCol} >

                                <h5
                                    style={{ fontFamily: 'Roboto Condensed, sans-serif' }}
                                >
                                    <span style={{ marginRight: 4 }}><MaterialIcon icon="event_note" color="black" size={16} /></span>

                                    De {<Moment
                                        locale="pt-br"
                                        format="D MMMM" withTitle
                                    >

                                        {event.dateStart}</Moment>}  à  {<Moment
                                            locale="pt-br"
                                            format="D MMMM" withTitle
                                        >{event.dateFinish}</Moment>}

                                </h5>

                                <h5> <span style={{ marginRight: 4 }}>
                                <MaterialIcon icon="location_on" color="black" size={16} /></span>
{event.location}

                                </h5>

                               <Link to={`/events/${event.slug}`}> <Button color="danger">Ver Mais</Button></Link>

                            </Col>
                        </Row>

                    </Grid>
                </CardBody>
            </Card>

        );
    }
}

export default EventItem;
