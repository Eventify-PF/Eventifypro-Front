import { GET_EVENTTYPES } from "../action-type/eventTypeConstans";
const initialState = {
  eventTypes: [],
};

const eventTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTTYPES:
      return {
        ...state,
        eventTypes: action.payload,
      };
    default:
      return state;
  }
};

export default eventTypeReducer;
