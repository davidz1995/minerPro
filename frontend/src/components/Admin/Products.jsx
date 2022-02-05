import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/actions/actions";
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

function Products() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("minerProAdminToken"));
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products);

  return (
    <div>
      {showEditForm && (
        <div style={{ display: "flex", flexDirection: "column"}}>
          <button
            onClick={() => setShowEditForm(false)}
            style={{ fontSize: "1rem", color: "white", width:'5%', position:'relative'}}
          >
            cerrar
          </button>
          <FormEditProduct />
        </div>
      )}

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
                          onClick={() => setShowEditForm(true)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="small"
                          onClick={() =>
                            dispatch(deleteProduct(product._id, token))
                          }
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
