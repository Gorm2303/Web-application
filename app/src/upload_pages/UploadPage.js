import './UploadPage.css';
import React, { useState, useEffect } from 'react';
import DatePicker from './Datepicker';
import GenrePicker from './GenrePicker';
import axios from 'axios';
import UploadPicker from './UploadPicker';

export default function Form( ) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState([]);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');
  const [video, setVideo] = useState('');
  const accessToken = sessionStorage.getItem('access_token');
  const [requestType, setRequestType] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(Array.from(event.target.selectedOptions, (option) => option.value));
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePosterUpload = (fileUrl) => {
    setPoster(fileUrl);
    console.log('Poster is set: ' + fileUrl);
  };

  const handleVideoUpload = (fileUrl) => {
    setVideo(fileUrl);
    console.log('Video is set: ' + fileUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title,
      genre,
      date,
      description,
      poster,
      video,
    };
    console.log('Data send: ' + JSON.stringify(data));

    try {
      let response;
      if (requestType === 'POST') {
        response = await axios.post(process.env.REACT_APP_UPLOADER_VIDEOMETADATA_URL, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else if (requestType === 'PUT') {
        response = await axios.put(process.env.REACT_APP_UPLOADER_VIDEOMETADATA_URL, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const genreOptions = [
    { label: 'Action', value: 'action' },
    { label: 'Comedy', value: 'comedy' },
    { label: 'Drama', value: 'drama' },
    { label: 'Horror', value: 'horror' },
    { label: 'Science Fiction', value: 'science-fiction' },
    { label: 'Thriller', value: 'thriller' },
  ];

  useEffect(() => {
    const storedRequestType = sessionStorage.getItem('requestType');
    setRequestType(storedRequestType);
    const metadata = JSON.parse(sessionStorage.getItem('metadata'));
    
    if (metadata && storedRequestType === 'PUT') {
      setTitle(metadata.title);
      setGenre(metadata.genre);
      setDate(new Date(metadata.date));
      setDescription(metadata.description);
      setPoster(metadata.poster);
      setVideo(metadata.video);
    } else {
      // Set default values if metadata is not found
      setTitle('');
      setGenre([]);
      setDate(new Date());
      setDescription('');
      setPoster('');
      setVideo('');
    }
  }, [requestType]);

  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
        </div>

        <div className='genre-picker'>
          <label htmlFor="genre">Genre</label>
          <GenrePicker handleGenreChange={handleGenreChange} value={genre} genreOptions={genreOptions}/>
        </div> 

        <div>
          <label htmlFor="date">Date</label>
          <DatePicker selectedDate={date} handleDateChange={handleDateChange} />
        </div>
        
        <div>
          <label htmlFor="poster">Poster</label>
          <UploadPicker onUpload={handlePosterUpload} api={'poster'} description={'Poster Upload'} accept={'image/*'} example_input_file={'.PNG'}/>
        </div>

        <div>
          <label htmlFor="video">Video</label>
          <UploadPicker onUpload={handleVideoUpload} api={'video'} description={'Video Upload'} accept={'video/*'} example_input_file={'.MP4'}/>
        </div>
        
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange}></textarea>
        </div>
        
        <div className='center'>
          <button className='submit' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
