import React, { Component } from 'react';
import { Card,CardBody, Badge, CardHeader } from 'reactstrap';
import { Row, Grid } from 'react-bootstrap';
import Spinner from './Spinner';
import '../styles/CardSpotlightNews.css';
import MaterialIcon from 'material-icons-react';



class CardQuotation extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dolarCompra: '',
            dolarVenda: ''

        };
    }


    getDate(date) {
        var today = date;
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        return mm + "-" + dd + "-" + yyyy;
    }


    async getDolarQuotation(that) {

        var date = that.getDate(new Date());

        request();

        function request() {
            fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (res) {

                    if (res.value.length === 0) {
                        var newDate = new Date();
                        newDate.setDate(newDate.getDate() - 1);
                        date = that.getDate(newDate);
                        request();
                    }

                    else {
                        const dolarCompra = res.value[0].cotacaoCompra;
                        const dolarVenda = res.value[0].cotacaoVenda;
                        that.setState({ dolarCompra: dolarCompra, dolarVenda: dolarVenda });
                    }
                });
        }

    }

    render() {

        const loadDolar = this.state.dolarCompra === '';
        loadDolar && this.getDolarQuotation(this);

        return (

            loadDolar ? <Spinner /> :

                <Card>
                    <CardHeader style={{ backgroundColor: '#CC0000' }}>
                        <h4 style={{ fontFamily: 'Squada One, cursive', color: 'white' }}>
                        <span style={{marginRight: 4}}><MaterialIcon icon="trending_up" color="white" size={20} /></span> 
                        Cotações</h4></CardHeader>
                    
                    <CardBody>

                        <Grid>
                            <Row>
                            <div style={{ fontFamily: 'Roboto Condensed',  marginLeft: 20 }}>
                                <h6 style={{ padding: 5 }}><MaterialIcon icon="attach_money" color="black" size={14} />Dolár  Compra</h6>
                                <Badge color='success'> <h4 style={{ margin: 10, textShadow: '5px 5px 18px black' }}>R$ {this.state.dolarCompra}</h4> </Badge>
                            </div>


                            <div style={{ height: 70, fontFamily: 'Roboto Condensed', marginBottom: 20 ,marginLeft: 20}}>
                                <h6 style={{ padding: 5 }}><MaterialIcon icon="attach_money" color="black" size={14} />Dolár Venda</h6>
                                <Badge color='success'> <h4 style={{ margin: 10, textShadow: '5px 5px 18px black' }}>R$ {this.state.dolarVenda}</h4> </Badge>
                            </div></Row>
                        </Grid>
                    </CardBody>
                </Card>
        );
    }
}

export default CardQuotation;
