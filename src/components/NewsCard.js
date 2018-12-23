import React, { Component } from 'react';
import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import { Badge } from 'reactstrap';
import { Grid } from 'react-bootstrap';
import Spinner from './Spinner';


class NewsCard extends Component {

    constructor(props) {
        super(props);
        
     
        this.state = {
           data: this.props.data
        };

   
    }

    renderCategory(categorieList) {
        categorieList.map((categorie) => {
            return <Badge key={categorie.key}>{categorie.name}</Badge>;
        })
    }

    render() {

        const isLoading = this.props.data === "";
        const news = isLoading ? " " : this.props.data;
        const author = isLoading ? " " : news.author.name;
        const categories = isLoading ? " " : news.categories;
        const authorName = isLoading ? " " : author.first + ' ' + author.last;

        console.log(isLoading);
        console.log(this.props.data);


        return (<Grid>

            <div>
                <h1>{ isLoading ? <Spinner /> : news.title}</h1>
                <h3>{ isLoading ? <Spinner /> : authorName}</h3>
                <h5>{ isLoading ? <Spinner /> : <Moment format="DD/MM/YYYY">{news.publishedDate.slice(0, 10)}</Moment>}</h5>
                <h6>{ isLoading ? <Spinner /> : this.renderCategory(categories)}</h6>
                {isLoading ? <Spinner /> : renderHTML(news.content.brief)}
                {isLoading ? <Spinner /> : renderHTML(news.content.extended)}

            </div></Grid>
        );
    }
}

export default NewsCard;
