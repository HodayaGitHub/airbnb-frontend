import React, { useState, useEffect } from 'react';
import { stayService } from '../../services/stay.service';
import Slider from "@kiwicom/orbit-components/lib/Slider";

export function PriceRange({ filterBy, stays, handlePriceChange }) {
  // const staysPricesss = stays.map((stay) => stay.price);
  const [priceRange, setPriceRange] = useState({ ...filterBy.price });
  const [staysPrice, setStaysPrice] = useState([]);

  const step = 50;
  const result = calculateHistogram(staysPrice, 50);

  useEffect(() => {
    document.getElementById('minPrice').value = priceRange.min;
    document.getElementById('maxPrice').value = priceRange.max;

  }, [priceRange]);

  useEffect(() => {
    const fetchStaysPrices = async () => {
      try {
        const prices = await stayService.getStaysPrices();
        setStaysPrice(prices);
      } catch (error) {
        console.error('Error fetching stays prices:', error);
      }
    };

    fetchStaysPrices();
    console.log(result)
  }, []);

  function handleInputChange(target) {
    const field = target.name;
    const value = +target.value;
    setPriceRange((prevRange) => ({ ...prevRange, [field]: value }));
    handlePriceChange(field, value);
  }


  function calculateHistogram(data, jumpSize) {
    const histogramData = {};

    data.forEach((value) => {
      const rangeStart = Math.floor(value / jumpSize) * jumpSize;
      const rangeEnd = rangeStart + jumpSize;

      const rangeKey = `${rangeStart}-${rangeEnd}`;

      if (histogramData[rangeKey] === undefined) {
        histogramData[rangeKey] = 1;
      } else {
        histogramData[rangeKey]++;
      }
    });

    const histogramArray = Object.entries(histogramData).map(([range, count]) => ({
      range: range,
      count: count,
    }));

    histogramArray.sort((a, b) => {
      const rangeA = a.range.split('-')[0];
      const rangeB = b.range.split('-')[0];
      return parseInt(rangeA) - parseInt(rangeB);
    });

    return histogramArray;
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

      <Slider
        histogramData={result}
        defaultValue={[0, priceRange.max]}
        ariaLabel={["Minimum price", "Maximum price"]}
        label="Price"
        minValue={30}
        maxValue={3000}
        step={step}
        valueDescription={priceRange.min !== undefined && priceRange.max !== undefined
          ? `$${priceRange.min}–$${priceRange.max}`
          : '$0–$600'}
        onChange={(sliderValue) => {
          if (typeof sliderValue === "object") setPriceRange({ min: sliderValue[0], max: sliderValue[1] });
        }}
      />
    </>
  );
};
