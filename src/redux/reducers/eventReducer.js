import {
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILED,
  SEARCH_EVENT_REQUEST,
  SEARCH_EVENT_SUCCESS,
  SEARCH_EVENT_FAILED,
  FILTER_TYPE,
  FILTER_TYPE_FAILURE,
  FILTER_DATE,
  FILTER_DATE_FAILURE,
  FILTER_EVENTS,
  FILTER_EVENTS_FAILURE,
  CREATE_EVENT,
  GET_EVENTS,
  GET_ALL_EVENTS,
  SET_CURRENT_PAGE,
} from "../action-type/eventConstans";

const initialState = {
  allEvents: [],
  events: [],
  eventsBackup: [],
  pagination: {
    currentPage: 1,
  },
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        eventsFilter: action.payload,
      };
    case GET_ALL_EVENTS:
      return { ...state, allEvents: action.payload };
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case FETCH_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        events: action.payload,
        eventsBackup: action.payload,
      };
    case FETCH_EVENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEARCH_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
        filteredEventDates: action.payload,
      };
    case SEARCH_EVENT_FAILED:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case FILTER_TYPE:
       if(action.payload === "all"){
        return {
          ...state,
          events: state.eventsBackup
        }
       } else {
         return {
           ...state,
           events: action.payload,
         };

       }
    case FILTER_TYPE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FILTER_DATE:
      return {
        ...state,
        events: action.payload,
      };
    case FILTER_DATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FILTER_EVENTS:
      // Manejar la acción de filtro combinado por tipo y fecha
      return {
        ...state,
        events: action.payload,
      };
    case FILTER_EVENTS_FAILURE:
      // Manejar la acción de error en el filtro combinado por tipo y fecha
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload,
        },
      };
    default:
      return state;
  }
};

export default eventReducer;
