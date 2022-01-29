import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import NavBar from './NavBar';
import faq from '../utils/faq';

const Faq = () => {
    let questionAnswer = faq()
  return (
  <div style={{display:'block', marginBottom: '-31px', minHeight:'100vh', justifyContent:'center'}}>
    <NavBar variant='dark' bg='black'/>
    <h2 style={{color:'white', fontWeight:'bold', paddingBottom:'1.5em', textAlign:'center', marginLeft:'5%', paddingTop:'3em'}}>Preguntas frecuentes</h2>
    {questionAnswer.length &&
        questionAnswer.map(((element, index) => { return (
            <Accordion key={index} style={{paddingBottom:'10px', width:'90%', marginLeft:'5%'}}>
            <Accordion.Item eventKey="1">
            <Accordion.Header>
                {element.question}
            </Accordion.Header>
            {typeof element.answer === 'object'?
                <Accordion.Body style={{textAlign:'left'}}>
                {element.answer.intro}
                {element.answer.text.map((element, index) => {return (
                     <Accordion.Body key={index}>{element}</Accordion.Body>
                )
                })}
                </Accordion.Body>
                :
                <Accordion.Body style={{textAlign:'left'}}>
                {element.answer}
                </Accordion.Body>
                }
            </Accordion.Item>
            </Accordion>
        )}
        ))
    }
  </div>
  );
}

export default Faq;
