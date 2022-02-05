import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Products from "./Products";

const AdminController = () => {

  const [show, setShow] = useState(true);
  const [state, setState] = useState('dashboard')

  //const state = useSelector((state) => state.selectedAdminController);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="outline-light" onClick={handleShow}>
        Menu
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>MinerPro Admin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <button onClick={() => setState('viewProductsAdmin')}>
            Productos
          </button>
        </Offcanvas.Body>
      </Offcanvas>
      {/* Aca van las opciones para manejar productos, usuarios, etc... */}
      {state === "viewProductsAdmin" && <Products />}
    </>
  );
};

export default AdminController;
