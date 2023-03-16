import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to={{ pathname: '/player', search: `?url=${metadata.video}` }}>
            <img width={400} src={metadata.poster} alt={""}/>
          </Link>
          <div>
            <table>
              <tbody>
                <tr className='smallInfo'>
                  <td className='singleText'><b>Release:</b> {metadata.release_date}</td>
                  <td className='singleText'><b>Genre:</b> bla bla bla bla lba{}</td>
                  <td className='description'><b>Description:</b> {metadata.overview}</td>
                </tr>
                <tr className='smallInfo'>
                  <td className='singleText'><b>Length:</b> 21{}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </span>
  );
}

export default Popup;