import React, { Component } from 'react';
import { Card, CardBody,  CardHeader, CardText } from 'reactstrap';
import { Row, Grid } from 'react-bootstrap';
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

const RowQuotationStyle = {
    background: '#ffe6e6',
    borderBottom: '1px solid #ff6666'
};

const RowContentStyle = {
    padding: 5
};

const PriceStyle = {
    fontFamily: 'Squada One',
    marginLeft: '10%',
    fontSize: 30

};

const TitleStyle = {
    fontFamily: 'Teko, sans-serif',
    fontSize: 20
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
        startDate_.setDate(startDate_.getDate() - 7);
        const startDate = that.getDate(startDate_);
        const finalDate = that.getDate(new Date());

        try {

            request();

            function request() {
                fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${startDate}'&@dataFinalCotacao='${finalDate}'&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda`)
                    .then(function (response) {
                        return response.json();
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
                    <Grid style={{ fontFamily: 'Roboto Condensed' }}>

                        <Row style={HeaderQuotationStyle}>
                            <CardText> <span><b>Dólar(PTAX)</b></span>
                                <small style={{ marginLeft: 10 }}>Fonte: Banco Central</small> </CardText>
                        </Row>

                        {loadDolar ? <Spinner /> :
                            <div><Row style={RowQuotationStyle}><h6 style={RowContentStyle}>
                            <span style={TitleStyle}>Compra</span> <span style={PriceStyle}>R${this.state.dolarBuy.toFixed(4)}</span></h6></Row>
                                <Row style={RowQuotationStyle}><h6 style={RowContentStyle}><span style={TitleStyle}>Venda</span> <span style={PriceStyle}>R${this.state.dolarSell.toFixed(4)}</span></h6></Row></div>}

                        <Row style={HeaderQuotationStyle}>
                            <CardText> <span><b>Frango (KG)</b></span> <small style={{ marginLeft: 10 }}>Fonte: CEPEA</small> </CardText>
                        </Row>


                        {loadFrozenChicken ? <Spinner /> : <Row style={RowQuotationStyle}>
                        <h6 style={RowContentStyle}><span style={TitleStyle}>Congelado</span> <span style={PriceStyle}>R${this.state.frozenChicken}</span></h6></Row>}
                        {loadColdChicken ? <Spinner /> : <Row style={RowQuotationStyle}><h6 style={RowContentStyle}><span style={TitleStyle}>Resfriado</span> <span style={PriceStyle}>R${this.state.coldChicken}</span></h6></Row>}

                        <Row style={HeaderQuotationStyle}>
                            <CardText>
                                <span><b>Milho</b></span>
                                <small style={{ marginLeft: 10 }}>Fonte: CEPEA</small> </CardText>
                        </Row>
                        {loadCorn ? <Spinner /> : <Row style={RowQuotationStyle}><h6 style={RowContentStyle}><span style={TitleStyle}>SC de 60KG</span> <span style={PriceStyle}>R${this.state.corn}</span></h6></Row>}

                        <Row style={HeaderQuotationStyle}>
                            <CardText>
                                <span><b>Soja (SC de 60KG)</b></span>
                                <small style={{ marginLeft: 10 }}>Fonte: CEPEA</small> </CardText>
                        </Row>

                        {loadSoy ? <Spinner/> : <Row style={RowQuotationStyle}><h6 style={RowContentStyle}><span style={TitleStyle}>PR</span> <span style={PriceStyle}>R${this.state.soy}</span></h6> </Row>}
                        {loadSoyPort ? <Spinner/> : <Row style={RowQuotationStyle}> <h6 style={RowContentStyle}><span style={TitleStyle}>Paranaguá</span> <span style={PriceStyle}>R${this.state.soyPort}</span></h6> </Row>}

                    </Grid>
                </CardBody>
            </Card>
        );
    }
}

export default CardQuotation;
