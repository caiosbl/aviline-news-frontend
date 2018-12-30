import React, { Component } from 'react';
import { Grid, Col, Image, Row } from 'react-bootstrap';
import { Card, CardHeader, CardFooter, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import Moment from 'react-moment';
import 'moment/locale/pt-br';



class NewsItem extends Component {

    constructor(props) {
        super(props);  
    }



    render() {

        const news = this.props.data;
        const hasImage = news.image !== undefined;
        const mdDataCol = hasImage ? 8 : 12;

        return (
            <Card style={{ margin: 20 }}>
                <CardHeader style={{ backgroundColor: '#CC0000', color: 'white', fontFamily: 'Roboto Condensed, sans-serif' }}>
                    <h4><b>{news.title}</b></h4>
                </CardHeader>

                <CardBody>
                    <Grid>
                        <Row>
                            {hasImage && <Col xs={6} md={4} >

                                <Image src={news.image.url} thumbnail />

                            </Col>

                            }

                            <Col xs={12} md={mdDataCol} >

                                <h5
                                    style={{ fontFamily: 'Roboto Condensed, sans-serif' }}
                                >
                                    <span style={{ marginRight: 4 }}><MaterialIcon icon="hquery_builder" color="black" size={16} /></span>

                                   {<Moment
                                            locale="pt-br"
                                            format="D MMMM" withTitle
                                        >{news.publishedDate}</Moment>}

                                </h5>

                              

                                <Link to={`/news/${news.slug}`}> <Button color="danger"
                                 style={{ fontFamily: 'Roboto Condensed, sans-serif' }}
                                >
                                
                                Ver Mais
                                
                                </Button></Link>

                            </Col>
                        </Row>

                    </Grid>
                </CardBody>
            </Card>

        );
    }
}

export default NewsItem;
