import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftArrow from '../assets/img/svgs/left-arrow.svg'
import rightArrow from '../assets/img/svgs/right-arrow.svg'


export function SimpleSlider({ stay }) {

  const [currentSlide, setCurrentSlide] = useState(0);

  function Arr(props) {
    const { className, style, onClick } = props;

    const handleClick = (event) => {
      event.stopPropagation()
      onClick(event);
    }

    const arrowIcon = props.type === "prev" ? leftArrow : rightArrow;

    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // fontSize: "54px",
          color: "#000",
          cursor: "pointer",
          visibility:
            (props.type === "prev" && currentSlide === 0) ||
            (props.type === "next" && currentSlide === stay.imgUrls.length - 1)
              ? "hidden"
              : "visible",
        }}
        onClick={handleClick}
      >
        <div className='arrow-warpper'><img src={arrowIcon} alt="" /></div>
        {props.children}
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <Arr type="next" />,
    prevArrow: <Arr type="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (index) => setCurrentSlide(index),
  }

  return (
    <div className="simple-slider">
      <Slider className="slider" {...settings}>
        {stay.imgUrls.map((imgUrl, index) => (
           
            <img key={index} className="stay-img" src={imgUrl} alt="" />
          
        ))}
      </Slider>
    </div>
  );
}
