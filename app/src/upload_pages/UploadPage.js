import UploadPicker from './UploadPicker.js'
import './UploadPage.css';
import React, { useState } from 'react';
import DatePicker from './Datepicker';

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

  const handlePosterChange = (event) => {
    setPoster(event.target.value);
  } 

  const handleVideoChange = (event) => {
    setVideo(event.target.value);
  } 

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label htmlFor="genre">Genre</label>
        <select multiple id="genre" value={genre} onChange={handleGenreChange}>
          {genreOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div>
          <label htmlFor="date">Date</label>
          <DatePicker selectedDate={date} handleDateChange={handleDateChange} />
          
          <label htmlFor="poster">Upload Poster</label>
          <UploadPicker onChange={handlePosterChange} description={'Poster Upload'} example_input_file={'.PNG'}/>
          <label htmlFor="video">Upload Video</label>
          <UploadPicker onChange={handleVideoChange} description={'Video Upload'} example_input_file={'.MP4'}/>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={handleDescriptionChange}></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
