import './UploadPage.css';
import React, { useState } from 'react';
import DatePicker from './Datepicker';
import GenrePicker from './GenrePicker';
import axios from 'axios';
import UploadPicker from './UploadPicker';

export default function Form() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState([]);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState(''); 
  const [video, setVideo] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleGenreChange = (event) => {
    setGenre(Array.from(event.target.selectedOptions, (option) => option.value));
  }

  const handleDateChange = (date) => {
    setDate(date);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  function handlePosterUpload(url) {
    setPoster(url);
  } 

  function handleVideoUpload(url) {
    setVideo(url);
  } 

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = {
      title,
      genre,
      date,
      description,
      poster,
      video
    };
    console.log('Data send: ' + JSON.stringify(data));
    console.log(`${process.env.REACT_APP_UPLOADER_VIDEOMETADATA_URL}`);

  
    try {
      const response = await axios.post(process.env.REACT_APP_UPLOADER_VIDEOMETADATA_URL, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response received: ' + JSON.stringify(response.data));
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
          <UploadPicker onUpload={handlePosterUpload} api={'poster'} description={'Poster Upload'} accept={['image/*']} example_input_file={'.PNG'}/>
        </div>

        <div>
          <label htmlFor="video">Video</label>
          <UploadPicker onUpload={handleVideoUpload} api={'video'} description={'Video Upload'} accept={['video/*']} example_input_file={'.MP4'}/>
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
