"use client";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { getAllUsers } from '../../../redux/action/userAction';
import { updateUser } from '../../../redux/action/userAction';
import { setCurrentPage } from "../../../redux/action/eventActions";
import Pagination from "@mui/material/Pagination";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SuperAdmin = () => {
  const [localUsers, setLocalUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.userReducer.allUsers);
  const currentPage = useSelector((state) => state.eventReducer.pagination.currentPage);
  const usersPerPage = 8;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setLocalUsers(allUsers);
  }, [allUsers]);

  const handleChangePage = (event, value) => {
    dispatch(setCurrentPage(value)); 
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(setCurrentPage(1)); // Restablecer la página actual a 1 cuando cambia el término de búsqueda
  };

  const handlePermissionChange = (userId, permission) => {
    const updatedUsers = localUsers.map(user => ({ ...user }));
    const userToUpdate = updatedUsers.find((user) => user.id === userId);

    if (permission === 'admin') {
      userToUpdate.isAdmin = !userToUpdate.isAdmin;
    } else if (permission === 'superadmin') {
      userToUpdate.superAdmin = !userToUpdate.superAdmin;
    } else if (permission === 'ban') {
      userToUpdate.ban = !userToUpdate.ban;
    }

    setLocalUsers(updatedUsers);
    dispatch(updateUser(userToUpdate, userId));
  };

   // Filtrar usuarios según el término de búsqueda
   const filteredUsers = localUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="max-w-[2520px] mx-autoxl:px-20 md:px-10 sm:px-2 px-4">
      <div className="relative mb-4">
        
        <input
          type="text"
          placeholder="Search users by name..."
          className='w-full p-2 mb-4 border rounded focus:outline-none focus:border-black'
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        
        <ul className="space-y-4">
          {displayedUsers.map((user) => (
            <li key={user.id} className="flex items-center justify-between bg-white p-4 shadow-md rounded-md">
              <div className="flex items-center space-x-4">
              <AccountCircleIcon style={{ fontSize: 50 }} />
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="space-x-2">
              <button
                  onClick={() => handlePermissionChange(user.id, 'ban')}
                  className={`px-4 py-2 ${user.ban ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
                >
                  {user.ban ? 'Desbanear' : 'Banear'}
                </button>
                <button
                  onClick={() => handlePermissionChange(user.id, 'admin')}
                  className={`px-4 py-2 ${user.isAdmin ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
                >
                  {user.isAdmin ? 'Quitar Admin' : 'Brindar Admin'}
                </button>
                <button
                  onClick={() => handlePermissionChange(user.id, 'superadmin')}
                  className={`px-4 py-2 ${user.superAdmin ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
                >
                  {user.superAdmin ? 'Quitar SuperAdmin' : 'Brindar SuperAdmin'}
                </button>
              </div>
            </li>
            
          ))}
          
        </ul>
        <div style={{ marginLeft: '450px', marginTop: '10px' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;