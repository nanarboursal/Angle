import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink
} from "reactstrap";
import "./navbar.css";
import logo from "../../Images/angle.png";

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="user-nav">
      <Navbar light expand="sm">
        <NavbarBrand href="/">
          angle
          {/* <img className="navbar-brand" src={logo} alt="logo-img"></img> */}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem className="item-nav">
              <NavLink href="/ratings">Ratings</NavLink>
            </NavItem>
            <UncontrolledDropdown className="item-nav" nav inNavbar>
              <DropdownToggle nav caret>
                Profile
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/profile">View Profile</DropdownItem>
                <DropdownItem href="/ratings">Log Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown className="item-nav" nav inNavbar>
              <DropdownToggle nav caret>
                Sign In
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/signup">Sign Up</DropdownItem>
                <DropdownItem href="/login">Log In</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
