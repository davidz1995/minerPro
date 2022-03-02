import React from "react";
import { useSelector } from "react-redux";
import Mineros from "./Mineros";
import Balance from "./Balance";
import History from "./History";

const BodyClient = ({wallet}) => {
  const state = useSelector((state) => state.selectedBodyClient);
  return (
    <div>
      {state === "mineros" && <Mineros wallet={wallet}/>}
      {state === "balance" && <Balance wallet={wallet}/>}
      {state === "historial" && <History/>}
    </div>
  );
};

export default BodyClient;
