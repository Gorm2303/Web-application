import React, { useState } from 'react';
import axios from 'axios';


export default function UploadPicker(props) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  function onChange(event) {
    setFile(event.target.files[0]);
  }

  async function uploadFile() {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`http://localhost:80/api/v1/${props.api}`, formData);
      setUploadedUrl(response.data.url);
      console.log(response);
      props.onUpload(response.data.url);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div>Example of input file: {props.example_input_file}</div>
        <input type="file" onChange={onChange} id="upload-picker" accept={props.accept} />
 
      {file &&
        <div>
          <button onClick={uploadFile} disabled={uploading} variant="secondary">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      }

      {uploadedUrl &&
        <div>
          {props.accept === "image/*" ?  
          <img src={uploadedUrl} alt="Uploaded poster" /> :
          <video src={uploadedUrl} alt="Uploaded video"/>
          }
        </div>
      }
    </div>
  );
}
