import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
 
import eventReducer from './reducers/eventReducer';
import eventTypeReducer from './reducers/eventTypeReducer';
import ticketReducer from './reducers/ticketReducer';
import cartReducer from './reducers/cartReducer';
import userReducer from "./reducers/userReducer";
import reviewReducer from "./reducers/reviewReducer";

const rootReducer = combineReducers({
    eventReducer,
    eventTypeReducer,
    ticketReducer,
    cartReducer,
    userReducer,
    reviewReducer
},);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store
