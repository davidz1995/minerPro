import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../../assets/images/logoCompletoMinerPro.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ClientNavBar = ({ name }) => {
  return (
    <div>
      <Navbar bg="light" variant="white">
        <Container>
          <Navbar.Brand href="/panelClient">
            <img src={logo} alt="minerpro_logo" style={{ width: "5em" }} />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse
            className="justify-content-end"
            style={{ fontWeight: "bold" }}
          >
            {name && (
              <Navbar.Text>
                <AccountCircleIcon style={{ marginRight: ".5em" }} />
                {name}
                <a
                  href="/login"
                  style={{ marginLeft: "2em" }}
                  onClick={() => sessionStorage.removeItem("clientData")}
                >
                  Cerrar sesión
                </a>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default ClientNavBar;
