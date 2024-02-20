import { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { FavoriteIcon } from './FavoriteIcon.jsx'

export function ControlledCarousel({ stay, isHover }) {
  const [index, setIndex] = useState(0)
  const [sliderIndex, setSliderIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
    e.stopPropagation()
  }

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % stay.imgUrls.length)
  }

  const prevSlide = () => {
    setIndex(
      (prevIndex) => (prevIndex - 1 + stay.imgUrls.length) % stay.imgUrls.length
    )
  }

  return (
    <Carousel
      className='carousel'
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      touch={true}
      indicators={true}
      controls={isHover}
      pause={false}
    >
      {stay.imgUrls.map((imgUrl, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              className='stay-img'
              src={imgUrl}
              alt={`Carousel Image ${index + 1}`}
             
            ></img>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}
