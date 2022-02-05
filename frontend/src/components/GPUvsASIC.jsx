import React from "react";
import descriptionASIC from "../utils/descripcionAsic";
import descriptionGPU from "../utils/descripcionGPU";
import NavBar from "./NavBar";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import "../styles/gpuVSasic.css";

function GPUvsASIC() {
  let desASIC = descriptionASIC();
  let desGPU = descriptionGPU();

  return (
    <div
      style={{
        display: "block",
        marginBottom: "-31px",
        minHeight: "100vh",
        height: "maxContent",
      }}
    >
      <NavBar variant="dark" bg="black" />
      {desASIC && desGPU ? (
        <Carousel className="carousel">
          <Carousel.Item interval={5000} className="carousel_item">
            <img
              className="img_carousel"
              style={{
                height: "87vh",
                width: "90%",
                backgroundSize: "inherit",
              }}
              src="https://i.ibb.co/HhbcSCy/asic-Image.jpg"
              alt="Second slide"
            />
            <Carousel.Caption
              className="carousel_caption"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.750)",
                borderRadius: "40px",
                padding: "10px",
              }}
            >
              <h2>Qué es un {desASIC.title}?</h2>
              {desASIC.description.length &&
                desGPU.description.map((line, index) => {
                  return <p key={index}>{line}</p>;
                })}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000} className="carousel_item">
            <img
              className="img_carousel"
              style={{
                height: "87vh",
                width: "90%",
                backgroundSize: "inherit",
              }}
              src="https://i.ibb.co/vBZGqGL/gpu.jpg"
              alt="First slide"
            />
            <Carousel.Caption
              className="carousel_caption"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.750)",
                borderRadius: "40px",
                padding: "10px",
              }}
            >
              <h2>Qué es un {desGPU.title}?</h2>
              {desGPU.description.length &&
                desGPU.description.map((line, index) => {
                  return <p key={index}>{line}</p>;
                })}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}

export default GPUvsASIC;
