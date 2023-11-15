import Link from "next/link";
import {  useSelector } from "react-redux";
const MenuItem = () => {
  const searchUser = useSelector((state) => state.userReducer.searchUser);
  const { isAdmin } = searchUser;
  
  
  if (searchUser && searchUser.isAdmin) {
    return (
      <div className="flex items-center justify-between py-2">
        <ul className="text-orange-500 text-xl hidden lg:flex items-center">
          <li className="py-2 px-8 flex">
            <Link href={'/event'}>Events</Link>
          </li>
          
          {searchUser.isAdmin && (
            <li className="py-2 px-8 flex">
              <Link href={'/admin'}>Admin</Link>
            </li>
          )}

          <li className="block p-2 hover:bg-gray-200">
            <Link href={`/reviews`}>Reviews</Link>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-between py-2">
        <ul className="text-orange-500 text-xl hidden lg:flex items-center">
          <li className="py-2 px-8 flex">
            <Link href={'/event'}>Events</Link>
          </li>
          
        </ul>
      </div>
    );
  }
}

export default MenuItem;
