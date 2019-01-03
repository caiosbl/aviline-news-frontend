import React, { Component } from 'react';
import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import { Grid, Row,  Image } from 'react-bootstrap';
import Spinner from './Spinner';
import MaterialIcon from 'material-icons-react';



class ColumnCard extends Component {

    constructor(props) {
        super(props);


        this.state = {
            data: this.props.data
        };


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
        const postData = isLoading ? " " : this.props.data;
        const author = isLoading ? " " : postData.author.name;
        const content = isLoading ? " " : renderHTML(postData.content.extended);



        return (<Grid>

            <Row>
                <h1>{isLoading ? <Spinner /> : postData.title}</h1>
            </Row>

            <Row>
                {isLoading ? <Spinner /> :
                    <h6 style={{ fontFamily: 'Roboto Condensed, sans-serif', color: "#dc3545" }}>
                        <span style={{ marginRight: 4 }}>
                            <MaterialIcon icon="hquery_builder" color="#dc3545" size={11} /></span>
                        {<Moment locale="pt-br" format="D" withTitle>{postData.publishedDate}</Moment>} de {<Moment
                            locale="pt-br" format="MMMM" withTitle>{postData.publishedDate}</Moment>} de {<Moment
                                locale="pt-br" format="YYYY" withTitle>{postData.publishedDate}</Moment>}</h6>}

                {isLoading ? <Spinner /> : <h6 style={{ marginLeft: 12, color: "#dc3545", fontFamily: 'Roboto Condensed, sans-serif' }}>
                    <span style={{ marginRight: 4 }}>
                        <MaterialIcon icon="person" color="#dc3545" size={11} /></span>
                    {author}
                </h6>}


            </Row>

            <Row>{isLoading ? <Spinner /> : <h4 style={{
                fontFamily: 'Roboto Condensed',
                color: 'grey'
            }}>{renderHTML(postData.content.brief)}</h4>}</Row>

            <Row> {isLoading ? <Spinner /> : <div style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>{this.renderContent(content)}</div>}</Row>

        </Grid>

        );
    }
}

export default ColumnCard;
