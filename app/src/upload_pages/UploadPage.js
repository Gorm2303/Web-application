import './UploadPage.css';
import React, { useState, useEffect } from 'react';
import DatePicker from './Datepicker';
import GenrePicker from './GenrePicker';
import axios from 'axios';
import UploadPicker from './UploadPicker';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Form( ) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState([]);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');
  const [video, setVideo] = useState('');
  const accessToken = sessionStorage.getItem('access_token');
  const [requestType, setRequestType] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();


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

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this video?');
    if (!confirmDelete) {
      return;
    }
      try {
        const response = await axios.delete(`${process.env.REACT_APP_UPLOADER_VIDEOMETADATA_URL}/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data.success === true) {
          navigate('/');
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(video));
    const data = {
      title,
      genre,
      date,
      description,
      poster,
      video,
    };

    try {
      let response;
      if (requestType === 'POST') {
        console.log('Data send: ' + JSON.stringify(data));
        response = await axios.post(process.env.REACT_APP_UPLOADER_VIDEOMETADATA_URL, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else if (requestType === 'PUT') {
        data.id = id;
        console.log('Data send: ' + JSON.stringify(data));
        response = await axios.put(process.env.REACT_APP_UPLOADER_VIDEOMETADATA_URL, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      if (response.data.success === true) {
        navigate('/');
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
      setId(metadata._id)
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
          <Button onClick={handleDelete} variant="danger">Delete</Button>
        </div>
      </form>
    </div>
  );
}
