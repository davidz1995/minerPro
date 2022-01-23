import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import NavBar from './NavBar';
import faq from '../utils/faq';

const Faq = () => {
    let questionAnswer = faq()
    console.log(questionAnswer);
  return (
  <div>
    <NavBar variant='dark' bg='black'/>
    {questionAnswer.length &&
        questionAnswer.map(((element, index) => { return (
            <Accordion key={index}>
            <Accordion.Item eventKey="1">
            <Accordion.Header>
                {element.question}
            </Accordion.Header>
            {typeof element.answer === 'object'?
                <Accordion.Body style={{textAlign:'left'}}>
                {element.answer.description}
                {element.answer.variables.map((element, index) => {return (
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
