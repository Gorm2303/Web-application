import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(process.env.REACT_APP_AUTH_SIGNUP_API_URL, {
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
          navigate('/subscription');
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
      <h1 className="text-center">Sign Up</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSignUp} className="mx-auto w-75">
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
              Sign Up
            </Button>
          </div>
          <div className="p-2">
            <Link to="/login" className="mt-6">
              Already have an account?
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
