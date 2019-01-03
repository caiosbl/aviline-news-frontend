import React, { Component } from 'react';
import ColumnItem from './ColumnItem';
import NotFound from './NotFound';
import Spinner from './Spinner';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody, Input, Label, Button, Container, Col as ColR, Row as RowR } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import { Visible, Hidden } from 'react-grid-system';
import StickyBox from "react-sticky-box/dist/esnext";



class Columns extends Component {

    constructor(props) {
        super(props);
        this.state = {
            load: true,
            loadAuthor: true,
            posts: "",
            notFound: false,
            titleSearch: "",
            author: "",
            filtered: [],
        };

        this.filterByTitle = this.filterByTitle.bind(this);
        this.handlerTitle = this.handlerTitle.bind(this);

    }

    componentDidMount() {
        document.title = "Portal Aviline";
    }


    async getAuthorData(that) {
        const author = that.props.match.params.id;
        fetch(`http://admin.aviline.com.br/api/column-author/${author}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                res.length === 0 ? that.setState({ notFound: true, loadAuthor: false }) :
                    that.setState({ author: res[0], loadAuthor: false });
            });
    }


    async getData(that) {

        const author = that.props.match.params.id;
        fetch(`http://aviline.herokuapp.com/api/column`)
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                const data = res.filter((post) => post.author.slug === author);
                that.setState({ posts: data, filtered: data, load: false });


            });
    }

    handlerTitle(e) {
        const title = e.target.value;
        this.setState({ titleSearch: title });
        this.filterByTitle(title);
    }


    filterByTitle(title) {
        const filteredData = this.state.posts.filter(e => e.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
        this.setState({ filtered: title.trim() === '' ? this.state.posts : filteredData });
    }


    getFilterCard(that) {
        return (
            <Card style={{ margin: 20 }} id="filterCard">
                <CardHeader style={{ backgroundColor: '#dc3545', color: 'white', fontFamily: 'Squada One, cursive' }}>
                    <h3><span style={{ marginRight: 4 }}><MaterialIcon icon="search" color="white" size={20} /></span>Filtrar Posts</h3></CardHeader>
                <CardBody>

                    <Label for="title">Filtrar por Título:</Label>
                    <Input type="text" name="title"
                        value={this.state.titleSearch}
                        style={{ marginTop: 10 }}
                        placeholder={'Digite o título que deseja buscar ...'}
                        onChange={this.handlerTitle}>
                    </Input>


                </CardBody>
            </Card>

        );
    }

    getBreadcrumb() {
        return (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Colunas</BreadcrumbItem>
            </Breadcrumb>
        );
    }

    renderItems(posts) {
        return (
            posts.length === 0 ?
                <h3 style={{ fontFamily: 'Roboto Condensed, sans-serif', margin: 20 }}>
                    Ops, não há resultados....
            </h3> :
                posts.map((post) => { return <ColumnItem data={post} /> }))

            ;
    }


    getHeader(that) {

        const author = that.state.author;


        return (that.state.loadAuthor ? <Spinner /> :
            <Container style={{ background: '#dc3545',
             borderRadius: 5,
              paddingTop: 20,
               paddingBottom: 20,
              textShadow: '5px 5px 35px black' }}>
                <RowR>

                    <ColR style={{
                        fontFamily: 'Squada One, cursive',
                        color: 'white',
                    }}>
                        <RowR>
                            <ColR md={2} sm={6} xs={6}>
                                <Image src={author.image.url} style={{ width: '80%', height: '120px', borderRadius: '50%' }} />
                            </ColR>
                            <ColR md={10} sm={6} xs={6}>
                                <Visible xs sm>
                                    <h1 style={{ fontSize: '200%', marginTop: '10%' }}>Coluna do {author.name}</h1>
                                </Visible>
                                <Hidden xs sm>
                                    <h1 style={{ fontSize: '300%', marginTop: '3.5%' }}>Coluna do {author.name}</h1>
                                </Hidden>
                            </ColR>
                        </RowR>



                    </ColR>
                </RowR>

            </Container>




        );
    }



    render() {
        this.state.load && this.getData(this);
        this.state.loadAuthor && this.getAuthorData(this);
        const posts = this.state.filtered;

        return (
            <Grid>


                {this.state.notFound ? <NotFound /> :
                    this.state.load ? <Spinner /> : <div>

                        <Row>
                            <Col xs={12} md={12} >
                                {this.getBreadcrumb()}
                                {this.getHeader(this)}
                            </Col>
                        </Row>


                        <Row>

                            <Col xs={4} md={4} >
                                <StickyBox>{this.getFilterCard(this)}</StickyBox>
                            </Col>
                            <Col xs={8} md={8} id="col" >
                                {this.renderItems(posts)}
                            </Col>
                        </Row>
                    </div>

                }

            </Grid>

        );
    }
}

export default Columns;
