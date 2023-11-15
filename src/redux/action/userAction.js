import axios from "axios";
import {
  POST_USER,
  GET_USER,
  UPDATE_USER,
  SEARCH_USER_BY_EMAIL,
  GET_ALL_USERS, 
  SET_SEARCH_USER,
  PASSWORD_USER,
  USER_ORDER,
} from "../action-type/userConstans";

//const endpoint = `http://localhost:3001/users`;
//const endpoint = `https://server-eventifypro.onrender.com`;

export function postUser(userData) {
  //console.log(userData);
    return async (dispatch) => {
      try {
        const { data } = await axios.post("/users/register", userData);;
        dispatch({
          type: POST_USER,
          payload: data,
        });
      } catch (error) {
        console.log(error);
        return error.message;
      }
    };
  }


export const getUser = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/users/${id}`);
    console.log("Data recibida del backend:", data);
    // Supongamos que `isAdmin` está en los datos recuperados del usuario
    const isAdmin = data.isAdmin;
    return dispatch({ type: GET_USER, payload: { user: data, isAdmin } });
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/users/${user.id}`, user);
    return dispatch({ type: UPDATE_USER, payload: data });
  };
};

export const passwordUser = (user) => {
  return async (dispatch) => {
    console.log("que llega", user);
    const { data } = await axios.put(`/users/password`, user);
    return dispatch({ type: PASSWORD_USER, payload: data });
  };
};

  export const searchUserByEmail = (email) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/users?email=${email}`);
        dispatch({ type: SEARCH_USER_BY_EMAIL, payload: data });
      } catch (error) {
        console.log(error);
        return error.message;
      }
    };
  };

  export const getAllUsers = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get("/users/todos");
        console.log("Datos recibidos en la acción getAllUsers:", data);
        dispatch({ type: GET_ALL_USERS, payload: data });
      } catch (error) {
        console.error("Error en la acción getAllUsers:", error);
        return error.message;
      }
    };
  };

  export const setSearchUser = (searchTerm) => ({
    type: "SET_SEARCH_USER",
    payload: searchTerm,
  });
  
  
  
export const getOrdersByUser = (idUser) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/users/orders?idUser=${idUser}`);
    return dispatch({ type: USER_ORDER, payload: data });
  };
};
