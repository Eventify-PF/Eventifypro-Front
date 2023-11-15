import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const NavBarUser = () => {
  const searchUser = useSelector((state) => state.userReducer.searchUser);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = () => {
    setMenuOpen(!menuOpen);
  };

  if (searchUser && searchUser.isAdmin) {
    return (
      <div className="relative flex items-center">
        <button onClick={handleChange} className="flex items-center">
          <span className="text-white">{searchUser.name}</span>
          <Image
            src="images/arrow-down.svg"
            height="25"
            width="25"
            alt="arrow-down"
            style={{ backgroundColor: "orange", marginLeft: "5px" }}
          />
        </button>
        {menuOpen && (
          <ul className="absolute left-0 top-full mt-2 w-full bg-white border rounded-md shadow-lg">
            <li className="block p-2 hover:bg-gray-200">
              <Link href={`/user/}`}>Profile</Link>
            </li>

            {searchUser.isAdmin && (
              <div>
                <li className="block p-2 hover:bg-gray-200">
                  <Link href={`/admin`}>Dashboard Events</Link>
                </li>
              </div>
            )}
            {searchUser.superAdmin && (
              <div>
                <li className="block p-2 hover:bg-gray-200">
                  <Link href={`/superadmin`}>Dashboard Users</Link>
                </li>
              </div>
            )}
          </ul>
        )}
      </div>
    );
  } else {
    return (
      <div className="relative flex items-center">
        <button onClick={handleChange} className="flex items-center">
          <span className="text-white">{searchUser.name}</span>
          <Image
            src="public/images/arrow-down.svg"
            height="25"
            width="25"
            alt="arrow-down"
            style={{ backgroundColor: "orange", marginLeft: "5px" }}
          />
        </button>
        {menuOpen && (
          <ul className="absolute left-0 top-full mt-2 w-full bg-white border rounded-md shadow-lg">
            <li className="block p-2 hover:bg-gray-200">
              <Link href={`/user/}`}>Profile</Link>
            </li>
          </ul>
        )}
      </div>
    );
  }
};
export default NavBarUser;
