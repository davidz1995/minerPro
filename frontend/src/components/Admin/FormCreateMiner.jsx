import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/formProducts.css";
import { createMiner } from "../../redux/actions/actions";

const FormCreateMiner = ({ setShowCreateForm, setShowMessageCreate }) => {
  const dispatch = useDispatch();
  const [minerData, setMinerData] = useState({
    userId: "",
    name: "",
    placas: 0,
    id_simplemining: "",
    user_simplemining: "",
    pass_simplemining: "",
  });

  const users = useSelector((state) => state.users);
  const token = JSON.parse(localStorage.getItem("minerProAdminToken"));

  const handleChange = (event, name) => {
    setMinerData({
      ...minerData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createMiner(
        token,
        minerData.userId,
        minerData.name,
        minerData.placas,
        minerData.id_simplemining,
        minerData.user_simplemining,
        minerData.pass_simplemining
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
          <Form.Label className="label_form">Propietario</Form.Label>
          <Form.Select
            name="userId"
            onChange={(event) => handleChange(event, "userId")}
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
          <Form.Label className="label_form">Nombre minero</Form.Label>
          <Form.Control
            name="name"
            value={minerData.name}
            type="text"
            placeholder="Nombre minero ..."
            onChange={(event) => handleChange(event, "name")}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label_form">Placas</Form.Label>
          <Form.Select
            name="placas"
            onChange={(event) => handleChange(event, "placas")}
          >
            <option>Cantidad de placas</option>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label className="label_form">Id Simplemining</Form.Label>
          <Form.Control
            name="id_simplemining"
            value={minerData.id_simplemining}
            type="text"
            placeholder="Id Simplemining ..."
            onChange={(event) => handleChange(event, "id_simplemining")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label className="label_form">Usuario Simplemining</Form.Label>
          <Form.Control
            name="user_simplemining"
            value={minerData.user_simplemining}
            type="text"
            placeholder="Usuario Simplemining ..."
            onChange={(event) => handleChange(event, "user_simplemining")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label className="label_form">
            Contraseña Simplemining
          </Form.Label>
          <Form.Control
            name="pass_simplemining"
            value={minerData.pass_simplemining}
            type="text"
            placeholder="Contraseña Simplemining ..."
            onChange={(event) => handleChange(event, "pass_simplemining")}
          />
        </Form.Group>

        {minerData.userId.length &&
          minerData.name.length &&
          minerData.placas > 0 &&
          minerData.id_simplemining.length &&
          minerData.user_simplemining.length &&
          minerData.pass_simplemining.length && (
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Registrar minero
            </Button>
          )}
      </Form>
    </div>
  );
};

export default FormCreateMiner;
