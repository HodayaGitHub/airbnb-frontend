import React, { useState, useEffect } from 'react';
import { stayService } from '../../services/stay.service';
import Slider from "@kiwicom/orbit-components/lib/Slider";

export function PriceRange({ filterBy, stays, handlePriceChange }) {
  const initialPriceRange = { ...filterBy.price };
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [staysPrice, setStaysPrice] = useState([]);
  const availableStays = [5, 29, 28, 7, 13, 7, 16, 12, 8, 39, 13, 7, 20, 38, 15, 18, 28, 14, 23, 24, 10];
  const step = 50;
  const [selectedStays, totalStays] = calculateCountOf(availableStays, [priceRange.minPrice / step, priceRange.maxPrice / step], 0);


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
  }, []);

  function handleInputChange(target) {
    const field = target.name;
    const value = +target.value;
    setPriceRange((prevRange) => ({ ...prevRange, [field]: value }));
    handlePriceChange(field, value);
  }

  function handleSliderChange(newValues) {
    const [minPrice, maxPrice] = newValues;
    setPriceRange({ minPrice, maxPrice });
    document.getElementById('minPrice').value = minPrice;
    document.getElementById('maxPrice').value = maxPrice;
    handlePriceChange('minPrice', minPrice);
    handlePriceChange('maxPrice', maxPrice);
  }


  return (
    <div className="place-range-container">
      <h3> Price range</h3>
      <div className='min-max-price-container'>
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
        // label={`Price Range (${selectedStays} of ${totalStays} stays)`}
        // label={`$${priceRange.minPrice}–$${priceRange.maxPrice}`}
        defaultValue={[priceRange.minPrice, priceRange.maxPrice]}
        minValue={0}
        maxValue={3500}
        step={50}
        onChange={handleSliderChange}
        style={{ dispaly: 'flex', width: '80%', maxWidth: '100%', margin: '0 auto' }}
        className="custom-slider"
        histogramData={availableStays}
      // ariaLabel={["Minimum price", "Maximum price"]}
      // valueDescription={`$${priceRange.minPrice}–$${priceRange.maxPrice}`}
      />
    </div>
  );
}

function calculateCountOf(data, range, step) {
  // Implement your logic to calculate the count of selected data points here
  return [0, 0];
}
