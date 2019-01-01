import React, { Component } from 'react';
import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import { Badge } from 'reactstrap';
import { Grid, Row, Col,Image } from 'react-bootstrap';
import MaterialIcon from 'material-icons-react';
import { Visible, Hidden } from 'react-grid-system';
import AdsSideXs1 from './Ads/AdsSideXs1';
import AdsSideXs2 from './Ads/AdsSideXs2';
import AdsSideXs3 from './Ads/AdsSideXs3';
import AdsSideXs4 from './Ads/AdsSideXs4';

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

    renderContent(htmlElement) {



        if (htmlElement.length === undefined) return htmlElement.props.children.map((element) => {


            if (element.type === undefined)
                return <p>{element}</p>;
            else if (element.type === 'img')
                return <Image src={element.props.src} style={{ maxWidth: '100%' }} />;
            else if (element.type !== 'br') return <p>{element}</p>;
        });

        else return htmlElement.map((e) => {


            if (e.props !== undefined) {


                return e.props.children.map((element) => {

                    if (element.type === undefined)
                        return <p>{element}</p>;
                    else if (element.type === 'img')
                        return <Image src={element.props.src} style={{ maxWidth: '100%' }} />;
                    else if (element.type !== 'br') return <p>{element}</p>;
                });
            }

        });

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

                        {startDate}</Moment>}  à  {<Moment
                            locale="pt-br"
                            format="D MMMM" withTitle
                        >{endDate}</Moment>} de {<Moment
                            locale="pt-br"
                            format="YYYY" withTitle
                        >{endDate}</Moment>}</span>

                </h5>
            </Row>

            <Row>
                <h5 style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
                    <span style={{ marginRight: 4 }}>
                        <MaterialIcon icon="location_on" color="black" size={16} /></span>
                    <span>{event.location}</span>
                </h5>
            </Row>

            <Visible xs sm>
                <Row>
                    <AdsSideXs1 />
                </Row>
            </Visible>


            <Row>

                {isLoading ? <Spinner /> :
                <div style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
                {this.renderContent(renderHTML(event.description))}
                </div>}

            </Row>

            <Visible xs sm>
                <Row>
                    <AdsSideXs2 />
                </Row>
            </Visible>


        </Grid>
        );
    }
}

export default EventCard;
