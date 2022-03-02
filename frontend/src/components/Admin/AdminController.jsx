import React, { useState } from "react";
//import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Products from "./Products";
import Payout from "./Payout"
import Miners from "./MinersTable"
import "../../styles/admin.css";
import Users from "./Users";
import HdrWeakIcon from '@mui/icons-material/HdrWeak';

const AdminController = () => {
  const [show, setShow] = useState(true);
  const [state, setState] = useState("viewUsersAdmin");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let controllerVariants = [
    { value: "viewUsersAdmin", placeholder: "Usuarios" },
    { value: "viewPayoutsAdmin", placeholder: "Pagos" },
    { value: "viewMinersAdmin", placeholder: "Mineros" },
    { value: "viewProductsAdmin", placeholder: "Productos" },
  ];

  return (
    <>
      <button className="button_menu_admin" onMouseOver={handleShow}></button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontWeight:'bold',}}>MinerPro Admin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ display: "flex", flexDirection: "column" }}>
          {controllerVariants.map((variant, index) => {
            return (
              <button
                key={index}
                className="button_controller_admin"
                onClick={() => setState(variant.value)}
              ><HdrWeakIcon/>
               &nbsp; {variant.placeholder}
              </button>
            );
          })}
        </Offcanvas.Body>
      </Offcanvas>
      {/* Aca van las opciones para manejar productos, usuarios, etc... */}
      {state === "viewProductsAdmin" && <Products />}
      {state === "viewUsersAdmin" && <Users />}
      {state === "viewPayoutsAdmin" && <Payout/>}
      {state === "viewMinersAdmin" && <Miners/>}
    </>
  );
};

export default AdminController;
