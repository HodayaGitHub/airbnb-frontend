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
    document.getElementById('minPrice').value = priceRange.minPrice;
    document.getElementById('maxPrice').value = priceRange.maxPrice;

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
            value={priceRange.minPrice}
            onChange={(ev) => handleInputChange(ev.target)}
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            name="maxPrice"
            type="number"
            id="maxPrice"
            value={priceRange.maxPrice}
            onChange={(ev) => handleInputChange(ev.target)}
          />
        </div>
      </div>

      <Slider
        histogramData={[30, 100, 500, 600, 450, 350, 120, 100, 700, 1200]}
        defaultValue={[0, priceRange.max]}
        ariaLabel={["Minimum price", "Maximum price"]}
        // label="Price"
        minValue={30}
        maxValue={3000}
        step={step}
        // valueDescription={priceRange.minPrice !== undefined && priceRange.maxPrice !== undefined
        //   ? `$${priceRange.minPrice}–$${priceRange.maxPrice}`
        //   : '$0–$600'}
        onChange={(sliderValue) => {
          if (typeof sliderValue === "object") setPriceRange({ minPrice: sliderValue[0], maxPrice: sliderValue[1] });
        }}
      />
    </>
  );
};
