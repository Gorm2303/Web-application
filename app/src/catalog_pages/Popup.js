import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Table, Badge } from 'react-bootstrap';


function Popup({active, metadata, onClose}) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(active);
  }, [active]);

  function handleClose() {
    setShowPopup(false);
    onClose();
  }

return (
  showPopup &&
  <Modal show={showPopup} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{metadata.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Link to={{ pathname: '/player', search: `?url=${metadata.video}` }}>
        <img className="img-fluid" src={metadata.poster} alt={""} />
      </Link>
      <div className="mt-3">
        <Table>
          <tbody>
            <tr>
              <td><b>Release:</b></td>
              <td>{metadata.date}</td>
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