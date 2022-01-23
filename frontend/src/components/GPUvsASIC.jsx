import React from 'react';
import descriptionASIC from '../utils/descripcionAsic';
import descriptionGPU from '../utils/descripcionGPU';
import NavBar from './NavBar';
import Carousel from 'react-bootstrap/Carousel'
import Spinner from 'react-bootstrap/Spinner'
import gpu from '../assets/images/gpu.jpg'
import asic from '../assets/images/asicImage.jpg'
import '../styles/gpuVSasic.css'

function GPUvsASIC() {

    let desASIC = descriptionASIC()
    let desGPU = descriptionGPU()

  return (
    <div style={{display:'block', marginBottom: '-31px', minHeight:'100vh', height:'maxContent'}}>
        <NavBar variant='dark' bg='black'/>
        {desASIC && desGPU ?
            <Carousel>
            <Carousel.Item interval={5000}>
                <img
                className="d-block w-100"
                style={{height:'87vh', width:'50%', backgroundSize:'inherit'}}
                src={gpu}
                alt="First slide"
                />
                <Carousel.Caption style={{backgroundColor:'rgba(0, 0, 0, 0.750)', borderRadius:'40px', padding:'10px'}}>
                <h2>{desGPU.title}</h2>
                {desGPU.description.length &&
                    desGPU.description.map((line, index) => {return (
                        <p key={index}>{line}</p>
                    )})
                }
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                className="d-block w-100"
                style={{height:'87vh', width:'50%',backgroundSize:'inherit'}}
                src={asic}
                alt="Second slide"
                />
                <Carousel.Caption style={{backgroundColor:'rgba(0, 0, 0, 0.750)', borderRadius:'40px', padding:'10px'}}>
                <h2>{desASIC.title}</h2>
                {desASIC.description.length &&
                    desGPU.description.map(line => {return (
                        <p>{line}</p>
                    )})
                }
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
            :
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        }
    </div>
  )
}

export default GPUvsASIC;
