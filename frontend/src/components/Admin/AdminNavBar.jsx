import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../../assets/images/logoCompletoMinerPro.png";
import PasswordIcon from "@mui/icons-material/Password";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import LogoutIcon from "@mui/icons-material/Logout";

const ClientNavBar = ({ name }) => {
  const handleClick = () => {
    sessionStorage.removeItem("clientData");
    localStorage.removeItem("minerProAdminToken");
  };
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
              <Navbar.Text style={{ display: "flex" }}>
                <DropdownButton
                  align="end"
                  variant="secondary"
                  id="dropdown-basic-button"
                  title={name}
                >
                  <Dropdown.Item
                    href="/change-password"
                    style={{ padding: "1em", fontWeight: "bold" }}
                  >
                    <PasswordIcon style={{ marginRight: ".5em" }} />
                    Cambiar contraseña
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="/login"
                    onClick={handleClick}
                    style={{ color: "red", padding: "1em", fontWeight: "bold" }}
                  >
                    <LogoutIcon style={{ marginRight: ".5em" }} />
                    Cerrar sesión
                  </Dropdown.Item>
                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "1em",
                      fontSize: ".8rem",
                    }}
                  >
                    MinerPro Admin
                  </p>
                </DropdownButton>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default ClientNavBar;
