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
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USER_BY_NAME,
  CLEAN_MESSAGE_CREATE,
  CLEAN_MESSAGE_UPDATE,
  CLEAN_MESSAGE_DELETE,
  CLEAN_SEARCHED_USERS
} from "./actionTypes";

const API_URL = process.env.REACT_APP_LOCAL_API;

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

export const createProduct = (
  token,
  name,
  description,
  price,
  thumbnail,
  numberOfCards
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/products`,
        {
          name,
          description,
          price,
          thumbnail,
          numberOfCards,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (
        response.status !== 404 ||
        response.status === 201 ||
        response.status === 200
      )
        dispatch({ type: CREATE_PRODUCT, payload: response.data });
      if (response.status === 404) {
        let error = { message: "No se pudo crear el producto." };
        dispatch({ type: CREATE_PRODUCT, payload: error });
      }
    } catch {
      dispatch({
        type: UPDATE_PRODUCT,
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
        let error = { message: "No se pudo borrar el producto." };
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

export const updateProduct = (
  token,
  id,
  name,
  description,
  price,
  thumbnail,
  numberOfCards
) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${API_URL}/products/${id}`,
        {
          name,
          description,
          price,
          thumbnail,
          numberOfCards,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (
        response.status !== 404 ||
        response.status === 201 ||
        response.status === 200
      )
        dispatch({ type: UPDATE_PRODUCT, payload: response.data });
      if (response.status === 404) {
        let error = { message: "No se pudo actualizar el producto." };
        dispatch({ type: UPDATE_PRODUCT, payload: error });
      }
    } catch {
      dispatch({
        type: UPDATE_PRODUCT,
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

export const getUsers = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (
        response.status !== 404 ||
        response.status === 201 ||
        response.status === 200
      )
        dispatch({ type: GET_USERS, payload: response.data });
      if (response.status === 404) {
        let error = { name: "No se encontraron usuarios." };
        dispatch({ type: GET_USERS, payload: error });
      }
    } catch {
      dispatch({
        type: GET_USERS,
        payload: { message: "Error en petición." },
      });
    }
  };
};

export const getUserByName = (token, name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/users/${name}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (
        response.status !== 404 ||
        response.status === 201 ||
        response.status === 200
      ) {
        dispatch({ type: GET_USER_BY_NAME, payload: response.data });
      } else if (response.status === 404) {
        let error = { message: "No se encontraron usuarios." };
        dispatch({ type: GET_USER_BY_NAME, payload: error });
      }
    } catch {
      dispatch({
        type: GET_USER_BY_NAME,
        payload: { message: "No se encontraron usuarios con este nombre." },
      });
    }
  };
};

export const createUser = (
  token,
  name,
  lastName,
  email,
  password,
  isAdmin,
  wallet
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/register`,
        {
          name,
          lastName,
          email,
          password,
          isAdmin,
          wallet,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (
        response.status !== 404 ||
        response.status === 201 ||
        response.status === 200
      )
        dispatch({
          type: CREATE_USER,
          payload: { message: "Usuario creado", data: response.data },
        });
      if (response.status === 404) {
        let error = { message: "No se pudo crear el usuario." };
        dispatch({ type: CREATE_USER, payload: error });
      }
    } catch {
      dispatch({
        type: CREATE_USER,
        payload: { message: "Usuario con este email ya existe." },
      });
    }
  };
};

export const updateUser = (
  token,
  id,
  name,
  lastName,
  email,
  isAdmin,
  wallet
) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${API_URL}/users/${id}`,
        {
          name,
          lastName,
          email,
          isAdmin,
          wallet,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (
        response.status !== 404 ||
        response.status === 201 ||
        response.status === 200
      )
        dispatch({ type: UPDATE_USER, payload: response.data });
      if (response.status === 404) {
        let error = { message: "No se pudo actualizar el usuario." };
        dispatch({ type: UPDATE_USER, payload: error });
      }
    } catch {
      dispatch({
        type: UPDATE_USER,
        payload: { message: "Error en petición." },
      });
    }
  };
};

export const deleteUser = (id, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (
        response.status !== 404 ||
        response.status === 201 ||
        response.status === 200
      )
        dispatch({
          type: DELETE_USER,
          payload: { message: "Usuario borrado.", data: response.data },
        });
      if (response.status === 404) {
        let error = { message: "No se pudo borrar al usuario." };
        dispatch({ type: DELETE_USER, payload: error });
      }
    } catch {
      dispatch({
        type: DELETE_USER,
        payload: { message: "Error en petición." },
      });
    }
  };
};

export const cleanCreateMessage = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAN_MESSAGE_CREATE, payload: "" });
  };
};

export const cleanUpdateMessage = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAN_MESSAGE_UPDATE, payload: "" });
  };
};

export const cleanDeleteMessage = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAN_MESSAGE_DELETE, payload: "" });
  };
};

export const cleanSearchedUsers = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAN_SEARCHED_USERS, payload: [] });
  };
};
