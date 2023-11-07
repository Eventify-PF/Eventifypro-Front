import {
  CREATE_EVENTTYPE,
  GET_EVENTTYPES,
} from "../action-type/eventTypeConstans";
import axios from "axios";

export const getAllEventTypes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/eventTypes`);

      return dispatch({
        type: GET_EVENTTYPES,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
