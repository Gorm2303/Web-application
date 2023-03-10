import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyDatePicker(props) {
  return (
    <DatePicker
      id="date" 
      selected={props.selectedDate}
      onChange={props.handleDateChange}
      dateFormat="dd/MM/yyyy"
      placeholderText="Select a date"
    />
  );
}