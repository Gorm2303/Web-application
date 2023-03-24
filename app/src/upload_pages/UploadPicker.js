import React, { useState } from 'react';
import axios from 'axios';


export default function UploadPicker(props) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  function onChange(event) {
    setFile(event.target.files[0]);
  }

  async function uploadFile() {
    try {
      setUploading(true);
      const chunkSize = 1024 * 1024; // 1MB chunks
      const chunks = Math.ceil(file.size / chunkSize);
      let uploadedChunks = 0;
      let response;
      const formData = new FormData();

      if (file.size > chunkSize) {
        for (let i = 0; i < chunks; i++) {
          const start = i * chunkSize;
          const end = Math.min(file.size, start + chunkSize);
          const chunk = file.slice(start, end);
          formData.append('chunk', chunk);
          formData.append('chunks', chunks);
          formData.append('chunkIndex', i);

          response = await axios.post(process.env.REACT_APP_UPLOADER_URL + props.api, formData, {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((uploadedChunks / chunks) * 100);
              setProgress(percentCompleted);
            },
          });
          uploadedChunks++;
          console.log(response);
        }
      } else {
        formData.append('file', file);
        response = await axios.post(process.env.REACT_APP_UPLOADER_URL + props.api, formData);
      }
      setUploadedUrl(response.data.url)
      props.onUpload(uploadedUrl);
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

      <div>
        <button onClick={uploadFile} disabled={!file || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {progress > 0 && <div>{progress}% uploaded</div>}

      {uploadedUrl &&
        <div>
          {props.accept === "image/*" ?  
          <img src={uploadedUrl} alt="Uploaded poster" /> : "Cannot show file"}
        </div>
      }
    </div>
  );
}
