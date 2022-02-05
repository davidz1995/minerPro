import React from "react";
import { useDispatch } from "react-redux";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { setMiners, setBalance, setHistory } from "../../redux/actions/actions";
import '../../styles/pageSelector.css'

const PageSelector = () => {
  const dispatch = useDispatch();
  return (
    <div style={{marginTop:'2em', marginBottom:'2em'}}>
      <ButtonGroup aria-label="Basic example" style={{ height: "5em" }}>
        <Button
          className='button_selector'
          variant="secondary"
          style={{
            width: "10em",
            backgroundColor: "white",
            color: "black",
            fontWeight: "bolder",
          }}
          onClick={() => {
            dispatch(setMiners())
          }}
        >
          Mineros
        </Button>
        <Button
          className='button_selector'
          variant="secondary"
          style={{
            width: "10em",
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
          }}
          onClick={() => {
            dispatch(setBalance())
          }}
        >
          Balance
        </Button>
        <Button
          className='button_selector'
          variant="secondary"
          style={{
            width: "10em",
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
          }}
          onClick={() => {
            dispatch(setHistory())
          }}
        >
          Historial
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default PageSelector;
