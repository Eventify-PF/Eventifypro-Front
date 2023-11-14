"use client";

import { passwordUser, updateUser } from "@/redux/action/userAction";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const UserDetail = ({ userDetail }) => {
  const dispatch = useDispatch();
  const [option, setOption] = useState("form1");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [user, setUser] = useState({
    id: userDetail?.id,
    name: userDetail?.name,
    lastname: userDetail.lastname,
    email: userDetail.email,
    location: userDetail.location,
    phone: userDetail.phone,
  });

  const [pass, setPass] = useState({
    id: userDetail.id,
    password: "",
    newPassword: "",
    newPasswordCopy: "",
  });

  const handleChangePassword = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userDetail.name) {
      setUser({
        id: userDetail.id,
        name: userDetail.name,
        lastname: userDetail.lastname || "",
        email: userDetail.email || "",
        location: userDetail.location || "",
        phone: userDetail.phone || "",
      });
    }
  }, [userDetail]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (newOption) => {
    setOption(newOption);
    setPass({
      id: userDetail.id,
      password: "",
      newPassword: "",
      newPasswordCopy: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(user);
    try {
      await dispatch(updateUser(user));
      setMessage("Your data is updated!");
    } catch (error) {
      setMessage("There is a problem:", error);
    }
  };

  const handleSubmitPass = async (e) => {
    e.preventDefault();
    //console.log(pass);
    try {
      await dispatch(passwordUser(pass));
      setMessage2("You'd changed your password!");
    } catch (error) {
      setMessage2("There is a problem:", error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded w-full max-w-md">
        <div className="flex w-full ">
          <button
            onClick={() => handleOptionChange("form1")}
            className={`w-1/2 rounded-l-md ${
              option === "form1"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            } font-bold py-2 px-4 focus:outline-none focus:shadow-outline`}
          >
            Personal information
          </button>
          <button
            onClick={() => handleOptionChange("form2")}
            className={`w-1/2 rounded-r-md ${
              option === "form2"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            } font-bold py-2 px-4 focus:outline-none focus:shadow-outline`}
          >
            Password
          </button>
        </div>
        <div>
          {option === "form1" ? (
            <div className="flex justify-center items-center mt-4">
              <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8">
                <h2 className="text-2xl mb-4">
                  Edit your data {userDetail.name}!
                </h2>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="name"
                  type="text"
                  value={user.name}
                  onChange={handleChange}
                />
                <br />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Lastname:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="lastname"
                  type="text"
                  value={user.lastname}
                  onChange={handleChange}
                />
                <br />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  type="email"
                  value={user.email}
                  readOnly
                />
                <br />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Location:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="location"
                  type="text"
                  value={user.location}
                  onChange={handleChange}
                />
                <br />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="phone"
                  type="text"
                  value={user.phone}
                  onChange={handleChange}
                />
                <br />
                {message && (
                  <span className="text-red-500 text-xs italic">{message}</span>
                )}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  SUBMIT
                </button>
              </form>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-4">
              <form onSubmit={handleSubmitPass} className="px-8 pt-6 pb-8">
                <h2 className="text-2xl mb-4">Change your password!</h2>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Current password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  type="text"
                  value={pass.password}
                  onChange={handleChangePassword}
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  New Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="newPassword"
                  type="text"
                  value={pass.newPassword}
                  onChange={handleChangePassword}
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Repeat New Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="newPasswordCopy"
                  type="text"
                  value={pass.newPasswordCopy}
                  onChange={handleChangePassword}
                />
                {message2 && (
                  <span className="text-red-500 text-xs italic">
                    {message2}
                  </span>
                )}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  SUBMIT
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
