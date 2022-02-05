import React from "react";
import { useSelector } from "react-redux";
import AdminController from "./AdminController";

const BodyClient = ({wallet}) => {
  const state = useSelector((state) => state.selectedBodyAdmin);
  return (
    <div>
      {state === "dashboard" && <p>Dashboard</p>}
      {state === "balance" && <p>Balance</p>}
      {state === "historial" && <p>Historial</p>}
      {state === "admin" && <AdminController/>}
    </div>
  );
};

export default BodyClient;
