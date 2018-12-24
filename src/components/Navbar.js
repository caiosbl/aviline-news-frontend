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

import { Image} from 'react-bootstrap';
import '../styles/Navbar.css';
class Bar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="danger" dark expand="md">
          <NavbarBrand><Image src="/logo.png" id='logo' /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" className="Navlink"><NavLink>Home</NavLink></Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Categorias
              </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Notícias
                </DropdownItem>
                  <DropdownItem>
                    Option 2
                </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                </DropdownItem>
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
