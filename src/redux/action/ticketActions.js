import { CREATE_TICKET, UPDATE_TICKET } from "../action-type/ticketConstants";
import axios from "axios";

export const createTicket = (ticket) => {
  return async (dispatch) => {
    const { data } = await axios.post("/events/ticket", ticket);
    return dispatch({ type: CREATE_TICKET, payload: data });
  };
};

export const updateTicket = (ticket) => {
  return async (dispatch) => {
    const { data } = await axios.put("/events/ticket", ticket);
    return dispatch({ type: UPDATE_TICKET, payload: data });
  };
};
