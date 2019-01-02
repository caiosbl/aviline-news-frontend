import React, { Component } from 'react';
import { Card, CardBody, Badge, CardHeader, CardText } from 'reactstrap';
import { Row, Grid, Col } from 'react-bootstrap';
import Spinner from './Spinner';
import '../styles/CardSpotlightNews.css';
import MaterialIcon from 'material-icons-react';
import renderHTML from 'react-render-html';


const HeaderQuotationStyle = {
    width: 'auto',
    color: '#dc3545',
    borderBottom: '3px solid #dc3545',
    marginTop: 3
};


class CardQuotation extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dolarBuy: '',
            dolarSell: '',
            frozenChicken: '',
            coldChicken: '',
            corn: '',
            soy: '',
            soyPort: ''

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

        var startDate_ = new Date();
        startDate_.setDate(startDate_.getDate() - 4);
        const startDate = that.getDate(startDate_);
        const finalDate = that.getDate(new Date());

        try {

            request();

            function request() {
                fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${startDate}'&@dataFinalCotacao='${finalDate}'&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda`)
                    .then(function (response) {
                      console.log(response);
                        return response.json() ;
                    })
                    .then(function (res) {

                        const index = res.value.length - 1;

                            const dolarBuy = res.value[index].cotacaoCompra;
                            const dolarSell = res.value[index].cotacaoVenda;
                            that.setState({ dolarBuy: dolarBuy, dolarSell: dolarSell });
                        }
                    );

            }


        }
        catch (e) { }

    }


    async getFrozenChickenQuotation(that) {

        fetch(`https://www.cepea.esalq.usp.br/br/widgetproduto.js.php?fonte=arial&tamanho=10&largura=400px&corfundo=dbd6b2&cortexto=333333&corlinha=ede7bf&id_indicador%5B%5D=181`)
            .then(function (response) {
                return response.text();
            }).then(function (res) {
                const resp = res.slice(16, res.length - 2);
                const html = renderHTML(resp);
                const value = html[1].props.children[3].props.children[0].props.children[2].props.children[1].props.children[0];
                that.setState({ frozenChicken: value });

            });
    }

    async getColdChickenQuotation(that) {

        fetch(`https://www.cepea.esalq.usp.br/br/widgetproduto.js.php?fonte=arial&tamanho=10&largura=400px&corfundo=dbd6b2&cortexto=333333&corlinha=ede7bf&id_indicador%5B%5D=130`)
            .then(function (response) {
                return response.text();
            }).then(function (res) {
                const resp = res.slice(16, res.length - 2);
                const html = renderHTML(resp);
                const value = html[1].props.children[3].props.children[0].props.children[2].props.children[1].props.children[0];
                that.setState({ coldChicken: value });

            });
    }

    async getCornQuotation(that) {

        fetch(`https://www.cepea.esalq.usp.br/br/widgetproduto.js.php?fonte=arial&tamanho=10&largura=400px&corfundo=dbd6b2&cortexto=333333&corlinha=ede7bf&id_indicador%5B%5D=77`)
            .then(function (response) {
                return response.text();
            }).then(function (res) {
                const resp = res.slice(16, res.length - 2);
                const html = renderHTML(resp);
                const value = html[1].props.children[3].props.children[0].props.children[2].props.children[1].props.children[0];
                that.setState({ corn: value });

            });
    }

    async getSoyQuotation(that) {

        fetch(`https://www.cepea.esalq.usp.br/br/widgetproduto.js.php?fonte=arial&tamanho=10&largura=400px&corfundo=dbd6b2&cortexto=333333&corlinha=ede7bf&id_indicador%5B%5D=12`)
            .then(function (response) {
                return response.text();
            }).then(function (res) {
                const resp = res.slice(16, res.length - 2);
                const html = renderHTML(resp);
                const value = html[1].props.children[3].props.children[0].props.children[2].props.children[1].props.children[0];
                that.setState({ soy: value });

            });
    }

    async getSoyPortQuotation(that) {

        fetch(`https://www.cepea.esalq.usp.br/br/widgetproduto.js.php?fonte=arial&tamanho=10&largura=400px&corfundo=dbd6b2&cortexto=333333&corlinha=ede7bf&id_indicador%5B%5D=92`)
            .then(function (response) {
                return response.text();
            }).then(function (res) {
                const resp = res.slice(16, res.length - 2);
                const html = renderHTML(resp);
                const value = html[1].props.children[3].props.children[0].props.children[2].props.children[1].props.children[0];
                that.setState({ soyPort: value });

            });
    }

    render() {

        const loadDolar = this.state.dolarBuy === '';
        const loadFrozenChicken = this.state.frozenChicken === '';
        const loadColdChicken = this.state.coldChicken === '';
        const loadCorn = this.state.corn === '';
        const loadSoy = this.state.soy === '';
        const loadSoyPort = this.state.soyPort === '';


        loadDolar && this.getDolarQuotation(this);
        loadFrozenChicken && this.getFrozenChickenQuotation(this);
        loadColdChicken && this.getColdChickenQuotation(this);
        loadCorn && this.getCornQuotation(this);
        loadSoy && this.getSoyQuotation(this);
        loadSoyPort && this.getSoyPortQuotation(this);


        return (



            <Card>
                <CardHeader style={{ backgroundColor: '#dc3545' }}>
                    <h4 style={{ fontFamily: 'Squada One, cursive', color: 'white' }}>
                        <span style={{ marginRight: 4 }}><MaterialIcon icon="trending_up" color="white" size={20} /></span>
                        Cotações</h4></CardHeader>

                <CardBody>
                    <Grid>

                        <Row style={HeaderQuotationStyle}>
                            <CardText style={{ fontFamily: 'Roboto Condensed' }}> <span><b>Dólar(PTAX)</b></span> 
                            <small style={{ marginLeft: 10 }}>Fonte: Banco Central</small> </CardText>
                        </Row>

                        {loadDolar ? <Spinner /> :
                            <Row>

                                <Col style={{ fontFamily: 'Roboto Condensed', marginLeft: 20 }}>

                                    <Badge color='danger' style={{ marginTop: 5 }}>
                                        <h6 style={{ padding: 5 }}>Compra</h6>
                                        <h4 style={{ margin: 10, textShadow: '5px 5px 18px black' }}>R$ {this.state.dolarBuy.toFixed(4)}</h4>

                                    </Badge>

                                </Col>

                                <Col style={{ fontFamily: 'Roboto Condensed', marginLeft: 20 }}>

                                    <Badge color='danger' style={{ marginTop: 5 }}>
                                        <h6 style={{ padding: 5 }}>Venda</h6>
                                        <h4 style={{ margin: 10, textShadow: '5px 5px 18px black' }}>R$ {this.state.dolarSell.toFixed(4)}</h4>

                                    </Badge>

                                </Col>
                            </Row>}

                        <Row
                            style={HeaderQuotationStyle}
                        >
                            <CardText style={{ fontFamily: 'Roboto Condensed' }}> <span><b>Frango (KG)</b></span> <small style={{ marginLeft: 10 }}>Fonte: CEPEA</small> </CardText>
                        </Row>

                        <Row>
                            {loadFrozenChicken ? <Spinner /> :

                                <Col style={{ fontFamily: 'Roboto Condensed', marginLeft: 20 }}>

                                    <Badge color='danger' style={{ marginTop: 5 }}>
                                        <h6 style={{ padding: 5 }}>Congelado</h6>
                                        <h4 style={{ margin: 10, textShadow: '5px 5px 18px black' }}>R$ {this.state.frozenChicken}</h4>
                                    </Badge>
                                </Col>}

                            {loadColdChicken ? <Spinner /> :
                                <Col style={{ fontFamily: 'Roboto Condensed', marginLeft: 20 }}>

                                    <Badge color='danger' style={{ marginTop: 5 }}>
                                        <h6 style={{ padding: 5 }}>Resfriado</h6>
                                        <h4 style={{ margin: 10, textShadow: '5px 5px 18px black' }}>R$ {this.state.coldChicken}</h4>
                                    </Badge>
                                </Col>}
                        </Row>


                        <Row
                            style={HeaderQuotationStyle}
                        >
                            <CardText style={{ fontFamily: 'Roboto Condensed' }}>
                                <span><b>Milho</b></span>
                                <small style={{ marginLeft: 10 }}>Fonte: CEPEA</small> </CardText>
                        </Row>

                        <Row>
                            {loadCorn ? <Spinner /> :

                                <Col style={{ fontFamily: 'Roboto Condensed', marginLeft: 20 }}>

                                    <Badge color='danger' style={{ marginTop: 5 }}>
                                        <h6 style={{ padding: 5 }}>SC de 60KG</h6>
                                        <h4 style={{ margin: 10, textShadow: '5px 5px 18px black' }}>R$ {this.state.corn}</h4>
                                    </Badge>
                                </Col>}


                        </Row>

                        <Row
                            style={HeaderQuotationStyle}
                        >
                            <CardText style={{ fontFamily: 'Roboto Condensed' }}>
                                <span><b>Soja (SC de 60KG)</b></span>
                                <small style={{ marginLeft: 10 }}>Fonte: CEPEA</small> </CardText>
                        </Row>

                        <Row>
                            {loadSoy ? <Spinner /> :

                                <Col style={{ fontFamily: 'Roboto Condensed', marginLeft: 20 }}>

                                    <Badge color='danger' style={{ marginTop: 5 }}>
                                        <h6 style={{ padding: 5 }}> PR</h6>
                                        <h4 style={{ margin: 10, textShadow: '5px 5px 18px black' }}>R$ {this.state.soy}</h4>
                                    </Badge>
                                </Col>}

                            {loadSoyPort ? <Spinner /> :

                                <Col style={{ fontFamily: 'Roboto Condensed', marginLeft: 20 }}>

                                    <Badge color='danger' style={{ marginTop: 5 }}>
                                        <h6 style={{ padding: 5 }}> Paranaguá</h6>
                                        <h4 style={{ margin: 10, textShadow: '5px 5px 18px black' }}>R$ {this.state.soyPort}</h4>
                                    </Badge>
                                </Col>}


                        </Row>
                    </Grid>
                </CardBody>
            </Card>
        );
    }
}

export default CardQuotation;
