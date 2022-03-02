import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormEditMiner from "./FormEditMiner";
import {
  getMiners,
  deleteMiner,
  cleanDeleteMessageMiners,
  cleanUpdateMessageMiners,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";

const MinersTable = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("minerProAdminToken"));
  const [darkMode, setDarkMode] = useState("light");
  const [showMessageDelete, setShowMessageDelete] = useState(true);
  const [showMessageUpdate, setShowMessageUpdate] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedMiner, setSelectedMiner] = useState("");
  const [miner, setMiner] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(getMiners(token));
  }, [dispatch, token]);

  const miners = useSelector((state) => state.miners.reverse());

  const messageDelete = useSelector(
    (state) => state.deleteMinerMessage.message
  );
  const messageUpdate = useSelector(
    (state) => state.updateMinerMessage.message
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

      {showEditForm && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <FormEditMiner
            miner={selectedMiner}
            token={token}
            setShowEditForm={setShowEditForm}
            setShowMessageUpdate={setShowMessageUpdate}
          />
        </div>
      )}

      {showAlert && (
        <div className="container_alert">
          <h4>Seguro quieres eliminar este minero?</h4>
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
                dispatch(deleteMiner(miner, token));
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

      {messageUpdate && showMessageUpdate && (
        <div className="container_alert">
          <h4>{messageUpdate}</h4>
          <div>
            <Button
              variant="outline-primary"
              onClick={() => {
                setShowMessageUpdate(false);
                dispatch(cleanUpdateMessageMiners());
                dispatch(getMiners(token));
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
                dispatch(cleanDeleteMessageMiners());
                dispatch(getMiners(token));
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

      <h1 style={{ color: "white", marginBottom: "1em" }}>
        Lista de mineros completa
      </h1>

      <Table striped bordered hover variant={darkMode}>
        <thead>
          <tr>
            <th>Propietario</th>
            <th>Nombre</th>
            <th>Placas</th>
            <th>Id Simplemining</th>
            <th>Usuario Simplemining</th>
            <th>Contraseña Simplemining</th>
            <th style={{ width: "10em" }}></th>
          </tr>
        </thead>
        <tbody>
          {miners.length
            ? miners.slice(0, 10).map((miner) => {
                return (
                  <tr key={miner.id}>
                    <td>{userName(miner.userId)}</td>
                    <td>{miner.name}</td>
                    <td>{miner.placas}</td>
                    <td>{miner.id_simplemining}</td>
                    <td>{miner.user_simplemining}</td>
                    <td>{miner.pass_simplemining}</td>
                    <td
                      style={{
                        display: "flex",
                        padding: "2em 1em 2em 1em",
                        width: "10em",
                        justifyContent: "center",
                      }}
                    >
                      <EditIcon
                        className="edit_icon"
                        style={{ marginRight: "1em" }}
                        onClick={() => {
                          setSelectedMiner(miner);
                          setShowEditForm(true);
                        }}
                      />
                      <DeleteIcon
                        className="delete_icon"
                        onClick={() => {
                          setMiner(miner.id);
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

export default MinersTable;
