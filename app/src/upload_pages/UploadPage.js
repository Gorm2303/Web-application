import UploadPicker from './UploadPicker.js'
import './UploadPage.css';
import React, { useState } from 'react';
import DatePicker from './DatePicker';
import GenrePicker from './GenrePicker.js';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      title,
      genre,
      date,
      description,
      poster,
      video,
    });
  }

  const genreOptions = [
    { label: 'Action', value: 'action' },
    { label: 'Comedy', value: 'comedy' },
    { label: 'Drama', value: 'drama' },
    { label: 'Horror', value: 'horror' },
    { label: 'Science Fiction', value: 'science-fiction' },
    { label: 'Thriller', value: 'thriller' },
  ];

  function handlePosterChange(url) {
    setPoster(url);
  } 

  function handleVideoChange(url) {
    setVideo(url);
  } 

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
          <label htmlFor="poster">Upload Poster</label>
          <UploadPicker onUpload={handlePosterChange} description={'Poster Upload'} accept={"image/*"} example_input_file={'.PNG'}/>
        </div>

        <div>
          <label htmlFor="video">Upload Video</label>
          <UploadPicker onUpload={handleVideoChange} description={'Video Upload'} accept={"video/*"} example_input_file={'.MP4'}/>
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
