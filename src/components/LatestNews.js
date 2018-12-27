import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Table, Card, CardHeader, CardBody } from 'reactstrap';
import Spinner from './Spinner';
import Moment from 'react-moment';
import MaterialIcon from 'material-icons-react';


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
        return (
            <Card>
                <CardHeader tag="h6" id="LatestNewsTitle">
                    <span style={{ marginTop: 20 }}>
                        <MaterialIcon icon="history" color="white" />
                    </span> <span style={{ fontSize: 26 }}>Mais Notícias</span>
                </CardHeader>

                <CardBody>
                    {newsList.map((news) => {
                        if (cont < 10)
                            return (
                            <tr>
                                <th scope="row" style={{width:200}}>
                                    <span style={{ marginRight: 10 }}><MaterialIcon icon="hquery_builder" color="grey" size={10} /></span>
                                    <span><Moment format="DD/MM" style={{ color: "grey", fontSize: 14 }}>{news.publishedDate.slice(0, 10)}</Moment>
                                    </span>
                                </th>
                                <td> <Link to={'news/' + news.slug}> {news.title}</Link></td>
                                
                            </tr>);
                    })}
                </CardBody>
                
            </Card>);
    }

    render() {
        this.state.isLoading && this.getData(this);
        return (
            <Table>{this.state.isLoading ? <Spinner /> : this.renderLatestNews(this.state.data)}</Table>
        );
    }
}

export default LatestNews;
