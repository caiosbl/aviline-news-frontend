import React, { Component } from 'react';
import { Grid, Col, Image, Row } from 'react-bootstrap';
import { Card, CardHeader, CardBody, Button, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import 'moment/locale/pt-br';



class NewsItem extends Component {

    constructor(props) {
        super(props);
    }

    renderCategory(categorieList) {
        return categorieList.map((categorie) => {
            return <a href={`/categories/${categorie.name}`}><Badge key={categorie.key}
                color='danger'
                style={{ marginLeft: 5, fontFamily: 'Roboto Condensed, sans-serif' }}
            >{categorie.name}</Badge></a>;
        })
    }



    render() {

        const news = this.props.data;
        const hasImage = news.image !== undefined;
        const mdDataCol = hasImage ? 8 : 12;

        return (
            <Card style={{ margin: 20 }}>
                <CardHeader style={{ backgroundColor: '#dc3545', color: 'white', fontFamily: 'Roboto Condensed, sans-serif' }}>
                    <h4><b>{news.title}</b></h4>
                </CardHeader>

                <CardBody>
                    <Grid>

                        <Row>

                            <h6 style={{ fontFamily: 'Roboto Condensed, sans-serif', color: "#dc3545" }}>
                                <span style={{ marginRight: 4 }}>
                                    <MaterialIcon icon="hquery_builder" color="#dc3545" size={11} /></span>

                                {<Moment
                                    locale="pt-br"
                                    format="D" withTitle
                                >{news.publishedDate}</Moment>} de {<Moment
                                    locale="pt-br"
                                    format="MMMM" withTitle
                                >{news.publishedDate}</Moment>} de {<Moment
                                    locale="pt-br"
                                    format="YYYY" withTitle
                                >{news.publishedDate}</Moment>}

                            </h6>

                            <h6 style={{ marginLeft: 12, color: "#dc3545", fontFamily: 'Roboto Condensed, sans-serif' }}>
                                <span style={{ marginRight: 4 }}>
                                    <MaterialIcon icon="person" color="#dc3545" size={11} /></span>
                                {`${news.author.name.first} ${news.author.name.last}`}
                            </h6>

                        </Row>

                       

                        <Row>

                            <h6 style={{ marginLeft: 12 }}>
                                <MaterialIcon icon="label" color="#dc3545" size={11} />
                                {this.renderCategory(news.categories)}
                            </h6>

                        </Row>


                        <Row>
                            {hasImage &&
                                <Col xs={6} md={4} >
                                    <Image src={news.image.secure_url} thumbnail />
                                </Col>}

                            <Col xs={12} md={mdDataCol} >
                                <p style={{ fontFamily: 'Roboto Condensed, sans-serif', fontSize: 16 }}>
                                    {news.content.brief !== undefined && renderHTML(news.content.brief)}
                                </p>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12}>
                                <Link to={`/news/${news.slug}`}>
                                    <Button color="danger"
                                        style={{
                                            fontFamily: 'Roboto Condensed, sans-serif',
                                            width: '100%',
                                            marginTop: 10
                                        }}>
                                        Ver Mais
                                    </Button>
                                </Link>
                            </Col>
                        </Row>

                    </Grid>
                </CardBody>
            </Card>

        );
    }
}

export default NewsItem;
