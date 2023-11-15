import {
  POST_USER,
  GET_USER,
  SEARCH_USER_BY_EMAIL,
  USER_ORDER,
} from "../action-type/userConstans";

const initialState = {
  userDetail: [],
  isAdmin: false,
  searchUser: {},
  orders: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        userDetail: action.payload.user,
        isAdmin: action.payload.isAdmin,
      };
    case POST_USER:
      return {
        ...state,
        userDetail: action.payload,
      };

    case SEARCH_USER_BY_EMAIL:
      console.log("Datos del backend recibidos:", action.payload); // Agrega este console.log
      return {
        ...state,
        searchUser: action.payload,
      };
    case USER_ORDER:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
}

export default userReducer;
