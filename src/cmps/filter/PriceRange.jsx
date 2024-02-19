import React, { useState, useEffect } from 'react';
import { stayService } from '../../services/stay.service';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';




export function PriceRange({ filterBy, stays, handlePriceChange }) {
  const initialPriceRange = { ...filterBy.price };
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [staysPrice, setStaysPrice] = useState([]);
  const [currentSliderValues, setCurrentSliderValues] = useState([priceRange.minPrice, priceRange.maxPrice]);
  const [histogramData, setHistogramData] = useState([]);
  const [loading, setLoading] = useState(true);

  const step = 70;


  useEffect(() => {
    const fetchStaysPrices = async () => {
      try {
        const prices = await stayService.getStaysPrices();
        setStaysPrice(prices);
        setLoading(false); 
        console.log('Stays data:', staysPrice);
      } catch (error) {
        setLoading(false); 
        console.error('Error fetching stays prices:', error);
      }
    };

    fetchStaysPrices();
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log('Stays data:', staysPrice);
      const updatedHistogram = stayService.countItemsInRanges(staysPrice, step);
      setHistogramData(updatedHistogram);
      console.log('updatedHistogram', updatedHistogram);
    }
  }, [priceRange, stays, staysPrice, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }


  function handleInputChange(target) {
    const field = target.name;
    let value = +target.value;

    if (value < 0) {
      value = 0;
    }

    setPriceRange((prevRange) => ({ ...prevRange, [field]: value }));
    handlePriceChange(field, value);
  }

  function handleSliderChange(newValues) {
    setCurrentSliderValues(newValues);
    setPriceRange({ minPrice: newValues[0], maxPrice: newValues[1] });
    handlePriceChange('minPrice', newValues[0]);
    handlePriceChange('maxPrice', newValues[1]);
  }


  return (
    <div className='place-range-container'>
      <h4 className='price-range-title'> Price range</h4>

      <div className='histogram-container'>
        {histogramData.map((value, index) => {
          const adjustedHeight = value.count + (value.count * 0.7);
          const isGrayedOut = value.price < currentSliderValues[0] || value.price > currentSliderValues[1];

          return (
            <div
              key={index}
              className={`histogram-bar ${isGrayedOut ? 'grayed-out' : ''}`}
              style={{ height: `${adjustedHeight}%` }}>
            </div>
          );
        })}
      </div>


      <Slider
        range
        min={0}
        max={2500}
        step={step}
        defaultValue={[priceRange.minPrice, priceRange.maxPrice]}
        onChange={handleSliderChange}
        trackStyle={[{ background: 'linear-gradient(79deg, #000000, #333333)' }]}
        handleStyle={[
          { borderColor: 'black' },
          { borderColor: 'black' },
        ]}
        dotStyle={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)' }}

      />


      <div className='min-max-price-container'>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" }, width: '100%', display: 'flex', justifyContent: "space-around"
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="minPrice"
            name="minPrice"
            label="Minimum"
            type="number"
            value={priceRange.minPrice}
            onChange={(ev) => handleInputChange(ev.target)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            name="maxPrice"
            id="maxPrice"
            label="Maximum"
            type="number"
            value={priceRange.maxPrice}
            onChange={(ev) => handleInputChange(ev.target)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </div>
    </div>
  );
}



function calculateCountOf(data, range, step) {
  // Implement your logic to calculate the count of selected data points here
  return [0, 0];
}

