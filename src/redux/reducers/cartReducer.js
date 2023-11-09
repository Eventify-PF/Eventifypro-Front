import { 
  GET_NUMBER_CART,
  ADD_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART
 } from "../action-type/cartConstans";

 const initialState ={
  numberCart: 0,
  carts: [],
}

const cartReducer = (state = initialState , action) => {
    switch(action.type){
        case GET_NUMBER_CART:
            return {
                ...state,
            };
        case ADD_CART:
            if(state.numberCart === 0){
                const cart = {
                    id: action.payload.id,
                    title: action.payload.title,
                    name: action.payload.name,
                    image: action.payload.image,
                    price: action.payload.price,
                    quantity : action.payload.quantity,
                }
                state.carts.push(cart);
            }else{
                let check = false;
                state.carts.map((item, key) => {
                    if (item.id === action.payload.id) {
                      state.carts[key].quantity++;
                      check = true;
                    }
                });
                if (!check) {
                    let _cart = {
                        id: action.payload.id,
                        title: action.payload.title,
                        name: action.payload.name,
                        image: action.payload.image,
                        price: action.payload.price,
                        quantity : action.payload.quantity,
                    };
                    state.carts.push(_cart);
                }
            }
            return {
                ...state,
                numberCart: state.numberCart + 1,
            };
        case INCREASE_QUANTITY:
            state.carts[action.payload].quantity++;
          
            return {
                ...state,
            };
        case DECREASE_QUANTITY:
            let quantity = state.carts[action.payload].quantity;
            if (quantity > 1) {
                  state.carts[action.payload].quantity--;
            }
                return {
                  ...state,
                };
        case DELETE_CART:
            let quantityTickets = state.carts[action.payload].count;
            return {
                ...state,
                numberCart: state.numberCart - quantityTickets,
                carts: state.carts.filter((item) => {return item.id != state.carts[action.payload].id;}),
            };
        default:
          return state; 
    }
}

export default cartReducer;