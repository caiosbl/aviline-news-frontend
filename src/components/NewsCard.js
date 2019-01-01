import React, { Component } from 'react';
import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import { Badge} from 'reactstrap';
import { Grid, Row, Col , Image } from 'react-bootstrap';
import Spinner from './Spinner';
import MaterialIcon from 'material-icons-react';


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

    renderContent(htmlElement){
    
        return htmlElement.props.children.map((element) =>{

        if (element.type === undefined) 
            return <p>{element}</p>;
        else if(element.type === 'img')
            return <Image src={element.props.src} style={{width: '100%'}}/>;
        else if (element.type !== 'br') return <p>{element}</p>;
        });

    }

    render() {

        const isLoading = this.props.data === "";
        const news = isLoading ? " " : this.props.data;
        const author = isLoading ? " " : news.author.name;
        const categories = isLoading ? " " : news.categories;
        const authorName = isLoading ? " " : author.first + ' ' + author.last;

    

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

                <Row>{isLoading ? <Spinner /> : <h4 style={{
                    fontFamily: 'Roboto Condensed',
                    color: 'grey'
                }}>{renderHTML(news.content.brief)}</h4>}</Row>

               <Row> {isLoading ? <Spinner /> : this.renderContent(renderHTML(news.content.extended))}</Row>
           
            </Grid>

        );
    }
}

export default NewsCard;
