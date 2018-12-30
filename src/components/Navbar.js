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
      load: true
    };
  }


  async getCategories(that) {
    try {
      fetch(`http://aviline.herokuapp.com/api/category`)
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          res.length === 0 ? that.setState({ load: false }) :
            that.setState({ categories: res, load: false});
        });
    }
    catch (e) { }
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderCategories(that) {

    return that.state.load ? <Spinner /> :
      that.state.categories.map((category) => <Link to={`/categories/${category.name}`}><DropdownItem>{category.name}</DropdownItem></Link>);

  }


  render() {

    this.state.load && this.getCategories(this);
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

              <NavItem>
                <Link to="/columns" className="Navlink"><NavLink id='linkNav'>Colunas</NavLink></Link>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle id='linkNav' nav caret>
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
