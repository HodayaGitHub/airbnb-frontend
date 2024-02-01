import React, { useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";

export default function ReactdatesDatepicker() {
  const [date, setDate] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  function onDateChange(date) {
    setDate(date);
  }

  function onFocusChange({ focused }) {
    setIsFocused(focused);
  }

  return (
    <SingleDatePicker
      id="date_input"
      date={date}
      focused={isFocused}
      onDateChange={onDateChange}
      onFocusChange={onFocusChange}
    />
  );
}