import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const SubscriptionPage = () => {
  const [subscriptionTypes, setSubscriptionTypes] = useState([]);
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const accessToken = sessionStorage.getItem('access_token');
  const decodedToken = accessToken ? jwt_decode(accessToken) : null;
  const userId = decodedToken ? decodedToken.sub : null;

  useEffect(() => {
    const fetchSubscriptionTypes = async () => {
      try {
        const response = await fetch(process.env.SUBSCRIPTION_TYPES_API_URL);
        const data = await response.json();
        setSubscriptionTypes(data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch subscription types.');
      }
    };
    fetchSubscriptionTypes();
  }, []);

  const handleSubscriptionTypeChange = (event) => {
    setSelectedSubscriptionType(event.target.value);
  };

  const handleSubscribe = async () => {
    setError('');

    try {
      const response = await fetch(process.env.SUBSCRIBE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, subscription_type_id: selectedSubscriptionType }),
      });

      if (response.ok) {
        navigate('/');
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
      <h1 className="text-center">Subscribe</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="row">
        {subscriptionTypes.map((subscriptionType) => (
          <div className="col-md-4 mb-3" key={subscriptionType.id}>
            <Card>
              <Card.Body>
                <Card.Title>{subscriptionType.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">${subscriptionType.price}/month</Card.Subtitle>
                <Card.Text>{subscriptionType.description}</Card.Text>
                <Button variant="outline-primary" onClick={handleSubscriptionTypeChange} value={subscriptionType.id} block>{selectedSubscriptionType === subscriptionType.id ? 'Selected' : 'Select'}</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-start mt-2">
        <div className="p-2">
          <Button variant="primary" onClick={handleSubscribe} disabled={!selectedSubscriptionType}>Subscribe</Button>
        </div>
        <div className="p-2">
          <Button variant="secondary" onClick={() => navigate('/')}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
