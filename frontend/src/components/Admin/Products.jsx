import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cleanCreateMessageProducts, cleanDeleteMessageProducts, cleanUpdateMessageProducts, deleteProduct, getProducts } from "../../redux/actions/actions";
import Spinner from "react-bootstrap/esm/Spinner";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import FormEditProduct from "./FormEditProduct";
import FormCreateProduct from "./FormCreateProduct";
import RefreshIcon from "@mui/icons-material/Refresh";
import "../../styles/products.css";

function Products() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("minerProAdminToken"));
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [product, setProduct] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showMessageCreate, setShowMessageCreate] = useState(true);
  const [showMessageUpdate, setShowMessageUpdate] = useState(true);
  const [showMessageDelete, setShowMessageDelete] = useState(true);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products);
  const messageCreate = useSelector(
    (state) => state.createProductMessage.message
  );
  const messageUpdate = useSelector(
    (state) => state.updateProductMessage.message
  );
  const messageDelete = useSelector(
    (state) => state.deleteProductMessage.message
  );

  return (
    <div>
      {showAlert && (
        <div className="container_alert">
          <h4>Seguro quieres eliminar el producto?</h4>
          <div>
            <Button variant="outlined" onClick={() => setShowAlert(false)}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                dispatch(deleteProduct(product, token));
                setShowAlert(false);
                setShowMessageDelete(true);
              }}
              style={{ marginLeft: "1em" }}
            >
              Eliminar
            </Button>
          </div>
        </div>
      )}
      {messageCreate && showMessageCreate && (
        <div className="container_alert">
          <h4>{messageCreate}</h4>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                setShowMessageCreate(false);
                dispatch(cleanCreateMessageProducts());
                dispatch(getProducts());
              }}
            >
              Aceptar
            </Button>
          </div>
        </div>
      )}
      {messageUpdate && showMessageUpdate && (
        <div className="container_alert">
          <h4>{messageUpdate}</h4>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                setShowMessageUpdate(false);
                dispatch(cleanUpdateMessageProducts());
                dispatch(getProducts());
              }}
            >
              Aceptar
            </Button>
          </div>
        </div>
      )}
      {messageDelete && showMessageDelete && (
        <div className="container_alert">
          <h4>{messageDelete}</h4>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                setShowMessageDelete(false);
                dispatch(cleanDeleteMessageProducts());
                dispatch(getProducts());
              }}
            >
              Aceptar
            </Button>
          </div>
        </div>
      )}
      {showEditForm && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <FormEditProduct
            product={selectedProduct}
            token={token}
            setShowEditForm={setShowEditForm}
            setShowMessageUpdate={setShowMessageUpdate}
          />
        </div>
      )}
      {showCreateForm && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <FormCreateProduct
            token={token}
            setShowCreateForm={setShowCreateForm}
            setShowMessageCreate={setShowMessageCreate}
          />
        </div>
      )}

      <div>
        <Button
          variant="contained"
          style={{
            marginTop: "2em",
            marginBottom: "-1em",
            backgroundColor: "rgb(53, 228, 175)",
          }}
          onClick={() => setShowCreateForm(true)}
        >
          Agregar un producto
        </Button>
        <RefreshIcon
          onClick={() => dispatch(getProducts())}
          className="refresh_products"
        />
      </div>

      {products.length ? (
        <Container>
          <Row>
            <Col>
              <div className="cards_container">
                {products.map((product, index) => {
                  return (
                    <Card className="card" key={index}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.thumbnail}
                        alt="Imagen del producto"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowEditForm(true);
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            setProduct(product._id);
                            setShowAlert(true);
                          }}
                        >
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <div style={{ paddingTop: "9em", height: "100vh" }}>
          <Spinner animation="border" variant="light" role="status"></Spinner>
        </div>
      )}
    </div>
  );
}

export default Products;
