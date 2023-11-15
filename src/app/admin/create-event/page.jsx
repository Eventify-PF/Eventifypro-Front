"use client";

import { createEvent } from "../../../redux/action/eventActions";
import { getAllEventTypes } from "@/redux/action/eventTypeActions";
import validateForm from "@/utils/validateForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const EventPage = () => {
  const allEventTypes = useSelector(
    (state) => state.eventTypeReducer.eventTypes
  );

  const user = useSelector((state) => state.userReducer.searchUser);

  //console.log("tengo estos datos del user: ", user);
  const dispatch = useDispatch();
  const [event, setEvent] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
    image: "",
    status: "active",
    eventType: "",
    user: user?.name,
  });

  const [urlImage, setUrlImage] = useState("")
const uploadChange = async (event) =>{
const file = event.target.files[0]
const data = new FormData()
data.append("file", file)
data.append("upload_preset", "eventify")
const response = await axios.post("https://api.cloudinary.com/v1_1/dgbvwixwk/image/upload", data)
setUrlImage(response.data.secure_url)
}
const deleteImage = () => {
  setUrlImage("")
}

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getAllEventTypes());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setEvent((prevEvent) => ({
        ...prevEvent,
        user: user.name,
      }));
    }
    console.log("prueba");
  }, [user]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
    setErrors(validateForm({ ...event, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("El user que se tiene al final: ", user);

    setEvent({ ...event, [event.user]: user.name });
    console.log("Lo que se manda: ", event);
    try {
      dispatch(createEvent(event));
      setMessage("You created a new event!");
      //   setEvent({
      //     title: "",
      //     location: "",
      //     date: "",
      //     description: "",
      //     image: "",
      //     status: "active",
      //     eventType: "",
      //   });

      //   //console.log(event);
    } catch (error) {
      setMessage("There is a problem:", error);
    }
  };

  const handleDisabled = () => {
    for (let error in errors) {
      if (errors[error] !== "") return true;
    }
    return false;
  };

  return (
    <div className="flex justify-center items-center h-screen mt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <span>User: {user.name}</span>
        <h2 className="text-2xl mb-4">ENTER EVENT DATA</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="title"
            placeholder="Enter a title..."
            type="text"
            value={event.title}
            onChange={handleChange}
          />
          <span className="text-red-500 text-xs italic">{errors.title}</span>
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="location"
            value={event.location}
            placeholder="Enter a location..."
            type="text"
            onChange={handleChange}
          />
          <span className="text-red-500 text-xs italic">{errors.location}</span>
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="date"
            type="date"
            value={event.date}
            onChange={handleChange}
          />
          <span className="text-red-500 text-xs italic">{errors.date}</span>
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            placeholder="Enter a brief description..."
            type="text"
            value={event.description}
            onChange={handleChange}
          />
          <span className="text-red-500 text-xs italic">
            {errors.description}
          </span>
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image:
          </label>
          <input type="file" accept="image/*" onChange={uploadChange}/>
          {
            urlImage && (
              <div className="flex flex-col items-center justify-center">
                <img src={urlImage} alt="" className="w-[180px] mb-2 mt-2 rounded"/>
                <button onClick={() => {deleteImage()}} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 text-sm">X</button>
              </div>
            )
          }
          {/* <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="image"
            placeholder="Enter a URL..."
            type="url"
            value={event.image}
            onChange={handleChange}
          /> */}
          <span className="text-red-500 text-xs italic">{errors.image}</span>
          <br />
          <label>New Event Type:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter a new event type"
            name="eventType"
            onChange={handleChange}
            value={event.eventType}
          />
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Type:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="eventType"
            onChange={handleChange}
            value={event.eventType}
          >
            <option value="">Select Event Type</option>
            {allEventTypes?.map((elem) => (
              <option key={elem.id}>{elem.name}</option>
            ))}
          </select>

          <span className="text-red-500 text-xs italic">
            {errors.eventType}
          </span>
          <br />
          {message && (
            <span className="text-red-500 text-xs italic">{message}</span>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={handleDisabled()}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventPage;



// const [urlImage, setUrlImage] = useState("")
// const uploadChange = async (event) =>{
// const file = event.target.files[0]
// const data = new FormData()
// data.append("file", file)
// data.append("upload_preset", "eventify")
// const response = await axios.post("https://api.cloudinary.com/v1_1/dgbvwixwk/image/upload", data)
// setUrlImage(response.data.secure_url)
// }
// const deleteImage = () => {
//   setUrlImage("")
// }
// <div>
//   <input type="file" accept="image/*" onChange={uploadChange}/>
//   {
//     urlImage && (
//       <div>
//       <img src={urlImage} alt="" />
//       <button onClick={() => {deleteImage()}}>Delete Image</button>
//       </div>
//     )
//   }
  
// </div>