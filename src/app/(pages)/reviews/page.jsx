import Review from '@/components/Review'
import React from 'react'
const loadReviews = async(id) =>{
  // const res = await fetch(`https://server-eventifypro.onrender.com/events/${id}`);
  const res = await fetch('http://localhost:3001/comments');
  const data = await res.json();
  return data
}
export default  function ReviewPage(){
  
  return (
    <div className="max-w-[2520px] mx-autoxl:px-20 md:px-10 sm:px-2 px-4">
      <Review/>
    </div>
  )
}


