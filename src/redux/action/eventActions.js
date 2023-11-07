import {
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILED,
  SEARCH_EVENT_REQUEST,
  SEARCH_EVENT_SUCCESS,
  SEARCH_EVENT_FAILED,
  CREATE_EVENT,
  GET_EVENTS,
  GET_ALL_EVENTS,
  SET_CURRENT_PAGE,
  UPDATE_EVENT,
  FILTER_TYPE,
  FILTER_TYPE_FAILURE,
  FILTER_DATE,
  FILTER_DATE_FAILURE,
  FILTER_EVENTS,
  FILTER_EVENTS_FAILURE
} from "../action-type/eventConstans";
import axios from "axios";

export const getEvents = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/events/");
    return dispatch({ type: GET_EVENTS, payload: data });
  };
};

export const createEvent = (event) => {
  return async (dispatch) => {
    const { data } = await axios.post("/events/", event);
    return dispatch({ type: CREATE_EVENT, payload: data });
  };
};

export const updateEvent = (event) => {
  return async (dispatch) => {
    const { data } = await axios.put("/events/", event);
    return dispatch({ type: UPDATE_EVENT, payload: data });
  };
};

export const fetchEvents = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_EVENT_REQUEST });
    try {
      const { data } = await axios.get("/events");
      dispatch({ type: FETCH_EVENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_EVENT_FAILED,
        payload: error.response.data.error,
      });
    }
  };
};

export const getAllEvents = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/events/all");
    dispatch({ type: GET_ALL_EVENTS, payload: data });
  };
};

export const searchEvent = (name) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SEARCH_EVENT_REQUEST });
      const response = await axios.get(`/events?name=${name}`);
      return dispatch({
        type: SEARCH_EVENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_EVENT_FAILED,
        payload: error.response.data.error,
      });
    }
  };
};

export const filterEventsByType = (eventType) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/events?eventType=${eventType}`);
      dispatch({ type: FILTER_TYPE, payload: response.data });
    } catch (error) {
      dispatch({ type: FILTER_TYPE_FAILURE, payload: error.message });
    }
  };
};

export const filterEventsByDate = (date) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/events?date=${date}`);
      dispatch({ type: FILTER_DATE, payload: response.data });
    } catch (error) {
      dispatch({ type: FILTER_DATE_FAILURE, payload: error.message });
    }
  };
};

// export const filterEventsByTypeAndDate = (eventType, date) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`/events?eventType=${eventType}&date=${date}`);
//       dispatch({ type: FILTER_EVENTS, payload: response.data });
//     } catch (error) {
//       dispatch({ type: FILTER_EVENTS_FAILURE, payload: error.message });
//     }
//   };
// };


export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};
