"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ContactPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.searchUser);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setContact((prevEvent) => ({
        ...prevEvent,
        email: user.email,
        name: user?.name,
      }));
    }
  }, [user]);

  const [contact, setContact] = useState({
    name: user?.name,
    email: user?.email,
    subject: "",
    message: "",
  });

  console.log(contact);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(contact);
    e.preventDefault();
    try {
      await fetch("http://localhost:3001/users/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      })
        .then((response) => response.json())
        .then((contact) => console.log(contact))
        .catch((error) => {
          console.error("Error sending email:", error);
        });
      setMessage("Your message has been sent");
      setContact({
        name: user?.name,
        email: user?.email,
        subject: "",
        message: "",
      });
    } catch (error) {
      setMessage("There is a problem:", error.message);
    }
  };

  return (
    <div class="flex flex-col items-center justify-center h-screen dark">
      <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-gray-200 mb-4 text-center">
          Client support
        </h2>
        <div class=" font-bold text-gray-200 mb-4 text-center">
          If you have any complain, suggestion or want to join us, to be part of
          our group to work with us, please send your message here.
        </div>

        <form onSubmit={handleSubmit} class="flex flex-col">
          <div class="bg-gray-700  rounded-md">
            <div class=" text-center text-gray-200 rounded-md p-1 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500  ease-in-out ">
              {contact.name}, {contact.email}
            </div>
          </div>

          <br />
          <input
            placeholder="Subject"
            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            name="subject"
            onChange={handleChange}
          />
          <textarea
            placeholder="Message"
            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            name="message"
            onChange={handleChange}
          ></textarea>

          {message && (
            <span class="text-red-500 text-xs italic">{message}</span>
          )}

          <button
            class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
