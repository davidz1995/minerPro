import React, { useState } from "react";
//import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Products from "./Products";
import "../../styles/admin.css";
import Users from "./Users";

const AdminController = () => {
  const [show, setShow] = useState(true);
  const [state, setState] = useState("viewUsersAdmin");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="button_menu_admin" onMouseOver={handleShow}></button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>MinerPro Admin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <button onClick={() => setState("viewUsersAdmin")}>Usuarios</button>
          <button onClick={() => setState("viewProductsAdmin")}>
            Productos
          </button>
        </Offcanvas.Body>
      </Offcanvas>
      {/* Aca van las opciones para manejar productos, usuarios, etc... */}
      {state === "viewProductsAdmin" && <Products />}
      {state === "viewUsersAdmin" && <Users />}
    </>
  );
};

export default AdminController;
