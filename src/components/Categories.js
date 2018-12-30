import React, { Component } from 'react';
import EventItem from './EventItem';
import NotFound from './NotFound';
import Spinner from './Spinner';
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody, Input, Label, Button } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import StickyBox from "react-sticky-box/dist/esnext";
import NewsItem from './NewsItem';



class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadCategory: true,
            loadPost: true,
            posts: "",
            notFound: false,
            categories: "",
            category: "",
            filtered: []
        };
    }


    async getCategories(that) {
        try {
            fetch(`http://aviline.herokuapp.com/api/category`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (res) {
                    res.length === 0 ? that.setState({ notFound: true, loadCategory: false }) :
                        that.setState({ categories: res, loadCategory: false, category: res[0].name });
                });
        }
        catch (e) { }
    }

    async getPosts(that) {

        try {
            fetch(`http://aviline.herokuapp.com/api/post`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (res) {
                    res.length === 0 ? that.setState({ notFound: true, loadPost: false }) :
                        that.setState({ posts: res, filtered: res, loadPost: false });
                });

        }
        catch (e) { }
    }


    renderCategoriesOptions(that) {
        return (that.state.categories.map((category) => <option>{category.name}</option>));
    }


    getFilterCard(that) {
        return (
            <Card style={{ margin: 20 }} id="filterCard">
                <CardHeader style={{ backgroundColor: '#CC0000', color: 'white', fontFamily: 'Squada One, cursive' }}>
                    <h3><span style={{ marginRight: 4 }}><MaterialIcon icon="search" color="white" size={20} /></span>Filtrar</h3></CardHeader>
                <CardBody>
                    <Label for="exampleSelect">Filtrar por Categoria:</Label>
                    <Input type="select" name="select"
                        value={this.state.category}
                        onChange={(e) => this.setState({ category: e.target.value })}>
                        {that.renderCategoriesOptions(that)}
                    </Input>
                </CardBody>
            </Card>

        );
    }

    getBreadcrumb() {
        return (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Categorias</BreadcrumbItem>
            </Breadcrumb>
        );
    }

    renderItems(posts){
        return(
            posts.length === 0 ? 
            <h3  style={{ fontFamily: 'Roboto Condensed, sans-serif',margin:20 }}>
            Ops, não há resultados....
            </h3>:
            posts.map((post) => { return <NewsItem data={post} /> }))
        
        
        ;
    }

    render() {

        this.state.loadPost && this.getPosts(this);
        this.state.loadCategory && this.getCategories(this);

        const load = this.state.loadPost || this.state.loadCategory;

        return (
            <Grid>
                <Row>
                    <Col xs={12} md={12} >
                        {this.getBreadcrumb()}
                    </Col>
                </Row>

                {this.state.notFound ? <NotFound /> :
                    load ? <Spinner /> :
                        <Row>

                            <Col xs={4} md={4} >
                                <StickyBox>   {this.getFilterCard(this)} </StickyBox>
                            </Col>
                            <Col xs={8} md={8} id="col" >

                            {this.renderItems(this.state.posts)}
                            </Col>
                        </Row>
                }
            </Grid>

        );
    }
}

export default Categories;
