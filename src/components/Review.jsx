'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import StarRating from './StarRating';
import { createReview, deleteReview, getReviews } from '@/redux/action/reviewAction';
import Error from './Error';
import { useUser } from "@auth0/nextjs-auth0/client";

const Review = () => {
  const dispatch  = useDispatch();
  const reviewState = useSelector((state) => state.reviewReducer);
  const { user, isLoading } = useUser();
  const { reviews } = reviewState;
  const [points, setPoints] = useState(0);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
 
  const [error, setError] = useState(false)
  const activeUser = useSelector((state) => state.userReducer.searchUser);
  const users = activeUser.email;

  
  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
    setPoints(selectedRating);
  };

  useEffect(() => {
    dispatch(getReviews())
  }, [dispatch])

 
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(points === 0 || [comment].includes('')){
      setError(true)
      return;
    }

    setError(false)
    try {
        const newComent = { comment, points, users } 
        const {data} = await axios.post('http://localhost:3001/comments', newComent);
        dispatch(createReview({id: data.id, comment, points, users:activeUser.name}))
        setPoints(0);
        setRating(0);
        setComment('');
      } catch (error) {
    }
  };
  
  
  
  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/comments/delet/${id}`)
      dispatch(deleteReview(id))
    } catch (error) {
      alert('Error Deleting This Task')
    }
  }

  const starRating = <>
      {[...Array(5)].map((_, index) => {
      const starIndex = index + 1;
        return (
          <button
              key={index}
              className={`focus:outline-none ${starIndex <= (hover || rating) ? "text-yellow-700" : "text-gray-300 dark:text-gray-500"}`}
              onClick={() => handleRatingChange(starIndex)}
              onMouseEnter={() => setHover(starIndex)}
              onMouseLeave={() => setHover(0)}
            >
              <span className="start-0 text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </span>
          </button>
        )
      })}
  </>
  return (
    <section>
      <div className="max-w-[2520px] mx-autoxl:px-20 md:px-10 sm:px-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row my-6 md:my-24">
          <div className="flex flex-col w-full lg:w-1/3 p-8">
            <label htmlFor="message" className="ml-6 text-sky-950 text-lg uppercase tracking-loose block mb-2">
              REVIEW
            </label>
            <h2 className="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug">Leave us a feedback!</h2>
            <p className="text-sm md:text-base leading-snug text-gray-800 text-opacity-100">
              Please leave us your valuable comments.
            </p>
          </div>
          <div className="flex flex-col w-full lg:w-2/3 justify-center">
            <div className="container w-full px-4">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
                    <div className="flex-auto p-5 lg:p-10">
                    { error &&  <Error><p>Rating and comment are mandatory</p></Error>}
                    <div className="relative w-full mb-3">
                      <p htmlFor="rating" className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Rating
                      </p>
                      {starRating}
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="relative w-full mb-3">
                          <label htmlFor="message" className="block uppercase text-gray-700 text-xs font-bold mb-2">
                            Comment
                          </label>
                          <textarea
                            id="message"
                            type='text'
                            value={comment}
                            onChange={ (e) => setComment(e.target.value) }
                            className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                          ></textarea>
                        </div>
                        
                        <div className="text-center mt-6">
                          <button
                            type="submit"
                            disabled={!user}
                            className="bg-orange-500 text-black text-center mx-auto active:bg-orange-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-14">
          {
            
              reviews.map((review) => (
                <div key={review.id} className="flex flex-col gap-4 text-white bg-gray-700 p-4">
                <div className="flex justify justify-between">
                  <div className='flex gap-2'>
                    <div class="w-7 h-7 text-center rounded-full bg-red-500"></div>
                    <span>{review.users}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1 gap-1 text-orange-300">
                    <StarRating points={review.points} />
                    <button className="mt-2 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600" onClick={() => deleteComment(review.id)}>X</button>
                  </div>
                  
                </div>
               
                <p>{review.comment}</p>
                </div>
              )
            )
          }
        </div>
      </div>
     
    </section>
  );
};

export default Review;
