import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEthermineData,
  getEtherminePoolStats,
} from "../../redux/actions/actions";
import Card from "react-bootstrap/Card";
import logo from "../../assets/images/logo minerPro.png";

const Mineros = ({ wallet }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEthermineData(wallet));
    dispatch(getEtherminePoolStats());
    return () => {
      return;
    };
  }, [dispatch, wallet]);

  const state = useSelector((state) => state.ethermineData);

  return (
    <div>
      <div style={{ textAlign: "left", marginLeft: "5%" }}>
        <h1 style={{ color: "white", fontWeight: "bolder" }}>Mineros</h1>
        {state.status === "OK" && (
          <h4 style={{ color: "white" }}>
            Total de potencia de minado:{" "}
            {(state.data.currentStatistics.reportedHashrate / 1000000).toFixed(
              1
            )}{" "}
            MH/s
          </h4>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
          placeContent: "center",
          marginTop: "2em",
          paddingBottom: "5em",
        }}
      >
        {state.status === "OK" &&
          state.data.workers.map((element, index) => {
            return (
              <Card
                style={{ width: "18rem", alignItems: "center" }}
                key={index}
              >
                <Card.Img
                  variant="top"
                  src={logo}
                  style={{
                    width: "7em",
                    padding: "1em",
                    marginTop: "1em",
                  }}
                />
                <Card.Body>
                  <Card.Title
                    style={{ fontSize: "1.7rem", fontWeight: "bold" }}
                  >
                    {element.worker.charAt(0).toUpperCase() +
                      element.worker.slice(1)}
                  </Card.Title>
                  <h5 style={{ fontWeight: "bold" }}>GPU</h5>
                  <Card.Text>6/6</Card.Text>
                  {element.reportedHashrate > 0 ? (
                    <Card.Text
                      style={{
                        color: "rgb(68, 216, 30)",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      Minando
                    </Card.Text>
                  ) : (
                    <p style={{ color: "red" }}>Offline</p>
                  )}
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Mineros;
