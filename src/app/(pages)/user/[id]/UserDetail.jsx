"use client";

import { passwordUser, updateUser } from "@/redux/action/userAction";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

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
    isAdmin: userDetail.isAdmin,
    superAdmin: userDetail.superAdmin,
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
        isAdmin: userDetail.isAdmin || false,
        superAdmin: userDetail.superAdmin || false,
      });
    }
  }, [userDetail]);

  // console.log("estado local: ", user);
  // console.log("parametro: ", userDetail);

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
      <div className="bg-white shadow-md rounded w-full max-w-7xl">
        <div className="flex w-full">
          <button
            onClick={() => handleOptionChange("form1")}
            className={`w-1/4 rounded-l-md ${
              option === "form1"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            } font-bold py-2 px-4 focus:outline-none focus:shadow-outline`}
          >
            Personal information
          </button>
          {/* <button
            onClick={() => handleOptionChange("form2")}
            className={`w-1/2 rounded-r-md ${
              option === "form2"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            } font-bold py-2 px-4 focus:outline-none focus:shadow-outline`}
          >
            Password
          </button> */}
        </div>
        <div>
          {/* {option === "form1" ? ( */}
          <div className="flex items-center mt-4 ">
            <form
              onSubmit={handleSubmit}
              className="px-8 pt-8 pb-6 w-full mx-auto"
            >
              <h2 className="text-2xl mb-4">Edit your data {user.name}!</h2>
              <div className="flex mb-4 items-center">
                <label className="block text-gray-700 text-sm font-bold mb-4 mr-4">
                  Name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full max-w-full py-2 px-4 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                  name="name"
                  type="text"
                  value={user.name}
                  onChange={handleChange}
                />

                <label className="block text-gray-700 text-sm font-bold mb-4 mr-4 ml-4">
                  Lastname:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="lastname"
                  type="text"
                  value={user.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex mb-4 items-center">
                <label className="block text-gray-700 text-sm font-bold mb-4 mr-4">
                  Email:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full max-w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                  name="email"
                  type="email"
                  value={user.email}
                  readOnly
                />
              </div>
              <div className="flex mb-4 mt-6 items-center">
                <label className="block text-gray-700 text-sm font-bold mb-4 mr-4">
                  Location:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="location"
                  type="text"
                  value={user.location}
                  onChange={handleChange}
                />

                <label className="block text-gray-700 text-sm font-bold mb-4 mr-4 ml-4">
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
              </div>
              <div className="flex mb-4 mt-6 items-center">
                <label className="block text-gray-700 text-sm font-bold mb-4 mr-4">
                  isAdmin:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full max-w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                  name="isAdmin"
                  type="text"
                  value={user.isAdmin}
                  readOnly
                />

                <label className="block text-gray-700 text-sm font-bold mb-4 mr-4 ml-4">
                  superAdmin:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full max-w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                  name="superAdmin"
                  type="text"
                  value={user.superAdmin}
                  readOnly
                />
                <br />
              </div>
              <div className="flex justify-end items-center mt-12">
                <div className="flex items-center">
                  <span className="ml-4 text-gray-400 text-sm font-bold">
                    Do you want to change your status? Be admin or super admin?
                    Contact us!
                  </span>
                  <Link href={`/contact`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
                      CONTACT
                    </button>
                  </Link>
                </div>
                <div className="flex flex-col ml-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    SUBMIT
                  </button>
                  {message && (
                    <span className="text-red-500 text-xs italic">
                      {message}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
          {/* ) : (
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
          )} */}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
