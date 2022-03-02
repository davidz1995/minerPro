import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/formProducts.css";
import { updateMiner } from "../../redux/actions/actions";

const FormEditMiner = ({
  miner,
  token,
  setShowEditForm,
  setShowMessageUpdate,
}) => {
  const dispatch = useDispatch();
  const [minerData, setMinerData] = useState({
    name: miner.name,
    placas: 0,
    id_simplemining: miner.id_simplemining,
    user_simplemining: miner.user_simplemining,
    pass_simplemining: miner.pass_simplemining,
  });
  const handleChange = (event, name) => {
    setMinerData({
      ...minerData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateMiner(
        token,
        miner.id,
        minerData.name,
        minerData.placas,
        minerData.id_simplemining,
        minerData.user_simplemining,
        minerData.pass_simplemining
      )
    );
    setShowEditForm(false);
    setShowMessageUpdate(true);
  };

  return (
    <div className="standard_form_container">
      <button
        onClick={() => setShowEditForm(false)}
        style={{
          position: "fixed",
          top: 0,
          marginTop: "2%",
          marginLeft: "13%",
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
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "1em" }}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="label_form">Nombre de minero</Form.Label>
              <Form.Control
                name="name"
                value={minerData.name}
                type="text"
                placeholder="Ingresa el nombre"
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
              <Form.Label className="label_form">
                Usuario Simplemining
              </Form.Label>
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
          </div>
        </div>
        {minerData.name.length &&
          minerData.placas > 0 &&
          minerData.id_simplemining.length &&
          minerData.user_simplemining.length &&
          minerData.pass_simplemining.length && (
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Actualizar
            </Button>
          )}
      </Form>
    </div>
  );
};

export default FormEditMiner;
