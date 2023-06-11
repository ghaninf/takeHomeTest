import { createContext } from 'react';
import { Outlet } from 'react-router-dom'
import {
  Navbar,
  Footer
} from '../components';

export const UserContext = createContext();
const Layout = ({ user, page }) => {
  return(
    <UserContext.Provider value={{ user, pageURL: page }}>
      <Navbar page={page[1]} user={user} />
      <div className='relative w-full mx-auto mt-[62px] px-32 py-12 box-border'>
        <Outlet />
      </div>
      <Footer />
    </UserContext.Provider>
  )
}

export default Layout