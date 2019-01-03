import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import Spinner from './Spinner';

import { Image } from 'react-bootstrap';
import '../styles/Navbar.css';
class Bar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      categories: '',
      columns: '',
      loadCategories: true,
      loadColumn: true
    };
  }


  async getCategories(that) {
    try {
      fetch(`http://aviline.herokuapp.com/api/category`)
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          res.length === 0 ? that.setState({ loadCategories: false }) :
            that.setState({ categories: res, loadCategories: false});
        });
    }
    catch (e) { }
  }

  
  async getColumns(that) {
    try {
      fetch(`http://aviline.herokuapp.com/api/column-author`)
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          res.length === 0 ? that.setState({ loadColumn: false }) :
            that.setState({ columns: res, loadColumn: false});
        });
    }
    catch (e) { }
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderCategories(that) {
    return that.state.loadCategories ? <Spinner /> :
      that.state.categories.map((category) => <a href={`/categories/${category.name}`}><DropdownItem>{category.name}</DropdownItem></a>);
  }

  renderColumns(that) {
    return that.state.loadColumn ? <Spinner /> :
      that.state.columns.map((author) => <a href={`/columns/${author.slug}`}><DropdownItem>{`${author.name}`}</DropdownItem></a>);
  }


  render() {

    this.state.loadCategories && this.getCategories(this);
    this.state.loadColumn && this.getColumns(this);

 
    return (
      <div>
        <Navbar color="danger" dark expand="md">
          <NavbarBrand><Image src="/logo.png" id='logo' /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem >
                <Link to="/" className="Navlink"><NavLink id='linkNav'>Home</NavLink></Link>
              </NavItem>

              <NavItem>
                <Link to="/events" className="Navlink" ><NavLink id='linkNav'>Eventos</NavLink></Link>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle id='linkNav' nav caret >
                  Colunas
              </DropdownToggle>
                <DropdownMenu right>
                  {this.renderColumns(this)}
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle id='linkNav' nav caret >
                  Categorias
              </DropdownToggle>
                <DropdownMenu right>
                  {this.renderCategories(this)}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Bar;
