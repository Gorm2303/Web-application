import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CatalogPage from "./catalog_pages/CatalogPage";
import UploadPage from "./upload_pages/UploadPage";
import PlayerPage from "./player_pages/PlayerPage";


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function NavScrollExample() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">TV2</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Catalog</Nav.Link>
            <Nav.Link href="upload">Upload</Nav.Link>
            <Nav.Link href="player">Player</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default function App() {
  return (
      <BrowserRouter>
          <div><NavScrollExample/></div>
          <Routes>
            <Route index element={<CatalogPage/>}/>
            <Route path='/upload' element={<UploadPage/>}/>
            <Route path='/player' element={<PlayerPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}
