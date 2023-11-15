import axios from "axios";
import {GET_REVIEWS, ADD_REVIEW, DELETE_REVIEW } from "../action-type/reviewConstans";

export const getReviews = () => {
    return async (dispatch) => {
      const { data } = await axios.get("/comments");
      return dispatch({ type: GET_REVIEWS, payload: data });
    };
};


export const createReview = (review) => {
    return  (dispatch) => {
      return dispatch({ type: ADD_REVIEW, payload: review });
    };
};


export const deleteReview = (id) => {
    return (dispatch)=>{
        return dispatch({
            type :DELETE_REVIEW ,
            payload: id
        })
    }
}