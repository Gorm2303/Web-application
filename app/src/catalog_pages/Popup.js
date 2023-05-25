import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button, Table, Badge } from 'react-bootstrap';
import AdminContext from '../AdminContext.js';

function Popup({active, metadata, onClose}) {
  const [showPopup, setShowPopup] = useState(false);
  const [imageError, setImageError] = useState(false);
  const errorImage = require('../noImageAvailable.jpg');
  const isAdmin = useContext(AdminContext); 
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageError(true);
  }

  useEffect(() => {
    setShowPopup(active);
  }, [active]);

  function handleClose() {
    setShowPopup(false);
    setImageError(false);
    onClose();
  }

  const handleEditMetadata = () => {
    sessionStorage.setItem('requestType', 'PUT');
    sessionStorage.setItem('metadata', JSON.stringify(metadata));
    navigate('/upload');
  };  

return (
  showPopup &&
  <Modal show={showPopup} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{metadata.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {isAdmin && <Button onClick={handleEditMetadata}>Edit Metadata</Button>}
      <Link to={{ pathname: '/player', search: `?url=${metadata.video}` }}>
        {imageError ? (
          <img 
          src={errorImage} 
          alt="Fallback poster" 
          />
        ) : (
          <img 
          className="img-fluid" 
          src={metadata.poster} 
          alt={""} 
          onError={handleImageError} 
          />
        )}
      </Link>
      <div className="mt-3">
        <Table>
          <tbody>
            <tr>
              <td><b>Release:</b></td>
              <td>{metadata.date.slice(0, metadata.date.indexOf('T'))}</td>
            </tr>
            <tr>
              <td><b>Genre:</b></td>
              <td>
                {metadata.genre.map((genre, index) => (
                  <Badge key={index} bg="primary" className="me-1">{genre}</Badge>
                ))}
              </td>
            </tr>
            <tr>
              <td><b>Length:</b></td>
              <td>??</td>
            </tr>
            <tr>
              <td><b>Description:</b></td>
              <td>{metadata.description}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);


}

export default Popup;