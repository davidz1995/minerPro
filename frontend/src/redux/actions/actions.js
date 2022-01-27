import axios from "axios";
import { GET_ALL_PRODUCTS } from "./actionTypes";

export const getProducts = (authorized) => {
    return async (dispatch) => {
        //try{
            const response = await axios.get(`http://localhost:4000/api/products`)
            dispatch({ type:GET_ALL_PRODUCTS, payload: response.data})
            /* let error = [{name: 'No se encontraron productos.'}]
            if(response.status === 200) dispatch({type: GET_ALL_PRODUCTS, payload: response.data})
            if(response.status === 404) dispatch({type: GET_ALL_PRODUCTS, payload: error})
        }
        catch{
            dispatch({type: GET_ALL_PRODUCTS, payload: {message:"error"}})
        } */
        /*const response = await axios.get(`http://localhost:4000/api/products`, {
            headers:{
                Authorization: 'Bearer ' + authorized
            }
        } )
        let error = [{name: 'No se encontraron productos.'}]
        if(response.status === 200) dispatch({type: GET_ALL_PRODUCTS, payload: response.data})
        if(response.status === 404) dispatch({type: GET_ALL_PRODUCTS, payload: error})*/
        }
}