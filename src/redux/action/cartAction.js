import Cookies from "js-cookie";
import { 
 ADD_TO_CART ,
 REMOVE_FROM_CART,
 HIDE_LOADING,
} from "../action-type/cartConstans";

const generateCookieName = (ticketId) => `selectedQuantity_${ticketId}`;

const setStoredQuantity = (ticketId, quantity) => {
  const cookieName = generateCookieName(ticketId);
  Cookies.set(cookieName, quantity);
};

export function AddCart(payload) {
    const { id: ticketId, quantity } = payload;
    setStoredQuantity(ticketId, quantity);
    return {
      type: ADD_TO_CART,
      payload,
    };
}

export function removeFromCart(payload) {
  const cookieName = `selectedQuantity_${payload}`;
  Cookies.remove(cookieName);
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
}

export const hideLoading = () => ({
  type: HIDE_LOADING,
});