import React from 'react';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  return (
    <div>
      <Form route="/api/user/register/" method="register" />
    </div>
  );
}

export default Register;
