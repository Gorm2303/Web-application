import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


function VideoUpload(props) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  function onDrop(files) {
    setFile(files[0]);
  }

  async function uploadFile() {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/v1/video', formData);
      setUploadedUrl(response.data.url);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <h1>Video Upload</h1>

      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div className="" {...getRootProps()}>
            <input {...getInputProps()} />
 
            {file ?
              <p><strong>Selected file:</strong> {file.name}</p> :
              <Button variant="outline-secondary" >Choose file</Button>
            }
          </div>
        )}
      </Dropzone>


      {file &&
        <div>
          <Button onClick={uploadFile} disabled={uploading} variant="secondary">
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      }

      {uploadedUrl &&
        <div>
          <video src={uploadedUrl} controls />
        </div>
      }
    </div>
  );
}

export default function App() {
    return (
        <div>
            <VideoUpload/>
        </div>
    )
}