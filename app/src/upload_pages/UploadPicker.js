import React, { useState } from 'react';
import axios from 'axios';


export default function UploadPicker(props) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  function onChange(event) {
    setFile(event.target.files[0]);
  }

  async function uploadFile() {
    try {
      const chunkSize = 1024 * 1024; // 1MB chunks
      const chunks = Math.ceil(file.size / chunkSize);
      let uploadedChunks = 0;
      let response;

      for (let i = 0; i < chunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(file.size, start + chunkSize);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('chunks', chunks);
        formData.append('chunkIndex', i);
        formData.append('filename', file.name)
        console.log('Sending data to: ' + process.env.REACT_APP_API_ENDPOINT + props.api);
        console.log('filename: ', file.name, 'chunk: ', chunk, ' chunks: ', chunks, 'chunkIndex: ', i);

        response = await axios.post(process.env.REACT_APP_UPLOADER_URL + props.api, formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(((1 + uploadedChunks) / chunks) * 100);
              setProgress(percentCompleted)
            
          },
        });
        uploadedChunks++;
      }
      console.log(response);

      setUploadedUrl(response.data.url)
      props.onUpload(uploadedUrl);
    } catch (error) {
      console.error(error);
    } 
  }

  return (
    <div>
      <div>Example of input file: {props.example_input_file}</div>
      <input type='file' onChange={onChange} id='upload-picker' accept={props.accept} />

      <div>
        <button type='button' onClick={uploadFile} disabled={!file || (file && progress > 0)}>
          {progress > 0 && progress < 100 ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {progress > 0 && <div>{progress}% uploaded</div>}

      {uploadedUrl &&
        <div>
          <p>File URL: {uploadedUrl}</p>
          {props.accept === 'image/*' ?  
          <img src={uploadedUrl} alt='Uploaded poster' /> :
          <video src={uploadedUrl} alt='Uploaded clip' />}
        </div>
      }
    </div>
  );
}
