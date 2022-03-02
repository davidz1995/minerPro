import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/formProducts.css";
import { createProduct } from "../../redux/actions/actions";

const FormCreateProduct = ({
  token,
  setShowCreateForm,
  setShowMessageCreate,
}) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    thumbnail: "",
    numberOfCards: 0,
  });
  const handleChange = (event, name) => {
    setProductData({
      ...productData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(
        token,
        productData.name,
        productData.description,
        productData.price,
        productData.thumbnail,
        productData.numberOfCards
      )
    );
    setShowCreateForm(false);
    setShowMessageCreate(true);
  };

  return (
    <div className="standard_form_container">
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
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="label_form">Nombre</Form.Label>
          <Form.Control
            name="name"
            value={productData.name}
            type="text"
            placeholder="Ingresa el nombre del producto ..."
            onChange={(event) => handleChange(event, "name")}
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicDescription"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <Form.Label className="label_form">Descripción</Form.Label>
          <textarea
            name="description"
            style={{ height: "5em" }}
            value={productData.description}
            placeholder="Descripción ..."
            onChange={(event) => handleChange(event, "description")}
          ></textarea>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label className="label_form">Precio</Form.Label>
          <Form.Control
            name="price"
            value={productData.price}
            type="text"
            placeholder="Precio ..."
            onChange={(event) => handleChange(event, "price")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label className="label_form">Imágen</Form.Label>
          <Form.Control
            name="thumbnail"
            value={productData.thumbnail}
            type="text"
            placeholder="URL de imágen ..."
            onChange={(event) => handleChange(event, "thumbnail")}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label_form">Cantidad de tarjetas</Form.Label>
          <Form.Select
            name="numberOfCards"
            onChange={(event) => handleChange(event, "numberOfCards")}
          >
            <option>Cantidad</option>
            <option>2</option>
            <option>4</option>
            <option>6</option>
          </Form.Select>
        </Form.Group>
        {productData.name.length &&
          productData.description.length &&
          productData.price > 0 &&
          productData.thumbnail.length &&
          productData.numberOfCards > 0 && (
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Crear producto
            </Button>
          )}
      </Form>
    </div>
  );
};

export default FormCreateProduct;
