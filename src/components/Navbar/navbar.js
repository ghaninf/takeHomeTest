"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

import Button from "../Button/button";
import PopupAuth from "../Popup/popupAuth";
import { AuthService } from "@/services";


export default function Navbar() {
  const [popup, setPopup] = useState(null)
  const [state, setState] = useState({
    page: '',
    user: undefined
  })
  
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

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const page = window.location.pathname.split('/')[1]
    setState({
      page: page,
      user: user
    })
  }, [])

  return(
    <nav className="fixed top-0 left-0 right-0 w-full bg-white py-3 px-28 flex flex-row flex-nowrap justify-between border-b drop-shadow z-50">
      <ul className="w-3/4 flex flex-row flex-nowrap gap-8 items-center text-zinc-500 [&>*]: ">
        <li className={`border-b cursor-pointer ${menu.products.page === state?.page ? 'text-zinc-800 border-green-500' : 'border-transparent'} hover:text-zinc-800 hover:border-green-500`}>
          <Link href={menu.products.link} >
            {menu.products.title}
          </Link>
        </li>
        {
          state?.user && 
          <li className={`border-b cursor-pointer ${menu.manage.page === state?.page ? 'text-zinc-800 border-green-500' : 'border-transparent'} hover:text-zinc-800 hover:border-green-500`}>
            <Link href={menu.manage.link} >
              {menu.manage.title}
            </Link>
          </li>
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