'use client';
import React from 'react';
import Container from '../Container';
import Logo from '../Logo';
import MenuItem from './MenuItem';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Login from '../../app/api/auth/loginButton'
import Logout from '../../app/api/auth/logoutButton'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDispatch } from 'react-redux';
import { postUser } from '@/redux/action/userAction'; 
import { useEffect } from 'react';
import { useState } from 'react';
import { searchUserByEmail } from '@/redux/action/userAction';




import { useSelector } from 'react-redux';
const Navbar = () => {
	const cartState = useSelector((state) => state.cartReducer);
    const { numberCart} = cartState;
	const router = useRouter();
  const { user, isLoading } = useUser();
  const dispatch = useDispatch();
  const [showEmailVerificationAlert, setShowEmailVerificationAlert] = useState(false);
  

  useEffect(() => {
    if (user && !isLoading) {
      
      const userData = {
        name: user.name,
        email: user.email,
        email_verified: user.email_verified,
        
      };
      dispatch(postUser(userData));
    }
  }, [user, isLoading, dispatch]);

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
  
  
	return ( 
		<div className="fixed w-full bg-gray-800 z-10 shadow-sm">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex flex-row items-center justify-between gap-3 md:gap-0">
						<Logo />
						<MenuItem/>
						<div className="relative">
							<div className="mt-2 sm:mt-0 sm:flex md:order-2">
								<div className="flex items-center justify-between">
									<div className="text-gray-600 focus:outline-none mx-7 py-1.6 px-6 sm:mx-0">
									<div className='flex flex-row gap-2'>
										<Image
											onClick={() => router.push('/cart')}
											src="/images/carrito.png" 
											height='25' 
											width="25" 
											alt="Logo" 
										/>
										<span className='font-bold text-red-500 inline-block'>
                  						    {numberCart}
                						</span>
									</div>
									</div>
								</div>
								{isLoading ? (
                    <div>Cargando...</div>
                  ) : user ? (
                    <div className="flex items-center"> {/* Contenedor flex para la imagen y el botón */}
                      <img
                        src={user.picture}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full mr-2" 
                      />
                      <Logout /> 
                    </div>
                      
                  ) : (
                    <Login /> 
                  )}
							</div>
						</div>
					</div>
				</Container>
			</div>
      {showEmailVerificationAlert && (
        <div className="bg-yellow-200 text-yellow-800 p-2 text-center">
          Tu correo electrónico no ha sido verificado. Por favor, verifica tu correo electrónico para continuar.
          <a href='/api/auth/logout' className="block bg-yellow-600 text-white font-semibold rounded px-4 py-2 mt-2 hover:bg-yellow-700">Aceptar</a>
        </div>
      )}
	  </div>
	  );
	}



export default Navbar;