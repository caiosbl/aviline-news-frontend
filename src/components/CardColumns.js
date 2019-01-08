import React, { Component } from 'react';
import { Card, CardBody, Badge, CardHeader, CardText, Container, Row, Col } from 'reactstrap';
import { Image } from 'react-bootstrap';
import Spinner from './Spinner';
import '../styles/CardSpotlightNews.css';
import MaterialIcon from 'material-icons-react';
import { Visible, Hidden } from 'react-grid-system';
import { Link } from 'react-router-dom';
import ItemCardColumn from './ItemCardColumn';



const HeaderQuotationStyle = {
    width: 'auto',
    color: '#dc3545',
    borderBottom: '3px solid #dc3545',
    marginTop: 3
};


class CardColumns extends Component {


    constructor(props) {
        super(props);
        this.state = {
            columns: '',
            load: true,
            color: 'white',
            shadow: ''

        };

        this.renderItems = this.renderItems.bind(this);
    }



    async getColumns(that) {

        fetch(`https://aviline.herokuapp.com/api/column-author`)
            .then(function (response) {
                return response.json();
            }).then(function (res) {
                that.setState({ columns: res, load: false });
            });
    }

    renderItems() {

        const columns = this.state.columns;
        return (columns.length === 0 ? <h5 style={{ fontFamily: 'Squada One, cursive'}}>Ops, ainda não há Colunas</h5> :
            columns.map((column) => <div style={{marginBottom: 10}}><ItemCardColumn key={column.slug} data={column} /></div>));
    }



    render() {

        this.state.load && this.getColumns(this);


        return (<Card>
            <CardHeader style={{ backgroundColor: '#dc3545' }}>
                <h4 style={{ fontFamily: 'Squada One, cursive', color: 'white' }}>
                    <span style={{ marginRight: 4 }}><MaterialIcon icon="contacts" color="white" size={20} /></span>
                    Colunas</h4></CardHeader>

            {this.state.load ?
                <Spinner /> :

                <CardBody>
                    <Container>
                        {this.renderItems()}
                    </Container>

                </CardBody>

            }


        </Card>
        );
    }
}

export default CardColumns;
