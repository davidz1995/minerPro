import React from "react";
import BodyClient from "./BodyClient";
import ClientNavBar from "./ClientNavBar";
import PageSelector from "./PageSelector";
import Login from "../Login";

const ClientPanel = () => {
  const userData = JSON.parse(sessionStorage.getItem("clientData"));
  const forceNewPassword = () => {
    window.location.href = "/change-password";
  };
  const forceSuspendedUser = () => {
    window.location.href = "/suspended";
  };
  return (
    <div style={{ marginBottom: "-30px", minHeight: "100vh" }}>
      {userData && userData.status === "Active" && (
        <>
          <ClientNavBar name={userData.name} />
          <PageSelector />
          <BodyClient wallet={userData.wallet} />
        </>
      )}
      {userData && userData.status === "Pending" && forceNewPassword()}
      {userData && userData.status === "Suspended" && forceSuspendedUser()}
      {!userData && <Login />}
    </div>
  );
};

export default ClientPanel;
