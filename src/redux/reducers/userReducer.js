import {POST_USER, GET_USER, SEARCH_USER_BY_EMAIL} from "../action-type/userConstans";
  
const initialState = {
    userDetail: [],
    isAdmin: false,
    searchedUser: null,
} 

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
      return {
        ...state,
        searchedUser: action.payload,
        };
default:
  return state; // Agrega este caso predeterminado
}
};

export default userReducer;
