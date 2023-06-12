import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

import Button from "../Button/button";
import Input from "../Input/input";

import { AuthService } from "../../services"

PopupAuth.propTypes = {
  close: PropTypes.func.isRequired
}

export default function PopupAuth(props) {
  const navigate = useNavigate();
  const account = AuthService.getCurrentUser();
  const spec = {
    email: { name: 'email', title: 'Email', placeholder: 'Enter your email', type: 'email' },
    password: { name: 'password', title: 'Password', placeholder: 'Enter your password', type: 'password' },
  }

  const [state, setState] = useState({
    input: {
      email: '',
      password: ''
    },
    error: ''
  })

  const handleChange = (e) => {
    setState(prev => ({
      ...prev,
      input: {
        ...prev.input,
        [e.target.name]: e.target.value
      }
    }))
  }

  const handleLogin = () => {
    AuthService.login(state.input.email, state.input.password)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        setState(prev => ({
          ...prev,
          error: error.message
        }))
      })
  }

  const handleLogout = () => {
    AuthService.logout()
    navigate('/')
  }

  return(
    <div className="absolute top-[72px] right-2 w-72 p-6 bg-white border rounded drop-shadow z-10">
      {
        !account ?
          <div className="relative flex flex-col justify-center items-center gap-4">
            <h3 className="text-zinc-500">Log In ?</h3>
            <div className="w-full flex flex-col gap-4">
              <Input
                type={spec.email.type}
                title={spec.email.title}
                name={spec.email.name}
                placeholder={spec.email.placeholder}
                value={state.input.email}
                onChange={handleChange}
              />
              <Input
                type={spec.password.type}
                title={spec.password.title}
                name={spec.password.name}
                placeholder={spec.password.placeholder}
                value={state.input.password}
                onChange={handleChange}
              />
            </div>
            <div className="relative flex flex-row flex-nowrap gap-8 justify-center items-center">
              <Button
                text={'Cancel'}
                typeColor={'secondary'}
                onClick={props.close}
              />
              <Button
                text={'Login'}
                typeColor={'primary'}
                onClick={handleLogin}
              />
            </div>
          </div>
        : <div className="relative flex flex-col justify-center items-center gap-4">
            <h3 className="text-zinc-500">Log Out ?</h3>
            <div className="relative flex flex-row flex-nowrap gap-8 justify-center items-center">
              <Button
                text={'Logout'}
                typeColor={'secondary'}
                onClick={handleLogout}
              />
            </div>
          </div>
      }
    </div>
  )
}