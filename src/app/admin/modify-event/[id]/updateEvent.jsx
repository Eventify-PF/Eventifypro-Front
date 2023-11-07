"use client";

import { updateEvent } from "@/redux/action/eventActions";
import { getAllEventTypes } from "@/redux/action/eventTypeActions";
import validateForm from "@/utils/validateForm";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditEventForm = ({ detailEvent }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const allEventTypes = useSelector(
    (state) => state.eventTypeReducer.eventTypes
  );

  useEffect(() => {
    dispatch(getAllEventTypes());
  }, []);

  const [event, setEvent] = useState({
    id: detailEvent.id,
    title: detailEvent.title,
    location: detailEvent.location,
    date: detailEvent.date,
    description: detailEvent.description,
    image: detailEvent.image,
    eventType: detailEvent.eventType,
  });

  console.log("ANTES: ", detailEvent.eventType);
  console.log("DESPUES: ", event);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
    setErrors(validateForm({ ...event, [e.target.name]: e.target.value }));
  };

  const handleDisabled = () => {
    for (let error in errors) {
      if (errors[error] !== "") return true;
    }
    return false;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(event);
      dispatch(updateEvent(event));
      setMessage("You updated a new event!");
      setEvent({
        title: "",
        location: "",
        date: "",
        description: "",
        image: "",
        eventType: "",
      });
    } catch (error) {
      setMessage("There is a problem:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl mb-4">ENTER NEW EVENT DATA</h2>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="title"
          placeholder={detailEvent.title}
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
          placeholder={detailEvent.location}
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
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="image"
          placeholder="Enter a URL..."
          type="url"
          value={event.image}
          onChange={handleChange}
        />
        <span className="text-red-500 text-xs italic">{errors.image}</span>
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
          <option value="">{event.eventType}</option>
          {allEventTypes?.map((elem) => (
            <option key={elem.id} value={elem.id}>
              {elem.name}
            </option>
          ))}
        </select>

        <span className="text-red-500 text-xs italic">{errors.eventType}</span>
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
      </form>
    </div>
  );
};

export default EditEventForm;
