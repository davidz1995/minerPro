import React from "react";
import BodyClient from "./BodyClient";
import ClientNavBar from "./ClientNavBar";
import PageSelector from "./PageSelector";
import Login from "../Login";

const ClientPanel = () => {
  const userData = JSON.parse(sessionStorage.getItem("clientData"));
  return (
    <div style={{ marginBottom: "-30px", minHeight: "100vh" }}>
      {userData ? (
        <>
          <ClientNavBar name={userData.name} />
          <PageSelector />
          <BodyClient wallet={userData.wallet} />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default ClientPanel;
