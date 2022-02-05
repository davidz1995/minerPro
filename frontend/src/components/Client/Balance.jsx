import React, { useState } from "react";
import { useSelector } from "react-redux";
import SyncIcon from "@mui/icons-material/Sync";
import "../../styles/balance.css";

const Balance = () => {
  const [coin, setCoin] = useState("ETH");
  const [range, setRange] = useState("Diario");

  const state = useSelector((state) => state.ethermineData);
  const poolStats = useSelector((state) => state.etherminePoolStats);

  let userETH = state ? state.data.currentStatistics.unpaid : null;
  let currentUSD = poolStats ? poolStats.data.price.usd : null;
  let divisor = "1000000000000000000";

  const eth = () => {
    let ethFromApiToRender = userETH / +divisor;
    let utilFormat = JSON.stringify(ethFromApiToRender).slice(0, 8);
    return utilFormat;
  };

  const ethToUsd = () => {
    let eth = userETH / +divisor;
    let usd = currentUSD * eth;
    let utilFormat = JSON.stringify(usd * 0.8).slice(0, 7);
    return utilFormat;
  };

  const handleChangeCoin = () => {
    coin === "ETH" ? setCoin("USD") : setCoin("ETH");
  };

  const handleChangeRange = () => {
    range === "Diario" ? setRange("Mensual") : setRange("Diario");
  };

  return (
    <div>
      <div style={{ textAlign: "left", marginLeft: "5%" }}>
        <h1 style={{ color: "white", fontWeight: "bolder" }}>Balance</h1>
      </div>
      <section
        style={{
          color: "white",
          textAlign: "left",
          marginLeft: "10%",
          marginTop: "2em",
        }}
      >
        <h3 style={{ fontWeight: "bold", marginBottom: "1em" }}>
          Saldo acumulado
        </h3>
        <div style={{ display: "flex" }}>
          <p style={{ fontSize: "2rem", marginRight: "2em", width: "3em" }}>
            {coin === "ETH" ? eth() : ethToUsd()}
          </p>
          <p style={{ fontSize: "2rem" }}>{coin}</p>
          <SyncIcon
            className="change-icon"
            onClick={handleChangeCoin}
            style={{ fontSize: "1.5rem", marginLeft: "1em", marginTop: ".5em" }}
          />
        </div>
        <h3 style={{ fontWeight: "bold", marginBottom: "1em" }}>
          Ganancias estimadas
        </h3>
        <div style={{ display: "flex" }}>
          <>
            <p style={{ fontSize: "2rem", marginRight: "2em", width: "3em" }}>
              {coin === "ETH" ? "NaN" : "NaN"}
            </p>
            <p style={{ fontSize: "2rem" }}>{coin}</p>
            <SyncIcon
              className="change-icon"
              onClick={handleChangeCoin}
              style={{
                fontSize: "1.5rem",
                marginLeft: "1em",
                marginTop: ".5em",
              }}
            />
          </>
          <>
            <p
              style={{
                fontSize: "1rem",
                marginLeft: "1em",
                width: "3em",
                marginTop: ".8em",
              }}
            >
              {range}
            </p>
            <SyncIcon
              className="change-icon"
              onClick={handleChangeRange}
              style={{
                fontSize: "1.5rem",
                marginRight: "1em",
                width: "3em",
                marginTop: ".5em",
              }}
            />
          </>
        </div>
      </section>
    </div>
  );
};

export default Balance;
