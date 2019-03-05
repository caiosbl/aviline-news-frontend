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
            data: props.data,
            isLoading: true
        };

    }

     getData(that) {
         const data = that.state.data;

        if(data.length > 0)
            that.setState({ isLoading: false });
    
    }

    renderLatestNews(newsList) {
        var cont = 0;
        return (
            <Card>
                <CardHeader tag="h6" id="LatestNewsTitle">
                    <span style={{ marginTop: 20 }}><MaterialIcon icon="history" color="white" /></span> 
                    <span style={{ fontSize: 26 }}>Mais Notícias</span>
                </CardHeader>

                <CardBody>
                    {newsList.map((news) => {
                        cont++; 
                        if ( cont > 11 && cont < 25)
                            return (
                            <tr key={news.slug}>
                                <th scope="row" style={{width:100}}>
                                    <span style={{ marginRight: 10 }}><MaterialIcon icon="hquery_builder" color="grey" size={10} /></span>
                                    <span><Moment format="DD/MM" style={{ color: "grey", fontSize: 14 }}>{news.publishedDate.slice(0, 10)}</Moment>
                                    </span>
                                </th>
                                <td style={{width:600}}> <Link to={'news/' + news.slug}>{news.title}</Link></td>
                                
                            </tr>);

                            else return "";
                    })}
                </CardBody>
                
            </Card>);
    }

    render() {
        this.state.isLoading && this.getData(this);
        return (
            this.state.isLoading ? <Spinner /> : <Table>{this.renderLatestNews(this.state.data)}</Table>
        );
    }
}

export default LatestNews;
