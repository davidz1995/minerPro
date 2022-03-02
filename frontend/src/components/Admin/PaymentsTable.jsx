import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import FormCreatePayment from "./FormCreatePayment";
import {
  cleanCreateMessagePayments,
  getHistories,
  deletePayment,
  cleanDeleteMessagePayments,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";

const PaymentsTable = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("minerProAdminToken"));
  const [darkMode, setDarkMode] = useState("light");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showMessageCreate, setShowMessageCreate] = useState(true);
  const [showMessageDelete, setShowMessageDelete] = useState(true);
  const [payment, setPayment] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(getHistories(token));
  }, [dispatch, token]);

  const histories = useSelector((state) => state.histories.reverse());
  const messageCreate = useSelector(
    (state) => state.createPaymentMessage.message
  );
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
      }}
    >
      {showCreateForm && (
        <FormCreatePayment
          setShowCreateForm={setShowCreateForm}
          setShowMessageCreate={setShowMessageCreate}
        />
      )}

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

      {messageCreate && showMessageCreate && (
        <div className="container_alert">
          <h4>{messageCreate}</h4>
          <div>
            <Button
              variant="outline-primary"
              onClick={() => {
                setShowMessageCreate(false);
                dispatch(cleanCreateMessagePayments());
                dispatch(getHistories(token));
              }}
            >
              Aceptar
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

      <Button
        style={{
          backgroundColor: "rgb(53, 228, 175)",
          float: "left",
          marginBottom: "1em",
          borderStyle: "none",
          fontWeight: "bolder",
        }}
        onClick={() => setShowCreateForm(true)}
      >
        Nuevo pago
      </Button>

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
          dispatch(getHistories(token));
        }}
      />

      <>
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
            ? histories.slice(0, 10).map((payment) => {
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
      <Link to='/fullPaymentList' style={{color:'white'}}>Ver lista completa</Link>
      </>
    </div>
  );
};

export default PaymentsTable;
