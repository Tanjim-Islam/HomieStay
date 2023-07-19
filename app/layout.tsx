import './globals.css'
import { Nunito } from 'next/font/google'

import Navbar from "./components/navbar/Navbar"
import ToasterProvider from "./providers/ToasterProvider";

import RegisterModal from './components/modals/RegisterModal';
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";


import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';



const font = Nunito({ 

  subsets: ['latin'] 

})

export const metadata = {  
  title: "HomieStay",
  description: "This is a University Project",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
