import axios from "axios";
import { GET_ALL_PRODUCTS } from "./actionTypes";

let API_URL = 'http://localhost:4000/api'

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
      let error = [{ name: "No se encontraron productos." }];
      if (response.status === 200)
        dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
      if (response.status === 404)
        dispatch({ type: GET_ALL_PRODUCTS, payload: error });
    } catch {
      dispatch({ type: GET_ALL_PRODUCTS, payload: { message: "error" } });
    }
  };
};
