"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../../redux/action/eventActions";
import { getAllEventTypes } from "@/redux/action/eventTypeActions";
import validateForm from "@/utils/validateForm";
 
import Link from "next/link";

const EventPage = () => {
 
  const [event, setEvent] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
    image: "", // Aquí se almacenará la URL de la imagen
    status: "active",
    eventType: "",
    user: "", // Cambié el nombre de 'user' para asignarlo después
  });

  // Estado local para la URL de la imagen
  const [urlImage, setUrlImage] = useState("");

  // Estado local para los errores del formulario
 
  const [errors, setErrors] = useState({});

  // Estado local para el mensaje de éxito o error
  const [message, setMessage] = useState("");

  const allEventTypes = useSelector(
    (state) => state.eventTypeReducer.eventTypes
  );

 

  
 
  // Selector para obtener el usuario desde el estado global
  const user = useSelector((state) => state.userReducer.searchUser);

  // Despachador de acciones Redux
  const dispatch = useDispatch();

  // Efecto para obtener todos los tipos de evento al montar el componente
 
  useEffect(() => {
    dispatch(getAllEventTypes());
  }, [dispatch]);

 
  // Efecto para actualizar el campo 'user' del evento cuando cambia el usuario
 
  useEffect(() => {
    if (user) {
      setEvent((prevEvent) => ({
        ...prevEvent,
        user: user.email,
      }));
    }
  }, [user]);

  // Función para manejar el cambio en la carga de la imagen
  const uploadChange = async (event) => {
    try {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "eventify");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgbvwixwk/image/upload",
        data
      );

      // Actualiza el estado local de la URL de la imagen
      setUrlImage(response.data.secure_url);
      // Actualiza el estado local del evento con la URL de la imagen
      setEvent((prevEvent) => ({ ...prevEvent, image: response.data.secure_url }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
    // Valida el formulario y actualiza el estado de errores
    setErrors(validateForm({ ...event, [e.target.name]: e.target.value }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida el formulario antes de enviarlo
    const formErrors = validateForm(event);
    setErrors(formErrors);

    // Verifica si hay errores antes de enviar la solicitud
    if (Object.keys(formErrors).length === 0) {
      try {
        // Despacha la acción para crear un nuevo evento
        const response = await dispatch(createEvent(event));

        // Verifica si la acción fue exitosa o tiene errores
        if (!response.error) {
          setMessage("You created a new event!");
          setEvent({
            title: "",
            location: "",
            date: "",
            description: "",
            image: "",
            status: "active",
            eventType: "",
            user: user?.email,
          });
          setUrlImage(""); // Limpia la URL de la imagen después de enviar el formulario
        } else {
          setMessage(`There is a problem: ${response.error.message}`);
        }
      } catch (error) {
        setMessage(`There is a problem: ${error.message}`);
      }
    }
  };

  // Función para eliminar la imagen y la URL asociada
  const deleteImage = () => {
    setUrlImage("");
    setEvent((prevEvent) => ({ ...prevEvent, image: "" }));
  };

  // Función para verificar si el botón de envío debe estar deshabilitado
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
          <input
            type="file"
            accept="image/"
            onChange={uploadChange}
          />
          {urlImage && (
            <div className="flex flex-col items-center justify-center">
              <img src={urlImage} alt="Uploaded" className="w-[180px] mb-2 mt-2 rounded" />
              <button onClick={deleteImage} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 text-sm">X</button>
            </div>
          )}
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

