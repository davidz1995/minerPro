import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { getUserByName, cleanSearchedUsers } from "../../redux/actions/actions";

const SearchUsers = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("minerProAdminToken"));
  const [searchedUser, setSearchedUser] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const users = useSelector((state) => state.userByName);

  const handleOnchange = (e) => {
    setSearchedUser(e.target.value);
  };
  const handleSearch = () => {
    dispatch(cleanSearchedUsers());
    dispatch(getUserByName(token, searchedUser));
    setShowUsers(true);
    setSearchedUser("");
  };
  return (
    <div>
      <div>
        <input
          type="text"
          style={{
            width: "12em",
            borderRadius: "5px",
            borderStyle: "none",
            height: "2.2em",
          }}
          value={searchedUser}
          onChange={handleOnchange}
          placeholder="Buscar por nombre ..."
        />
        <Button
          onClick={handleSearch}
          style={{
            height: "2.2em",
            marginLeft: "1em",
            backgroundColor: "rgb(53, 228, 175)",
            borderStyle: "none",
            fontWeight: "bold",
            marginTop: "-.3em",
          }}
        >
          Buscar
        </Button>
      </div>

      <div>
        <div
          style={{
            display: showUsers ? "flex" : "none",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            backgroundColor: "transparent",
            padding: "2em",
            borderRadius: "5px",
          }}
        >
          <button
            onClick={() => {
              dispatch(cleanSearchedUsers());
              setShowUsers(false);
            }}
            style={{
              display: showUsers ? "flex" : "none",
              width: "max-content",
              padding: "0 1em 0 1em",
              height: "2em",
              borderRadius: "20px",
              color: "white",
              borderStyle: "solid",
              borderColor: "white",
              backgroundColor: "transparent",
              justifyContent: "center",
              fontWeight: "bold",
              borderWidth: "1.5px",
              marginBottom: "1em",
            }}
          >
            Cerrar
          </button>
          <div style={{ display: "flex" }}>
            {users.message && (
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{users.message}</Card.Title>
                </Card.Body>
              </Card>
            )}
            {users.length &&
              showUsers &&
              users.map((user) => {
                return (
                  <Card style={{ width: "18rem" }} key={user.id}>
                    <Card.Body>
                      <Card.Title>
                        {user.name} {user.lastName}
                      </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>{user.email}</ListGroupItem>
                      <ListGroupItem>Wallet : {user.wallet}</ListGroupItem>
                    </ListGroup>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
