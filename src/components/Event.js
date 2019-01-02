import React, { Component } from 'react';
import EventCard from './EventCard';
import NotFound from './NotFound';
import Spinner from './Spinner';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FacebookProvider, Comments } from 'react-facebook';
import { Visible, Hidden } from 'react-grid-system';
import AdsSideMd1 from './Ads/AdsSideMd1';
import AdsSideMd2 from './Ads/AdsSideMd2';
import AdsSideMd3 from './Ads/AdsSideMd3';
import AdsSideMd4 from './Ads/AdsSideMd4';
import AdsSideXs3 from './Ads/AdsSideXs3';
import AdsSideXs4 from './Ads/AdsSideXs4';
import ShareBar from './ShareBar';

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

    componentDidMount(){
        document.title = "Portal Aviline";
      }

    async getData(slug, that) {

        fetch(`http://aviline.herokuapp.com/api/event/${slug}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {

                res.length === 0 ? that.setState({ notFound: true, load: false }) :
                    that.setState({ event: res[0], load: false });

                const title = res[0].title;
                if (title !== undefined) document.title = `Portal Aviline - ${title}`;
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
            this.state.notFound ? <NotFound /> : this.state.load ? <Spinner /> :

                <Grid style={{ marginBottom: 50 }}>
                    {this.getBreadcrumb(this)}

                    <Row>
                        <Col xs={12} md={10}>
                            <EventCard data={event} />
                            {<ShareBar url={window.location.href} title={`${event.title} - Portal Aviline`}/>}

                            <h3 style={{
                                fontFamily: 'Roboto Condensed, sans-serif',
                                color: "#dc3545",
                                marginTop: 20,
                                borderBottom: '3px solid #dc3545'
                            }}>Comentários</h3>

                            <FacebookProvider appId="276953129067999" language="pt_BR">
                                <Comments href={window.location.href} numPosts={5} width={'auto'} />
                            </FacebookProvider>

                            <Visible xs sm>
                                <Col xs={12} sm={12}>
                                    <AdsSideXs3 />
                                    <AdsSideXs4 />
                                </Col>
                            </Visible>
                        </Col>

                        <Hidden xs sm> <Col md={2} >
                            <AdsSideMd1 />
                            <AdsSideMd2 />
                            <AdsSideMd3 />
                            <AdsSideMd4 />
                        </Col>
                        </Hidden>

                    </Row>

                </Grid>
        );
    }
}

export default Event;
