import { Outlet } from 'react-router-dom'
import {
  Navbar,
  Footer
} from '../components';
const Layout = ({ user }) => {
  const page = window.location.pathname.split('/')
  return(
    <>
      <Navbar page={page[1]} user={user} />
      <div className='relative w-full mx-auto mt-[62px] px-32 py-12 box-border'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout