import "../styles/navBar.css";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function NavBar(props) {
  const { variant, bg } = props;

  const menuOptions = navBarOptions();

  return (
    <div style={{ position: "fixed", zIndex: 5, width: "100%" }}>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant={variant}
        bg={bg}
        className="container_navbar"
      >
        <Container style={{ justifyContent: "flex-end" }}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="linkNavBar">
                00 : Home
              </Link>
              <p className="divider">|</p>
              {menuOptions.length &&
                menuOptions.map((element, index) => {
                  return (
                    <Nav key={index}>
                      <Link
                        to={`/${element.route}`}
                        className="linkNavBar"
                        key={index}
                      >
                        {element.option}
                      </Link>
                      <p className="divider">|</p>
                    </Nav>
                  );
                })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

const navBarOptions = () => {
  return [
    {
      option: "01  :  GPU vs ASIC",
      route: "info",
    },
    {
      option: "02  :  Nuestros productos",
      route: "products",
    },
    {
      option: "03  :  FAQ",
      route: "faq",
    },
    {
      option: "04  :  Contacto",
      route: "contact",
    },
    {
      option: "Login",
      route: "login",
    },
  ];
};

export default NavBar;
