import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export function ControlledCarousel({stay ,isHover}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };



  return (
    <Carousel className='carousel' activeIndex={index} onSelect={handleSelect} interval={null} touch={true} indicators={true} controls={isHover}> 
     {stay.imgUrls.map((imgUrl, index) => {
       return(     
        <Carousel.Item key={index}>
          <img className="stay-img" src={imgUrl} alt={`Carousel Image ${index + 1}`}></img>
        </Carousel.Item>
      )
     })}
    
  </Carousel>
  )
}