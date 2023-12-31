"use client";
import React from "react";
import Container from "../Container";
import Logo from "../Logo";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Login from "../../app/api/auth/loginButton";;
import Logout from "../../app/api/auth/logoutButton";;
import BannedUserPage from '../Banned/BannedUserPage';
import { useUser } from "@auth0/nextjs-auth0/client";
import { useDispatch, useSelector} from "react-redux";
import { postUser } from "@/redux/action/userAction";
import { useEffect } from "react";
import { useState } from "react";
import { searchUserByEmail } from "@/redux/action/userAction";
import NavBarUser from "./NavBarUser";

const Navbar = () => {
  const { user, isLoading } = useUser();
  const dispatch = useDispatch();
  const searchUser = useSelector((state) => state.userReducer.searchUser);

  const [showEmailVerificationAlert, setShowEmailVerificationAlert] =
    useState(false);
  const [registrationRequested, setRegistrationRequested] = useState(false);
  const [userBanned, setUserBanned] = useState(false);
  
  

  useEffect(() => {
    if (user && !isLoading) {
      if (!registrationRequested) {
        // Evita solicitudes duplicadas
        setRegistrationRequested(true);

        const userData = {
          name: user.name,
          email: user.email,
          email_verified: user.email_verified,
        };

        dispatch(postUser(userData));
      }
    }
  }, [user, isLoading, dispatch, registrationRequested]);
  useEffect(() => {
    if (user && !isLoading && !user.email_verified) {
      setShowEmailVerificationAlert(true);
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (user && !isLoading) {
      const userEmail = user.email;
      dispatch(searchUserByEmail(userEmail)); // Dispara la acción pasando el correo electrónico
    }
  }, [user, isLoading, dispatch]);
  
  
  useEffect(() => {
    // Check if the user is banned using the information from the searchUser action
    if (searchUser && searchUser.ban) {
      setUserBanned(true);
    }
  }, [searchUser]);


	return ( 
		<div className="fixed w-full bg-gray-800 z-10 shadow-sm">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex flex-row items-center justify-between gap-3 md:gap-0">
						<Logo />
						
						<div className="relative">
							<div className="mt-2 sm:mt-0 sm:flex md:order-2">
								{isLoading ? (
                    <div>Cargando...</div>
                  ) : user ? (
                    <div className="flex items-center"> 
                      
                    <NavBarUser />
                    <Logout />
                  </div>
                ) : (
                    <div>
                  <Login />
                    
                    </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
      {showEmailVerificationAlert && (
        <div className="bg-yellow-200 text-yellow-800 p-2 text-center">
          Tu correo electrónico no ha sido verificado. Por favor, verifica tu
          correo electrónico para continuar.
          <a
            href="/api/auth/logout"
            className="block bg-yellow-600 text-white font-semibold rounded px-4 py-2 mt-2 hover:bg-yellow-700"
          >
            Aceptar
          </a>
        </div>
      )}
      {searchUser && searchUser.ban && <BannedUserPage />}
    </div>
	  
	  );
	}



export default Navbar;
