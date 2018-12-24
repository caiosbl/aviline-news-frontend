import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from './Spinner';
import Moment from 'react-moment';


class LatestNews extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: "",
            isLoading: true
        };

    }

    async getData(that) {

        fetch("https://aviline.herokuapp.com/api/post")
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                that.setState({ data: res, isLoading: false });
            });

    }

    renderLatestNews(newsList) {
        var cont = 0;
        return newsList.map((news) => {

            if (cont < 10)
                return (<ListGroupItem>
                    <Moment format="DD/MM" style={{color: "grey", margin: 3}}>{news.publishedDate.slice(0, 10)}</Moment>
                     <Link to={'news/' + news.slug}> {news.title}</Link></ListGroupItem>);

          
        })
    }

    render() {
        this.state.isLoading && this.getData(this);
        return (
            <ListGroup>{this.state.isLoading ? <Spinner /> : this.renderLatestNews(this.state.data)}</ListGroup>
        );
    }
}

export default LatestNews;
