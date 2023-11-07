import { CREATE_TICKET } from "../action-type/ticketConstants";

const initialState = {
  tickets: [],
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    default:
      return state;
  }
};

export default ticketReducer;
