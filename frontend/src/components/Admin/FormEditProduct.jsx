import React, { useState, useRef } from "react";
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

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (event, name) => {
    if (name === "thumbnail") {
      setProductData({
        ...productData,
        thumbnail: event.target.files[0],
      });
    } else {
      setProductData({
        ...productData,
        [name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof productData.thumbnail === "object") {
      let image = await toBase64(productData.thumbnail);
      dispatch(
        updateProduct(
          token,
          product._id,
          productData.name,
          productData.description,
          productData.price,
          image,
          productData.numberOfCards
        )
      );
    }
    setShowEditForm(false);
    setShowMessageUpdate(true);
  };

  const inputFileRef = useRef();

  const toBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const preview = (event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
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
            placeholder="Precio"
            onChange={(event) => handleChange(event, "price")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label className="label_form">Imágen</Form.Label>
          <input
            ref={inputFileRef}
            type="file"
            name="thumbnail"
            onChange={(event) => {
              handleChange(event, "thumbnail");
              preview(event);
            }}
            accept=".jpg, .png, .jpeg"
            style={{ color: "white" }}
          />
        </Form.Group>

        {previewImage && (
          <img
            src={previewImage}
            alt="preview"
            style={{ width: "auto", height: "10em" }}
          />
        )}

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
