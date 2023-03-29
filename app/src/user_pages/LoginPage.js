import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(process.env.AUTH_LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        if (accessToken) {
          sessionStorage.setItem('access_token', accessToken);
          navigate('/');
        } else {
          setError('Failed to get access token.');
        }        
      } else {
        const data = await response.json();
        setError(`Error ${response.status}: ${data.msg}`);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin} className="mx-auto w-75">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className='mt-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <div className="d-flex justify-content-start mt-2">
          <div className="p-2">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
          <div className="p-2">
            <Link to="/signup" className="mt-6">
              Create an account
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
