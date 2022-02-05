import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  SET_MINERS,
  SET_BALANCE,
  SET_HISTORY,
  GET_ETHERMINE_DATA,
  GET_ETHERMINE_POOLSTATS,
  SET_DASHBOARD_ADMIN,
  SET_BALANCE_ADMIN,
  SET_HISTORY_ADMIN,
  SET_ADMIN,
  SET_VIEW_PRODUCTS_ADMIN,
  DELETE_PRODUCT,
} from "./actionTypes";

let API_URL = "http://localhost:4000/api";
//let API_URL = 'https://minerproserver.herokuapp.com/api'

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      if (
        response.status !== 404 ||
        response.status === 201 ||
        response.status === 200
      )
        dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
      if (response.status === 404) {
        let error = [{ name: "No se encontraron productos." }];
        dispatch({ type: GET_ALL_PRODUCTS, payload: error });
      }
    } catch {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: { message: "Error en petición." },
      });
    }
  };
};

export const deleteProduct = (id, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}/products/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (
        response.status !== 404 ||
        response.status === 201 ||
        response.status === 200
      )
        dispatch({ type: DELETE_PRODUCT, payload: response.data });
      if (response.status === 404) {
        let error = [{ name: "No se pudo borrar el producto." }];
        dispatch({ type: DELETE_PRODUCT, payload: error });
      }
    } catch {
      dispatch({
        type: DELETE_PRODUCT,
        payload: { message: "Error en petición." },
      });
    }
  };
};

export const setMiners = () => {
  return async (dispatch) => {
    dispatch({ type: SET_MINERS, payload: "mineros" });
  };
};

export const setBalance = () => {
  return async (dispatch) => {
    dispatch({ type: SET_BALANCE, payload: "balance" });
  };
};

export const setHistory = () => {
  return async (dispatch) => {
    dispatch({ type: SET_HISTORY, payload: "historial" });
  };
};

export const setDashboard = () => {
  return async (dispatch) => {
    dispatch({ type: SET_DASHBOARD_ADMIN, payload: "dashboard" });
  };
};

export const setBalanceAdmin = () => {
  return async (dispatch) => {
    dispatch({ type: SET_BALANCE_ADMIN, payload: "balance" });
  };
};

export const setHistoryAdmin = () => {
  return async (dispatch) => {
    dispatch({ type: SET_HISTORY_ADMIN, payload: "historial" });
  };
};

export const setAdmin = () => {
  return async (dispatch) => {
    dispatch({ type: SET_ADMIN, payload: "admin" });
  };
};

export const setViewProductsAdmin = () => {
  return async (dispatch) => {
    dispatch({ type: SET_VIEW_PRODUCTS_ADMIN, payload: "viewProductsAdmin" });
  };
};

export const getEthermineData = (wallet) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.ethermine.org/miner/${wallet}/dashboard`
      );
      if (response.status === 200)
        dispatch({ type: GET_ETHERMINE_DATA, payload: response.data });
      if (response.status === 404) {
        let error = [{ name: "No se encontró esta billetera." }];
        dispatch({ type: GET_ETHERMINE_DATA, payload: error });
      }
    } catch {
      dispatch({
        type: GET_ETHERMINE_DATA,
        payload: { message: "Error en petición." },
      });
    }
  };
};

export const getEtherminePoolStats = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://api.ethermine.org/poolstats`);
      if (response.status === 200)
        dispatch({ type: GET_ETHERMINE_POOLSTATS, payload: response.data });
      if (response.status === 404) {
        let error = [{ name: "No se encontraron poolstats" }];
        dispatch({ type: GET_ETHERMINE_POOLSTATS, payload: error });
      }
    } catch {
      dispatch({
        type: GET_ETHERMINE_POOLSTATS,
        payload: { message: "Error en petición." },
      });
    }
  };
};
