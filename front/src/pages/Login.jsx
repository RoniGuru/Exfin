import React from 'react';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <Form route="/api/token/" method="login" />
    </div>
  );
}

export default Login;
