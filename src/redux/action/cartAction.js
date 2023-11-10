import Cookies from "js-cookie";
import { 
 ADD_TO_CART ,
 REMOVE_FROM_CART,
 HIDE_LOADING,
 CLEAR_CART
} from "../action-type/cartConstans";


export function AddCart(payload) {
    return {
      type: ADD_TO_CART,
      payload,
    };
}

export function removeFromCart(payload) {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
}

export const hideLoading = () => ({
  type: HIDE_LOADING,
});

export const clearCart = () =>{
  return{
      type: CLEAR_CART
  }
}