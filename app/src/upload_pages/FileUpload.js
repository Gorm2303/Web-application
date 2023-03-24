import React, { useState } from 'react';
import axios from 'axios';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import './FileUpload.css'


const FileUpload = (props) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setUploading(true);

      const formData = new FormData();
      console.log(file.name);
      formData.append('file', file);

      const response = await axios.post(process.env.REACT_APP_UPLOADER_URL + props.api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFileUrl(response.data.url);
      console.log(response.data.url);
      props.onUpload(response.data.url);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const path = {
    chunkSize: 1024*1024,
    // set chunk size for enable the chunk upload
    saveUrl: process.env.REACT_APP_UPLOADER_URL + props.api,
    autoUpload: true,
  };
  console.log(path);

  const onUploadSuccess = (response) => {
    console.log(response);
  }

  return (
    <div>
      <div className="chunkupload">
      <UploaderComponent
      allowedExtensions=".mp4, .avi, .wmv"
      asyncSettings={path}
      success={onUploadSuccess}
      name="chunkFile"
    />
    </div>
    {/*   <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        Upload
      </button>
      {fileUrl && <p>File URL: {fileUrl}</p>} */}
    </div>
  );
};

export default FileUpload;
