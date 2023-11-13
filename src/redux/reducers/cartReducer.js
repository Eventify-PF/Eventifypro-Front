import { 
  ADD_TO_CART ,
  REMOVE_FROM_CART,
  HIDE_LOADING,
  CLEAR_CART,
} from "../action-type/cartConstans";

const initialState = {
  loading: true, 
  cartItems: [],
};
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2); // 12.3456 to 12.35
};

const cartReducer = (state = initialState , action) => {
  switch(action.type){
      case ADD_TO_CART:
          const item = action.payload;
      console.log(item)
          const existItem = state.cartItems.find((x) => x.id === item.id);
          console.log(item)
          if (existItem) {
              state.cartItems = state.cartItems.map((x) =>x.id === existItem.id ? item : x);
          }else{
              state.cartItems = [...state.cartItems, item];
          }

          state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
          state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.shippingPrice));
          //localStorage.setItem('cart', JSON.stringify(state));
          return { ...state };

      case REMOVE_FROM_CART:
          const itemIdToRemove = action.payload;
          state.cartItems = state.cartItems.filter((x) => x.id !== itemIdToRemove);
          state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
          state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.shippingPrice));
          //localStorage.setItem('cart', JSON.stringify(state));
          return { 
              ...state,
          }
          
      case HIDE_LOADING:
          state.loading = false;
          return { ...state };
      case CLEAR_CART:
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
