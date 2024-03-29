import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

jest.mock('jwt-decode', () => () => ({ role: 'admin' }));

describe('<App />', () => {
  it('logs out correctly', () => {
    sessionStorage.setItem('access_token', 'test_token');
    
    const { getByText } = render(<App />);
    
    fireEvent.click(getByText('Settings'));
    fireEvent.click(getByText('Log out'));
    
    expect(sessionStorage.getItem('access_token')).toBeNull();
  });
});
