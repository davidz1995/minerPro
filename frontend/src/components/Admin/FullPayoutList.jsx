import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getHistories,
  deletePayment,
  cleanDeleteMessagePayments,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";

const PaymentsTable = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("minerProAdminToken"));
  const [darkMode, setDarkMode] = useState("light");
  const [showMessageDelete, setShowMessageDelete] = useState(true);
  const [payment, setPayment] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(getHistories(token));
  }, [dispatch, token]);

  const histories = useSelector((state) => state.histories.reverse());

  const messageDelete = useSelector(
    (state) => state.deletePaymentMessage.message
  );

  const usersList = useSelector((state) => state.users);

  const userName = (userId) => {
    const userName = usersList.filter((user) => user.id === userId);
    const completeName = userName.length
      ? `${userName[0].name} ${userName[0].lastName}`
      : "No se encontró el nombre.";
    return completeName;
  };

  return (
    <div
      style={{
        width: "90%",
        marginLeft: "5%",
        height: "max-content",
        minHeight: "100vh",
        paddingBottom: "5em",
        marginBottom: "-30px",
        paddingTop: "4em",
      }}
    >
      <Link
        to="/panelAdmin"
        style={{ position: "absolute", color: "white", top: "0", left: "0" }}
      >
        Volver a panel
      </Link>

      {showAlert && (
        <div className="container_alert">
          <h4>Seguro quieres eliminar este registro?</h4>
          <div>
            <Button
              variant="outline-primary"
              onClick={() => setShowAlert(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                dispatch(deletePayment(payment, token));
                setShowAlert(false);
                setShowMessageDelete(true);
              }}
              style={{ marginLeft: "1em" }}
            >
              Eliminar
            </Button>
          </div>
        </div>
      )}

      {messageDelete && showMessageDelete && (
        <div className="container_alert">
          <h4>{messageDelete}</h4>
          <div>
            <Button
              variant="outline-primary"
              onClick={() => {
                setShowMessageDelete(false);
                dispatch(cleanDeleteMessagePayments());
                dispatch(getHistories(token));
              }}
            >
              Aceptar
            </Button>
          </div>
        </div>
      )}

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

      <h1 style={{color:'white', marginBottom:'1em'}}>Lista de pagos completa</h1>

      <Table striped bordered hover variant={darkMode}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>USD</th>
            <th>ETH</th>
            <th style={{ width: "10em" }}></th>
          </tr>
        </thead>
        <tbody>
          {histories.length
            ? histories.map((payment) => {
                return (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.date}</td>
                    <td>{userName(payment.userId)}</td>
                    <td>${JSON.parse(payment.usd)}</td>
                    <td>${JSON.parse(payment.eth)}</td>
                    <td
                      style={{
                        display: "flex",
                        padding: "2em 1em 2em 1em",
                        width: "10em",
                        justifyContent: "center",
                      }}
                    >
                      <DeleteIcon
                        className="delete_icon"
                        onClick={() => {
                          setPayment(payment.id);
                          setShowAlert(true);
                        }}
                      />
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </div>
  );
};

export default PaymentsTable;
