import React, { useEffect, useState } from 'react';
import './Popup.css'

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
    <span>
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={handleClose}>&times;</span>
          <p>{metadata.title}</p>
        </div>
      </div>
      
    </span>
  );
}

export default Popup;