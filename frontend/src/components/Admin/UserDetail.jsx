import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEthermineData,
  getEthermineMinerPoolstats,
  getEtherminePoolStats,
} from "../../redux/actions/actions";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CancelIcon from "@mui/icons-material/Cancel";

const UserDetail = ({ setShowUserDetail, wallet, fee }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEthermineData(wallet));
    dispatch(getEthermineMinerPoolstats(wallet));
    dispatch(getEtherminePoolStats());
  }, [wallet, dispatch]);

  const ethermineData = useSelector((state) => state.ethermineData);
  const poolStats = useSelector((state) => state.etherminePoolStats);
  let divisor = "1000000000000000000";
  let userETH = ethermineData.data
    ? ethermineData.data.currentStatistics.unpaid
    : null;
  let currentUSD = poolStats.data ? poolStats.data.price.usd : null;

  const eth = () => {
    let ethFromApiToRender = userETH / +divisor;
    let housing_fee = +fee === 0 ? 1 : +fee;
    let utilFormat = JSON.stringify(ethFromApiToRender * +housing_fee).slice(
      0,
      7
    );
    return utilFormat;
  };

  const ethToUsd = () => {
    let eth = userETH / +divisor;
    let usd = currentUSD * eth;
    let housing_fee = +fee === 0 ? 1 : +fee;
    let utilFormat = JSON.stringify(usd * +housing_fee).slice(0, 7);
    return utilFormat;
  };

  return (
    <div
      className="container_user_detail"
      style={{
        backgroundColor: "black",
        position: "fixed",
        width: "60%",
        height: "20em",
        left: "20%",
        color: "white",
        borderRadius: "10px",
      }}
    >
      {setShowUserDetail && ethermineData.data ? (
        <>
          <h3 style={{ marginTop: "1em" }}>Detalles de Usuario</h3>
          <CancelIcon
            onClick={() => setShowUserDetail(false)}
            style={{
              float: "right",
              position: "absolute",
              right: 0,
              top: 0,
              marginRight: "1em",
              marginTop: ".5em",
              cursor: "pointer",
            }}
          />

          <div>
            {ethermineData.status === "OK" && (
              <h5 style={{ color: "white" }}>
                Total de potencia de minado:{" "}
                {(
                  ethermineData.data.currentStatistics.reportedHashrate /
                  1000000
                ).toFixed(1)}{" "}
                MH/s
              </h5>
            )}
          </div>

          <div style={{ display: "flex", placeContent: "center" }}>
            {ethermineData.data.workers.map((element, index) => {
              return (
                <div key={index} style={{ marginTop: "2em" }}>
                  <OverlayTrigger
                    key="refresh"
                    placement="bottom"
                    overlay={<Tooltip id="bottom">{element.worker}</Tooltip>}
                  >
                    <button
                      style={{
                        height: "2em",
                        width: "2em",
                        backgroundColor:
                          element.reportedHashrate > 0
                            ? "rgb(84, 241, 53)"
                            : "red",
                        marginRight: "1em",
                        borderStyle: "none",
                      }}
                    ></button>
                  </OverlayTrigger>
                </div>
              );
            })}
          </div>
          <p style={{ fontWeight: "normal" }}>Mineros</p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "70%",
              marginLeft: "15%",
              marginTop: "2em",
            }}
          >
            <h2>$ {ethToUsd()} USD</h2>
            <h2>$ {eth()} ETH</h2>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserDetail;
