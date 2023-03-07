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
          <h1>{metadata.title}</h1>
          <img width={400} src={'https://image.tmdb.org/t/p/original' + metadata.poster_path} alt={""}/>
          <div>
            <table>
              <tr className='smallInfo'>
                <td className='singleText'>Release</td>
                <td className='singleText'>Length</td>
                <td className='description'>description</td>
              </tr>
              <tr className='smallInfo'>
                <td className='singleText'>Genre</td>
                <td className='singleText'>Release</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      
    </span>
  );
}

export default Popup;