import React, { Component } from 'react';
import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import { Badge } from 'reactstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import MaterialIcon from 'material-icons-react';

import Spinner from './Spinner';


class EventCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        };


    }

    renderCategory(categorieList) {
        return categorieList.map((categorie) => {
            return <Badge key={categorie.key}>{categorie.name}</Badge>;
        })
    }

    render() {

        const isLoading = this.props.data === "";
        const event = isLoading ? " " : this.props.data;
        const startDate = isLoading ? " " : event.dateStart;
        const endDate = isLoading ? " " : event.dateFinish;


        return (<Grid>

       
                <Row>
                    <h1 style={{ fontFamily: 'Roboto Condensed' }}>{isLoading ? <Spinner /> : event.title}</h1>
                </Row>

                <Row>
                    <h5 style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
                        <span style={{ marginRight: 4 }}>
                            <MaterialIcon icon="event_note" color="black" size={16} /></span>

                        <span> De {<Moment
                            locale="pt-br"
                            format="D MMMM" withTitle>

                            {event.dateStart}</Moment>}  à  {<Moment
                                locale="pt-br"
                                format="D MMMM" withTitle
                            >{event.dateFinish}</Moment>} de {<Moment
                                locale="pt-br"
                                format="YYYY" withTitle
                            >{event.dateFinish}</Moment>}</span>

                    </h5>
                </Row>

                <Row>

                    <h5 style={{ fontFamily: 'Roboto Condensed, sans-serif' }}> 
                        <span style={{ marginRight: 4 }}>
                            <MaterialIcon icon="location_on" color="black" size={16} /></span>
                        <span>{event.location}</span>

                    </h5>
                </Row>


                <Row>
                    {isLoading ? <Spinner /> : renderHTML(event.description)}
                </Row>

       
        </Grid>
        );
    }
}

export default EventCard;
