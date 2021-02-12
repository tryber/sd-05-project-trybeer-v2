import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Context from '../context/Context';
import { registerUser } from '../services/api';
import { validateRegister } from '../services/validateRegister';
import logo from '../images/logo.png';
import './css/register.css';
// import Form from '..components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import {
  iName,
  iPassword,
  iCheckbox,
  iEmail,
  bRegister,
} from '../components/data/registerData.json';

async function handleReg(userToRegister, setDesignetedRoute, userEmail) {
  if (!validateRegister(userToRegister)) return setDesignetedRoute(undefined);
  const response = await registerUser(userToRegister);
  if (response.message) {
    const labelEmail = document.querySelector('#lblEmail');
    const alreadyExists = document.createElement('span');
    alreadyExists.innerHTML = 'E-mail already in database.';
    return labelEmail.appendChild(alreadyExists);
  }
  localStorage.setItem('role', response.role);
  localStorage.setItem('token', response.token);
  localStorage.setItem('email', userEmail);
  return response.role === 'client'
    ? setDesignetedRoute('/products')
    : setDesignetedRoute('/admin/orders');
}
const Register = () => {
  const { userName, userEmail, seller, password } = useContext(
    Context
  );
  const [designatedRoute, setDesignetedRoute] = useState(undefined);
  const userData = {
    name: userName,
    email: userEmail,
    password,
    checkbox: seller,
  };

  const handleRegister = async (userReg,e) => {
    e.preventDefault();
    console.log("OIIIIIIIIIIIIIi");
    handleReg(userReg, setDesignetedRoute, userEmail);
  };

  return (
    <div className="register">
      <img src={ logo } alt="logo" className="logo" />
      { designatedRoute !== undefined ? <Redirect to={ designatedRoute } /> : null}
      <form id="register-form">
        <Input i={ iName } />
        <Input i={ iEmail } />
        <Input i={ iPassword } />
        <Input i={ iCheckbox } />
        <div className="buttons">
          <Button b={bRegister} disabled={!validateRegister(userData)} onClick={(e)=> handleRegister(userData,e)}/>
          {/* <button
            type="submit"
            data-testid="signup-btn"
            disabled={!validateRegister(userData)}
            onClick={(e) => handleRegister(userData, e)}
            className="user-register"
          >
            Cadastrar
          </button> */}
          <button type="button" className="btn-return">
            <Link to="/login">Voltar</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
