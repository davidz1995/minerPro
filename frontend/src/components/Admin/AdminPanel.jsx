import React from "react";
import AdminNavBar from "./AdminNavBar";
import PageSelector from "./PageSelector";
import Login from "../Login";
import BodyAdmin from "./BodyAdmin"

const AdminPanel = () => {
  const userData = JSON.parse(sessionStorage.getItem("minerProAdmin"));
  return (
    <div style={{ marginBottom: "-30px", minHeight: "100vh" }}>
      {userData ? (
        <>
          <AdminNavBar name={userData.name} />
          <PageSelector />
          <BodyAdmin />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default AdminPanel;
