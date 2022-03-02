import React from "react";
import AdminNavBar from "./AdminNavBar";
import PageSelector from "./PageSelector";
import Login from "../Login";
import BodyAdmin from "./BodyAdmin"

const AdminPanel = () => {
  const userData = JSON.parse(sessionStorage.getItem("clientData"));
  const forceNewPassword = () => {
    window.location.href = "/change-password";
  };
  
  return (
    <div style={{ marginBottom: "-30px", minHeight: "100vh" }}>
      {userData && userData.status === "Active" && (
        <>
          <AdminNavBar name={userData.name} />
          <PageSelector />
          <BodyAdmin />
        </>
      )}
      {userData && userData.status === "Pending" && forceNewPassword()}
      {!userData && <Login />}
    </div>
  );
};

export default AdminPanel;
