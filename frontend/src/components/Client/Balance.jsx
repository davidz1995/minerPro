import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SyncIcon from "@mui/icons-material/Sync";
import RefreshIcon from "@mui/icons-material/Refresh";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "../../styles/balance.css";
import {
  getEthermineData,
  getEthermineMinerPoolstats,
  getEtherminePoolStats,
} from "../../redux/actions/actions";

const Balance = () => {
  const [coin, setCoin] = useState("ETH");
  const [range, setRange] = useState("Diario");

  const dispatch = useDispatch();
  const userData = JSON.parse(sessionStorage.getItem("clientData"));

  const state = useSelector((state) => state.ethermineData);
  const poolStats = useSelector((state) => state.etherminePoolStats);
  const coinsPerMinute = useSelector(
    (state) => state.ethermineMinerCurrentStats.data.coinsPerMin
  );
  const usdPerMinute = useSelector(
    (state) => state.ethermineMinerCurrentStats.data.usdPerMin
  );

  let userETH = state ? state.data.currentStatistics.unpaid : null;
  let currentUSD = poolStats ? poolStats.data.price.usd : null;
  let divisor = "1000000000000000000";
  let minsPerDay = 1440;
  let minsPerMonth = 43800;

  let dailyEstimatedCoins = JSON.stringify(+coinsPerMinute * +minsPerDay).slice(
    0,
    7
  );
  let dailyEstimatedUsd = JSON.stringify(+usdPerMinute * +minsPerDay).slice(
    0,
    7
  );
  let monthlyEstimatedCoins = JSON.stringify(
    +coinsPerMinute * +minsPerMonth
  ).slice(0, 7);
  let monthlyEstimatedUsd = JSON.stringify(+usdPerMinute * +minsPerMonth).slice(
    0,
    7
  );

  const eth = () => {
    let ethFromApiToRender = userETH / +divisor;
    let utilFormat = JSON.stringify(
      ethFromApiToRender * +userData.housing_fee
    ).slice(0, 8);
    return utilFormat;
  };

  const ethToUsd = () => {
    let eth = userETH / +divisor;
    let usd = currentUSD * eth;
    let utilFormat = JSON.stringify(usd * +userData.housing_fee).slice(0, 7);
    return utilFormat;
  };

  const handleChangeCoin = () => {
    coin === "ETH" ? setCoin("USD") : setCoin("ETH");
  };

  const handleChangeRange = () => {
    range === "Diario" ? setRange("Mensual") : setRange("Diario");
  };

  return (
    <div className="container_balance">
      <div style={{ textAlign: "left", marginLeft: "5%", display: "flex" }}>
        <h1 style={{ color: "white", fontWeight: "bolder" }}>Balance</h1>
        <OverlayTrigger
          key="refresh"
          placement="bottom"
          overlay={<Tooltip id="bottom">Recargar datos actualizados</Tooltip>}
        >
          <RefreshIcon
            className="refresh_icon"
            style={{
              color: "rgb(53, 228, 175)",
              fontSize: "2rem",
              marginLeft: "80%",
              marginTop: ".30em",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch(getEthermineData(userData.wallet));
              dispatch(getEthermineMinerPoolstats(userData.wallet));
              dispatch(getEtherminePoolStats());
            }}
          />
        </OverlayTrigger>
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
          <p
            className="eth_usd"
            style={{ fontSize: "2rem", marginRight: "2em", width: "3em" }}
          >
            {coin === "ETH" ? eth() : ethToUsd()}
          </p>
          <p className="eth_usd" style={{ fontSize: "2rem" }}>
            {coin}
          </p>
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
            {range === "Diario" ? (
              <p
                className="eth_usd"
                style={{ fontSize: "2rem", marginRight: "2em", width: "3em" }}
              >
                {coin === "ETH" ? dailyEstimatedCoins : dailyEstimatedUsd}
              </p>
            ) : (
              <p
                className="eth_usd"
                style={{ fontSize: "2rem", marginRight: "2em", width: "3em" }}
              >
                {coin === "ETH" ? monthlyEstimatedCoins : monthlyEstimatedUsd}
              </p>
            )}
            <p className="eth_usd" style={{ fontSize: "2rem" }}>
              {coin}
            </p>
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
              className="eth_usd"
              style={{
                fontSize: "2rem",
                marginLeft: "1em",
                width: "3em",
              }}
            >
              {range}
            </p>
            <SyncIcon
              className="change-icon"
              onClick={handleChangeRange}
              style={{
                fontSize: "1.5rem",
                marginLeft: "1em",
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
