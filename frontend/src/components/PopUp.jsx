import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

const PopUp = ({visible, message}) => {
  return (
  <div style={{position:'fixed' ,width:'40%', marginLeft:'5%', marginTop:'-5em'}}>
  {visible&&
    <Alert show={visible} variant="light">
        <Alert.Heading>{message}</Alert.Heading>
        <p>
            Miner Pro Team
        </p>
        <div className="d-flex justify-content-end">
            <Button onClick={() => window.location.reload()} variant="outline-success">
            Entendido
            </Button>
        </div>
    </Alert>
  }
    
  </div>
  );
}

export default PopUp;
