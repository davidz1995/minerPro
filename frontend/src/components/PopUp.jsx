import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import '../styles/popUp.css'

const PopUp = ({visible, message}) => {
  return (
  <div className='pop_up' style={{position:'fixed', width:'40%', marginLeft:'5%', marginTop:'-5em'}}>
  {visible&&
    <Alert show={visible} variant="light">
        <Alert.Heading className='message_popup'>{message}</Alert.Heading>
        <p>
            Miner Pro Team
        </p>
        <div className="d-flex justify-content-end">
            <Button onClick={() => window.location.reload()} variant="outline-success"
            className='button_popup'
            >
            Entendido
            </Button>
        </div>
    </Alert>
  }
    
  </div>
  );
}

export default PopUp;
