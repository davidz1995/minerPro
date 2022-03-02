import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions/actions";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import RefreshIcon from "@mui/icons-material/Refresh";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

const History = () => {
  const dispatch = useDispatch();
  const id = JSON.parse(sessionStorage.getItem("clientData"));

  const [darkMode, setDarkMode] = useState("light");

  useEffect(() => {
    dispatch(getUserById(id.id));
  }, [dispatch]); //eslint-disable-line

  const user = useSelector((state) => state.userById);

  return (
    <div
      style={{
        width: "60%",
        marginLeft: "20%",
        height: "max-content",
        minHeight: "100vh",
        paddingBottom: "5em",
      }}
    >
      <DarkModeIcon
        className="dark_mode"
        style={{
          color: "white",
          float: "right",
          marginBottom: "1em",
          marginTop: ".25em",
        }}
        onClick={() =>
          darkMode === "light" ? setDarkMode("dark") : setDarkMode("light")
        }
      />

      <RefreshIcon
        className="dark_mode"
        style={{
          color: "white",
          float: "right",
          marginTop: ".25em",
          marginRight: "1em",
        }}
        onClick={() => {
          dispatch(getUserById(id.id));
        }}
      />
      {user.length ? (
        <Table striped bordered hover variant={darkMode}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto en ETH</th>
              <th>Monto en USD</th>
            </tr>
          </thead>
          <tbody>
            {user[0].histories
              .slice(0, 10)
              .reverse()
              .map((history, index) => {
                return (
                  <tr key={index}>
                    <td>{history.date}</td>
                    <td>${JSON.parse(history.eth)}</td>
                    <td>${JSON.parse(history.usd)}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      ) : (
        <div style={{ paddingTop: "9em", height: "100vh" }}>
          <Spinner animation="border" variant="light" role="status"></Spinner>
        </div>
      )}
    </div>
  );
};

export default History;
