import React, { Component } from 'react';
import NewsCard from './NewsCard';
import NotFound from './NotFound';
import { Grid, Row, Col } from 'react-bootstrap';

class News extends Component {

    constructor(props) {
        super(props);

        this.state = {

            load: true,
            slug: props.match.params.id,
            news: "",
            notFound: false
        };
    }

    async getData(slug, that) {

        fetch(`http://aviline.herokuapp.com/api/post/slug/${slug}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                res.length === 0 ? that.setState({ notFound: true, load: false }) :
                    that.setState({ news: res[0], load: false });
            });

    }

    render() {

        this.state.load &&
            this.getData(this.state.slug, this);

        const news = this.state.news;


        return (

            <Grid style={{marginBottom:100}}>
                <Row>
                    <Col xs={10} md={10}>  
                    {this.state.notFound ? <NotFound /> : <NewsCard data={news} />}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default News;
