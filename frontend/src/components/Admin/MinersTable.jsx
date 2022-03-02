import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormCreateMiner from "./FormCreateMiner";
import FormEditMiner from "./FormEditMiner";
import {
  cleanCreateMessageMiners,
  getMiners,
  deleteMiner,
  cleanDeleteMessageMiners,
  cleanUpdateMessageMiners
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";

const MinersTable = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("minerProAdminToken"));
  const [darkMode, setDarkMode] = useState("light");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showMessageCreate, setShowMessageCreate] = useState(true);
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
  const messageCreate = useSelector(
    (state) => state.createMinerMessage.message
  );
  const messageDelete = useSelector(
    (state) => state.deleteMinerMessage.message
  );
  const messageUpdate = useSelector((state) => state.updateMinerMessage.message);

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
        <FormCreateMiner
          setShowCreateForm={setShowCreateForm}
          setShowMessageCreate={setShowMessageCreate}
        />
      )}

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

      {messageCreate && showMessageCreate && (
        <div className="container_alert">
          <h4>{messageCreate}</h4>
          <div>
            <Button
              variant="outline-primary"
              onClick={() => {
                setShowMessageCreate(false);
                dispatch(cleanCreateMessageMiners());
                dispatch(getMiners(token));
              }}
            >
              Aceptar
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
        Nuevo minero
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
          dispatch(getMiners(token));
        }}
      />

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
      <Link to='/fullMinersList' style={{color:'white'}}>Ver lista completa</Link>
    </div>
  );
};

export default MinersTable;
