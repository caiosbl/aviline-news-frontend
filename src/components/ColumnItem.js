import React, { Component } from 'react';
import { Grid, Col, Image, Row } from 'react-bootstrap';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import 'moment/locale/pt-br';



class ColumnItem extends Component {

 


    render() {

        const post = this.props.data;
        const hasImage = post.image !== undefined;
        const mdDataCol = hasImage ? 8 : 12;

        return (
            <Card style={{ margin: 20 }}>
                <CardHeader style={{ backgroundColor: '#dc3545', color: 'white', fontFamily: 'Roboto Condensed, sans-serif' }}>
                    <h4><b>{post.title}</b></h4>
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
                                >{post.publishedDate}</Moment>} de {<Moment
                                    locale="pt-br"
                                    format="MMMM" withTitle
                                >{post.publishedDate}</Moment>} de {<Moment
                                    locale="pt-br"
                                    format="YYYY" withTitle
                                >{post.publishedDate}</Moment>}

                            </h6>

                            <h6 style={{ marginLeft: 12, color: "#dc3545", fontFamily: 'Roboto Condensed, sans-serif' }}>
                                <span style={{ marginRight: 4 }}>
                                    <MaterialIcon icon="person" color="#dc3545" size={11} /></span>
                                {post.author.name}
                            </h6>

                        </Row>

                     


                        <Row>
                            {hasImage &&
                                <Col xs={6} md={4} >
                                    <Image src={post.image.secure_url} thumbnail />
                                </Col>}

                            <Col xs={12} md={mdDataCol} >
                                <p style={{ fontFamily: 'Roboto Condensed, sans-serif', fontSize: 16 }}>
                                    {post.content.brief !== undefined && renderHTML(post.content.brief)}
                                </p>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12}>
                                <Link to={`/column/${post.slug}`}>
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

export default ColumnItem;
