import React, { Component } from 'react';

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
      fetch(`https://aviline.herokuapp.com/api/category`)
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
            that.setState({ categories: res, loadCategories: false});
        });
    }
    catch (e) { }
  }

  
  async getColumns(that) {
    try {
      fetch(`https://aviline.herokuapp.com/api/column-author`)
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
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
      that.state.categories.map((category) => <a href={`/categories/${category.name}`} key={category.name}><DropdownItem>{category.name}</DropdownItem></a>);
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
          <NavbarBrand><Image src="/logo.png" id='logo' style={{boxShadow:'2px 2px 18px black'}} /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem >
               <NavLink href="/" id='linkNav'>Home</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/events" id='linkNav'>Eventos</NavLink>
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
