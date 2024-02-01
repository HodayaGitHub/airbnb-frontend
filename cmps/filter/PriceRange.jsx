import React, { useState } from 'react';
import Slider from "@kiwicom/orbit-components/lib/Slider";
import calculateCountOf from "@kiwicom/orbit-components/lib/Slider/utils/calculateCountOf";

export function PriceRange({ filterBy, stays, handlePriceChange }) {
  const staysPrice = stays.map((stay) => stay.price);

  // console.log(availableFlights)
  const [priceRange, setPriceRange] = useState({ ...filterBy.price })
  const step = 50;

  const [selectedStays, totalStays] = calculateCountOf(
    staysPrice,
    [priceRange.min / step, priceRange.max / step],
    0
  )

  const sliderStyle = {
    background: 'red',
  };

  // console.log(priceRange)


  function handleInputChange(target) {
    const field = target.name
    const value = +target.value
    setPriceRange((prevRange) => ({ ...prevRange, [field]: value }))
    handlePriceChange(field, value)

  }


  return (
    <>
      <div>
        <div>
          <label htmlFor="minPrice">Min Price:</label>
          <input
            name="minPrice"
            type="number"
            id="minPrice"
            value={priceRange.min}
            onChange={(ev) => handleInputChange(ev.target)}
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            name="maxPrice"
            type="number"
            id="maxPrice"
            value={priceRange.max}
            onChange={(ev) => handleInputChange(ev.target)}
          />
        </div>
      </div>

      {/* <Slider
        histogramData={staysPrice}
        histogramDescription={`${selectedStays} of ${totalStays} flights`}
        defaultValue={[50, 250]}
        ariaLabel={["Minimum price", "Maximum price"]}
        label="Price"
        minValue={0}
        step={step}
        maxValue={1000}
        valueDescription={`$${priceRange[0]}–$${priceRange[1]}`}
        onChange={(sliderValue) => {
          if (typeof sliderValue === "object") setPriceRange(sliderValue);
        }}
      /> */}
    </>

  );
};
