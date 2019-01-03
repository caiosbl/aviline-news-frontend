import React, { Component } from 'react';
import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import { Badge } from 'reactstrap';
import { Grid, Row,Image } from 'react-bootstrap';
import Spinner from './Spinner';
import MaterialIcon from 'material-icons-react';
import { Visible} from 'react-grid-system';
import AdsSideXs1 from './Ads/AdsSideXs1';
import AdsSideXs2 from './Ads/AdsSideXs2';


class NewsCard extends Component {

    constructor(props) {
        super(props);


        this.state = {
            data: this.props.data
        };


    }

    renderCategory(categorieList) {
        return categorieList.map((categorie) => {
            return <a href={`/categories/${categorie.name}`}><Badge key={categorie.key}
                color='danger'
                style={{ marginLeft: 5, fontFamily: 'Roboto Condensed, sans-serif' }}
            >{categorie.name}</Badge></a>;
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
        const news = isLoading ? " " : this.props.data;
        const content = isLoading ? " " : renderHTML(news.content.extended);



        return (<Grid>

            <Row>
                <h1>{isLoading ? <Spinner /> : news.title}</h1>
            </Row>

            <Row>
                {isLoading ? <Spinner /> :
                    <h6 style={{ fontFamily: 'Roboto Condensed, sans-serif', color: "#dc3545" }}>
                        <span style={{ marginRight: 4 }}>
                            <MaterialIcon icon="hquery_builder" color="#dc3545" size={11} /></span>
                        {<Moment locale="pt-br" format="D" withTitle>{news.publishedDate}</Moment>} de {<Moment
                            locale="pt-br" format="MMMM" withTitle>{news.publishedDate}</Moment>} de {<Moment
                                locale="pt-br" format="YYYY" withTitle>{news.publishedDate}</Moment>}</h6>}

                {isLoading ? <Spinner /> : <h6 style={{ marginLeft: 12, color: "#dc3545", fontFamily: 'Roboto Condensed, sans-serif' }}>
                    <span style={{ marginRight: 4 }}>
                        <MaterialIcon icon="person" color="#dc3545" size={11} /></span>
                    {`${news.author.name.first} ${news.author.name.last}`}
                </h6>}

                {isLoading ? <Spinner /> : <h6 style={{ marginLeft: 12 }}>
                    <MaterialIcon icon="label" color="#dc3545" size={11} />
                    {this.renderCategory(news.categories)}
                </h6>}
            </Row>
            <Visible xs sm>
                <Row>
                    <AdsSideXs1 />
                </Row>
            </Visible>


            <Row>{isLoading ? <Spinner /> : <h4 style={{
                fontFamily: 'Roboto Condensed',
                color: 'grey'
            }}>{renderHTML(news.content.brief)}</h4>}</Row>

            <Visible xs sm>
                <Row>
                    <AdsSideXs2 />
                </Row>
            </Visible>

            <Row> {isLoading ? <Spinner /> : <div style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>{this.renderContent(content)}</div>}</Row>

        </Grid>

        );
    }
}

export default NewsCard;
