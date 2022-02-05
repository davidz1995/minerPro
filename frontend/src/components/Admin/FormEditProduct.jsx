import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FormEditProduct = () => {
  return (
    <div style={{position:'absolute', marginTop:'1em'}}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingresa el nombre" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="text" placeholder="Descripción" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="text" placeholder="Precio" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Imágen</Form.Label>
          <Form.Control type="text" placeholder="Imágen" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cantidad de tarjetas</Form.Label>
          <Form.Select >
            <option disabled>Cantidad</option>
            <option>2</option>
            <option>4</option>
            <option>6</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FormEditProduct;
