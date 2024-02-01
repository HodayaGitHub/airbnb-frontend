import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MainHeader } from '../../cmps/MainHeader.jsx';
import { labels } from '../../data/labels-new-stay.js';
import * as labelsSvg from '../../services/labels.icons.new.stay.jsx';
import * as React from 'react';

export function Page2({ goToNextPage, updateStay, stay }) {
  const [labelsToEdit, setLabelsToEdit] = useState(stay.labels)
  const navigate = useNavigate()

  function handleLablesChange(isChecked, labelName) {
    setLabelsToEdit((prevLabels) => {
      let updatedLabels

      if (isChecked) {
        updatedLabels = [...prevLabels, labelName];
        console.log('labelsToEdit', updatedLabels);
      } else {
        updatedLabels = prevLabels.filter((name) => name !== labelName);
        console.log('labelsToEdit', updatedLabels);
      }
      const newStay = {
        ...stay,
        labels: updatedLabels,
      };

      updateStay(newStay);

      return updatedLabels; 
    });
  }

  return (
    <section className='step2 steps-layout'>
      <MainHeader />

      <div className='container'>
        <h1>Which of these best describes your place?</h1>
        <div className='checkbox-list'>
          {labels.map((label, index) => (
            <div className='checkbox-item' key={index} onClick={() => handleLablesChange(true, label.title)}>
              {/* Remove the input element */}
              <span className='checkbox-title'>{label.title}</span>
              {labelsSvg[label.svg] ? React.createElement(labelsSvg[label.svg]) : ''}
            </div>
          ))}
        </div>
        <button className='add-stay-next-page' onClick={goToNextPage}>
          Next
        </button>
      </div>
    </section>
  );
}
