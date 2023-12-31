import { 
  ADD_TO_CART ,
  REMOVE_FROM_CART,
  HIDE_LOADING,
  CLEAR_CART,
} from "../action-type/cartConstans";
import Cookies from 'js-cookie'

const initialState = Cookies.get('cart')
  ? { ...JSON.parse(Cookies.get('cart')), loading: true }
  : {
      loading: true,
      cartItems: [],
    }
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2); 
};



const cartReducer = (state = initialState , action) => {
  switch(action.type){
      case ADD_TO_CART:
          const item = action.payload;
          const existItem = state.cartItems.find((x) => x.id === item.id);
          if (existItem) {
              state.cartItems = state.cartItems.map((x) =>x.id === existItem.id ? item : x);
          }else{
              state.cartItems = [...state.cartItems, item];
          }

          state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
          state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.shippingPrice));
          Cookies.set('cart', JSON.stringify(state))
          return { 
            ...state 
          };

      case REMOVE_FROM_CART:
          const itemIdToRemove = action.payload;
          state.cartItems = state.cartItems.filter((x) => x.id !== itemIdToRemove);
          state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
          state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.shippingPrice));
          Cookies.set('cart', JSON.stringify(state))
          return { 
            ...state,
          }
          
      case HIDE_LOADING:
          state.loading = false;
          return { ...state };
      case CLEAR_CART:
        Cookies.remove('cart');
         return {
          ...state,
          loading: false, 
          cartItems: []
         }
      default:
        return state; 
  }
}

export default cartReducer;