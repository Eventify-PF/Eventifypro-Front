import { Nunito } from 'next/font/google'
import { Providers } from "@/redux/provider";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from '@/components/Navbar/Navbar';
import { Toaster } from "react-hot-toast";
import './globals.css'

export const metadata = {
  title: 'EventifyPro',
  description: 'Generated by EventifyPro team',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
     <body className={font.className}>
      
      <UserProvider>
          <Providers>
            <Navbar />
            {children}
            <Toaster
              position="top-center"
              reverseOrder={true}
            />
          </Providers>
      </UserProvider>
       
      </body>
    </html>
  );
        
}
