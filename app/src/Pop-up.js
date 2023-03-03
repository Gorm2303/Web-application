import React, { useState } from 'react';
import './Pop-up.css'

function Popup(props) {
  const [isOpen, setIsOpen] = useState(false);

  function openPopup() {
    setIsOpen(true);
  }

  function closePopup() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openPopup}>Open Pop-up</button>

      {isOpen &&
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>&times;</span>
            <p>Display video metadata here.</p>
          </div>
        </div>
      }
    </div>
  );
}

export default Popup;