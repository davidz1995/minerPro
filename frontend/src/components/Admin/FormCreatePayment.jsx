import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/formProducts.css";
import { createPayment } from "../../redux/actions/actions";

const FormCreatePayment = ({ setShowCreateForm, setShowMessageCreate }) => {
  const dispatch = useDispatch();
  const [paymentData, setPaymentData] = useState({
    id: "",
    date: "",
    usd: 0,
    eth: 0,
  });

  const users = useSelector((state) => state.users);
  const token = JSON.parse(localStorage.getItem("minerProAdminToken"));

  const handleChange = (event, name) => {
    setPaymentData({
      ...paymentData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createPayment(
        token,
        paymentData.id,
        paymentData.date,
        JSON.stringify(paymentData.usd),
        JSON.stringify(paymentData.eth)
      )
    );
    setShowCreateForm(false);
    setShowMessageCreate(true);
  };

  return (
    <div className="standard_form_container" style={{ marginLeft: "30%" }}>
      <button
        onClick={() => setShowCreateForm(false)}
        style={{
          position: "fixed",
          top: 0,
          marginTop: "2%",
          marginLeft: "10%",
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
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="label_form">Nombre</Form.Label>
          <Form.Select
            name="id"
            onChange={(event) => handleChange(event, "id")}
          >
            <option>Usuarios</option>
            {users &&
              users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.lastName}
                  </option>
                );
              })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label_form">Fecha</Form.Label>
          <Form.Control
            name="date"
            value={paymentData.date}
            type="date"
            placeholder="Fecha ..."
            onChange={(event) => handleChange(event, "date")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label className="label_form">USD</Form.Label>
          <Form.Control
            name="usd"
            value={paymentData.usd}
            type="number"
            placeholder="USD ..."
            onChange={(event) => handleChange(event, "usd")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label className="label_form">ETH</Form.Label>
          <Form.Control
            name="eth"
            value={paymentData.eth}
            type="number"
            placeholder="ETH ..."
            onChange={(event) => handleChange(event, "eth")}
          />
        </Form.Group>

        {paymentData.id.length &&
          paymentData.date.length &&
          paymentData.usd > 0 &&
          paymentData.eth > 0 && (
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Registrar pago
            </Button>
          )}
      </Form>
    </div>
  );
};

export default FormCreatePayment;
