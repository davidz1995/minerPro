import React from "react";
import { useSelector } from "react-redux";
import AdminController from "./AdminController";
import InProgress from "./InProgress";

const BodyClient = ({wallet}) => {
  const state = useSelector((state) => state.selectedBodyAdmin);
  return (
    <div>
      {state === "dashboard" && <InProgress/>}
      {state === "balance" && <InProgress/>}
      {state === "historial" && <InProgress/>}
      {state === "admin" && <AdminController/>}
    </div>
  );
};

export default BodyClient;
