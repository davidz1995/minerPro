import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../../assets/images/logoCompletoMinerPro.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ClientNavBar = ({ name }) => {
    const handleClick = () => {
        sessionStorage.removeItem("minerProAdmin")
        localStorage.removeItem("minerProAdminToken")
    }
  return (
    <div>
      <Navbar bg="light" variant="white">
        <Container>
          <Navbar.Brand href="/panelAdmin">
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
                  onClick={handleClick}
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
