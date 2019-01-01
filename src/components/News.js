import React, { Component } from 'react';
import NewsCard from './NewsCard';
import NotFound from './NotFound';
import { } from 'react-bootstrap';
import { Container, Row, Col} from 'reactstrap';
import AdsSideMd1 from './Ads/AdsSideMd1';
import AdsSideMd2 from './Ads/AdsSideMd2';
import AdsSideMd3 from './Ads/AdsSideMd3';
import AdsSideMd4 from './Ads/AdsSideMd4';
import { Visible, Hidden } from 'react-grid-system';

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

            <Container style={{marginBottom:100}}>
                <Row>

                  
                    <Col xs={12} md={10}>  
                    {this.state.notFound ? <NotFound /> : <NewsCard data={news} />}
                    </Col>
                   
                   <Hidden xs sm> <Col  md={2} > 
                    <AdsSideMd1/>
                    <AdsSideMd2/>
                    <AdsSideMd3/>
                    <AdsSideMd4/>
                    </Col>
                    </Hidden>
                </Row>
            </Container>
        );
    }
}

export default News;
