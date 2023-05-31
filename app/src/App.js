import React, { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CatalogPage from "./catalog_pages/CatalogPage";
import UploadPage from "./upload_pages/UploadPage";
import PlayerPage from "./player_pages/PlayerPage";
import SignUpPage from './user_pages/SignUpPage';
import LoginPage from './user_pages/LoginPage';
import SubscriptionPage from './user_pages/SubscriptionPage';
import jwt_decode from 'jwt-decode';

import { Navbar, Container, Nav, Form, Button, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminContext from './AdminContext.js'; 


export default function App() {
  const accessToken = sessionStorage.getItem('access_token');
  const decodedToken = accessToken ? jwt_decode(accessToken) : null;
  const isAdmin = decodedToken && decodedToken.role === 'admin';
  const [isSubscriber, setIsSubscriber] = useState(decodedToken 
    && decodedToken.role === 'subscriber');
  const [isLoggedIn, setIsLoggedIn] = useState(
    // Converts expression to "if access_token exists"
    !!sessionStorage.getItem('access_token') 
  );

  function NavScroll() {
    const handleLogout = () => {
      sessionStorage.removeItem('access_token');
      setIsLoggedIn(false);
    };
    const [searchQuery, setSearchQuery] = useState('');
    const searchInput = useRef(null);
  
    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSearch = () => {
      window.location.href = `/search?q=${searchQuery}`;
    };
  
    const handleSearchKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

    const handleUploadClick = () => {
      sessionStorage.setItem('requestType', 'POST');
    };
    
    return (
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">TV2</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Catalog</Nav.Link>
              {isAdmin && <Nav.Link href="/upload" onClick={handleUploadClick}>Upload</Nav.Link>}
            </Nav>
            {(isSubscriber || isAdmin) && 
            <Form className="d-flex mx-auto" onKeyPress={handleSearchKeyPress} onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                ref={searchInput}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <Button variant="outline-primary" onClick={handleSearch}>
                Search
              </Button>
            </Form>
            }
            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Settings
                  <i className="bi bi-list"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/subscription">
                    Manage subscription
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout} href="/login">
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="outline-primary" className="ms-2" href="/login">
                Login
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <AdminContext.Provider value={isAdmin}>
      <BrowserRouter>
          <div><NavScroll/></div>
          <Routes>
            <Route index element={<CatalogPage key="index" />} />
            {isLoggedIn && <Route path="/search" element={<CatalogPage key={window.location.search} />} />}
            {isAdmin && <Route path='/upload' element={<UploadPage/>} />}
            {isLoggedIn && <Route path="/player" element={<PlayerPage />} />}
            {!isLoggedIn && <Route path="/signup" element={<SignUpPage setIsLoggedIn={setIsLoggedIn}/>} />}
            {!isLoggedIn && <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />}
            {isLoggedIn && <Route path="/subscription" element={<SubscriptionPage isSubscriber={isSubscriber} setIsSubscriber={setIsSubscriber}/>} />}
          </Routes>
      </BrowserRouter>
    </AdminContext.Provider>
  );
}
