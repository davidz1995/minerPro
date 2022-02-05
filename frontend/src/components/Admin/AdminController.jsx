import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Products from "./Products";
import { setViewProductsAdmin } from "../../redux/actions/actions";

const AdminController = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  const state = useSelector((state) => state.selectedAdminController);

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
          <button onClick={() => dispatch(setViewProductsAdmin())}>
            opcion
          </button>
        </Offcanvas.Body>
      </Offcanvas>
      {/* Aca van las opciones para manejar productos, usuarios, etc... */}
      {state === "viewProductsAdmin" && <Products />}
    </>
  );
};

export default AdminController;
