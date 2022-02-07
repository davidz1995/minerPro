import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/formProducts.css";
import { updateProduct } from "../../redux/actions/actions";

const FormEditProduct = ({
  product,
  token,
  setShowEditForm,
  setShowMessageUpdate,
}) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    thumbnail: product.thumbnail,
    numberOfCards: product.numberOfCards,
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
      updateProduct(
        token,
        product._id,
        productData.name,
        productData.description,
        productData.price,
        productData.thumbnail,
        productData.numberOfCards
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
            placeholder="Ingresa el nombre"
            onChange={(event) => handleChange(event, "name")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label className="label_form">Descripción</Form.Label>
          <Form.Control
            name="description"
            value={productData.description}
            type="text"
            placeholder="Descripción"
            onChange={(event) => handleChange(event, "description")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label className="label_form">Precio</Form.Label>
          <Form.Control
            name="price"
            value={productData.price}
            type="text"
            placeholder="Precio"
            onChange={(event) => handleChange(event, "price")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label className="label_form">Imágen</Form.Label>
          <Form.Control
            name="image"
            value={productData.thumbnail}
            type="text"
            placeholder="Imágen"
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
        {productData.numberOfCards.length && (
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Editar
          </Button>
        )}
      </Form>
    </div>
  );
};

export default FormEditProduct;
