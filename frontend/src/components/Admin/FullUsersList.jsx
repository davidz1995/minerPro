import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import "../../styles/users.css";
import {
  deleteUser,
  getUsers,
  cleanUpdateMessage,
  cleanDeleteMessage,
} from "../../redux/actions/actions";
import FormEditUser from "./FormEditUser";
import SearchUsers from "./SearchUsers";
import { Link } from "react-router-dom";
import UserDetail from "./UserDetail";

function UserTable() {
  const [darkMode, setDarkMode] = useState("light");
  const [user, setUser] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [showMessageDelete, setShowMessageDelete] = useState(true);
  const [showMessageUpdate, setShowMessageUpdate] = useState(true);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const dispatch = useDispatch();
  let users = useSelector((state) =>
    state.users.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else if (b.name.toLowerCase() > a.name.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    })
  );
  const token = JSON.parse(localStorage.getItem("minerProAdminToken"));

  useEffect(() => {
    dispatch(getUsers(token));
  }, [dispatch, token]);

  const messageDelete = useSelector((state) => state.deleteUserMessage.message);
  const messageUpdate = useSelector((state) => state.updateUserMessage.message);

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
          <FormEditUser
            user={selectedUser}
            token={token}
            setShowEditForm={setShowEditForm}
            setShowMessageUpdate={setShowMessageUpdate}
          />
        </div>
      )}

      {showAlert && (
        <div className="container_alert">
          <h4>Seguro quieres eliminar a este usuario?</h4>
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
                dispatch(deleteUser(user, token));
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
                dispatch(cleanUpdateMessage());
                dispatch(getUsers(token));
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
                dispatch(cleanDeleteMessage());
                dispatch(getUsers(token));
              }}
            >
              Aceptar
            </Button>
          </div>
        </div>
      )}

      <h1 style={{ color: "white", marginBottom: "1em" }}>
        Lista de usuarios completa
      </h1>

      {showUserDetail ? (
        <UserDetail
          setShowUserDetail={setShowUserDetail}
          wallet={selectedUser.wallet}
          fee={selectedUser.housing_fee}
        />
      ) : null}

      <SearchUsers />

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

      {users.length ? (
        <Table bordered hover variant={darkMode}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Wallet</th>
              <th>Fee</th>
              <th>Status</th>
              <th>isAdmin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.name} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.wallet}</td>
                  <td>{user.housing_fee}</td>
                  <td>{user.status}</td>
                  <td>{JSON.stringify(user.isAdmin)}</td>
                  <td style={{ display: "flex", padding: "2em 1em 2em 1em" }}>
                    <EditIcon
                      className="edit_icon"
                      style={{ marginRight: "1em" }}
                      onClick={() => {
                        setSelectedUser(user);
                        setShowEditForm(true);
                      }}
                    />
                    <ReadMoreIcon
                      className="edit_icon"
                      style={{ marginRight: "1em" }}
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUserDetail(true);
                      }}
                    />
                    <DeleteIcon
                      className="delete_icon"
                      onClick={() => {
                        setUser(user.id);
                        setShowAlert(true);
                      }}
                    />
                  </td>
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
}

export default UserTable;
