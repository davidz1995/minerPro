import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Spinner from "react-bootstrap/esm/Spinner";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import NavBar from "./NavBar";
import { getProducts } from "../redux/actions/actions";
import "../styles/products.css";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  });

  const products = useSelector((state) => state.products);

  return (
    <div className="container_products">
      <NavBar variant="dark" bg="black" />
      {products ? (
        <Container style={{marginLeft:'10%'}}>
          <Row>
            <Col>
              <div className="cards_container">
                {products.map((product) => {
                  return (
                    <Card
                      className='card'
                    >
                      <CardMedia
                        component="img"
                        height="140"
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
                    </Card>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <div style={{ paddingTop: "19em", height: "100vh" }}>
          <Spinner animation="border" variant="light" role="status"></Spinner>
        </div>
      )}
    </div>
  );
};

export default Products;
