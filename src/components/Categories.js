import React, { Component } from 'react';
import EventItem from './EventItem';
import NotFound from './NotFound';
import Spinner from './Spinner';
import { Grid, Col, Row } from 'react-bootstrap';
import { Link,Redirect } from 'react-router-dom';
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
            filtered: [],
            redirect: false,
            redirectTo: '',
            flagRouteId: false,
            flagFirstFilter: false
        };

        this.handlerCategory = this.handlerCategory.bind(this);
    }


    async getCategories(that) {
        try {
            fetch(`http://aviline.herokuapp.com/api/category`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (res) {
                    const category = that.props.match.params.id;
                    const categoryState = that.state.category;

                    res.length === 0 ? that.setState({ notFound: true, loadCategory: false }) :
                        that.setState({ categories: res, loadCategory: false,
                             category: category === undefined ? res[0].name : categoryState
                        });
                     
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


    handlerCategory(e) {
        const category = e.target.value;
        this.filterByCategory(category,this);
    }


    includeCategory = (categories, category) => {
        for(var i = 0; i < categories.length ; i++){
            if(categories[i].name === category) return true;
        }

        return false;
     };

    filterByCategory(category,that) {
        const filteredData = that.state.posts.filter(e => that.includeCategory(e.categories,category));
        console.log(category);
        that.setState({ category: category,redirect: true, redirectRoute:`/categories/${category}` });
        that.setState({ filtered: category.trim() === '' ? that.state.filtered : filteredData, 
    flagRouteId: true,category:category, flagFirstFilter: true });
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
                        onChange={this.handlerCategory}>
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

    renderItems(posts) {
        return (
            posts.length === 0 ?
                <h3 style={{ fontFamily: 'Roboto Condensed, sans-serif', margin: 20 }}>
                    Ops, não há resultados....
            </h3> :
                posts.map((post) => { return <NewsItem data={post} /> }))


            ;
    }

    render() {

        this.state.loadPost && this.getPosts(this);
        this.state.loadCategory && this.getCategories(this);

        const load = this.state.loadPost || this.state.loadCategory;
        const category = this.props.match.params.id;
        const flagRouteId = this.state.flagRouteId;
        const flagFirstFilter = this.state.flagFirstFilter;

       !load && !flagRouteId && !this.state.redirect && category !== undefined && 
       this.filterByCategory(category,this);
       
       !load  && !flagFirstFilter && category === undefined && 
       this.filterByCategory(this.state.category,this);

        return (
            <Grid>

                {this.state.redirect && <Redirect to={this.state.redirectRoute}/>}
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

                                {this.renderItems(this.state.filtered)}
                            </Col>
                        </Row>
                }
            </Grid>

        );
    }
}

export default Categories;
