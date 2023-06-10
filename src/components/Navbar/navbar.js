import { useState } from "react";
import Button from "../Button/button";
import PopupAuth from "../Popup/popupAuth";
import { useNavigate } from "react-router-dom";


export default function Navbar({ page, user }) {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null)
  
  const closePopup = () => {
    setPopup(null);
  }

  const openPopup = () => {
    setPopup(<PopupAuth close={closePopup} />)
  }

  const menu = {
    products : { title: 'Products', page: 'products', link: '/products' },
    manage : { title: 'Manage', page: 'manage', link: '/manage' },
  }

  return(
    <nav className="fixed top-0 left-0 right-0 w-full bg-white py-3 px-28 flex flex-row flex-nowrap justify-between border-b drop-shadow">
      <ul className="w-3/4 flex flex-row flex-nowrap gap-8 items-center text-zinc-500 [&>*]: ">
        <li onClick={() => navigate(menu.products.link)} className={`border-b border-transparent cursor-pointer ${menu.products.page === page ? 'text-zinc-800 border-green-500' : ''} hover:text-zinc-800 hover:border-green-500`}>{menu.products.title}</li>
        {
          user && 
          <li onClick={() => navigate(menu.manage.link)} className={`border-b border-transparent cursor-pointer ${menu.manage.page === page ? 'text-zinc-800 border-green-500' : ''} hover:text-zinc-800 hover:border-green-500`}>{menu.manage.title}</li>
        }
      </ul>
      <Button
        text={'Login'}
        typeColor={'primary'}
        onClick={popup ? closePopup : openPopup}
      />
      {popup}
    </nav>
  )
}