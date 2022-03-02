import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/formProducts.css";
import { createUser } from "../../redux/actions/actions";

const FormCreateUser = ({ token, setShowCreateForm, setShowMessageCreate }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    isAdmin: "",
    wallet: "",
    housing_fee: "",
  });
  const handleChange = (event, name) => {
    setUserData({
      ...userData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createUser(
        token,
        userData.name,
        userData.lastName,
        userData.email,
        userData.password,
        userData.isAdmin,
        userData.wallet,
        userData.housing_fee
      )
    );
    setShowCreateForm(false);
    setShowMessageCreate(true);
  };

  return (
    <div
      className="standard_form_container"
      style={{ width: "50%", marginLeft: "20%" }}
    >
      <button
        onClick={() => setShowCreateForm(false)}
        style={{
          position: "fixed",
          top: 0,
          marginTop: "2%",
          marginLeft: "20%",
          padding: "0 .5em 0 .5em",
          borderRadius: "20px",
          backgroundColor: "white",
          borderStyle: "solid",
          fontWeight: "bold",
          borderColor: "black",
        }}
      >
        X
      </button>
      <Form style={{ display: "flex" }}>
        <div style={{ marginRight: "1em" }}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="label_form">Nombre</Form.Label>
            <Form.Control
              name="name"
              value={userData.name}
              type="text"
              placeholder="Nombre ..."
              onChange={(event) => handleChange(event, "name")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label className="label_form">Apellido</Form.Label>
            <Form.Control
              name="lastName"
              value={userData.lastName}
              type="text"
              placeholder="Apellido ..."
              onChange={(event) => handleChange(event, "lastName")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label className="label_form">Email</Form.Label>
            <Form.Control
              name="email"
              value={userData.email}
              type="text"
              placeholder="Email ..."
              onChange={(event) => handleChange(event, "email")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label className="label_form">Housing Fee</Form.Label>
            <Form.Control
              name="housing_fee"
              value={userData.housing_fee}
              type="text"
              placeholder="Housing fee ..."
              onChange={(event) => handleChange(event, "housing_fee")}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label className="label_form">Contraseña</Form.Label>
            <Form.Control
              name="password"
              value={userData.password}
              type="text"
              placeholder="Contraseña ..."
              onChange={(event) => handleChange(event, "password")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="label_form">Admin</Form.Label>
            <Form.Select
              name="isAdmin"
              onChange={(event) => handleChange(event, "isAdmin")}
            >
              <option>Es administrador?</option>
              <option value={true}>Si</option>
              <option value={false}>No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label className="label_form">Wallet</Form.Label>
            <Form.Control
              name="wallet"
              value={userData.wallet}
              type="text"
              placeholder="Wallet ..."
              onChange={(event) => handleChange(event, "wallet")}
            />
          </Form.Group>

          {userData.name.length &&
            userData.lastName.length &&
            userData.email.length &&
            userData.password.length &&
            userData.isAdmin.length &&
            userData.wallet.length && 
            userData.housing_fee.length && (
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                style={{ width:'17em', marginTop:'2em'}}
              >
                Crear
              </Button>
            )}
        </div>
      </Form>
    </div>
  );
};

export default FormCreateUser;
