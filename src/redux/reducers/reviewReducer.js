import { ADD_REVIEW, GET_REVIEWS, DELETE_REVIEW } from "../action-type/reviewConstans";

const initialState = {
    reviews:[]
}

const reviewReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REVIEWS:
            return{
                ...state,
                reviews:[...action.payload]
            }
        case ADD_REVIEW:
            return{
                ...state,
                reviews:[...state.reviews, action.payload]
            }
        case DELETE_REVIEW:
            const reviewIdToDelete = action.payload;
            const updatedReviews = state.reviews.filter(review => review.id !== reviewIdToDelete);
            return{
                ...state,
                reviews: [...updatedReviews]
            }
           
        default:
            return state;
    }
}

export default reviewReducer;