import React, { useState, useEffect } from 'react';
import { stayService } from '../../services/stay.service';
import Slider from "@kiwicom/orbit-components/lib/Slider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import getTokens from "@kiwicom/orbit-components/lib/getTokens";
import OrbitProvider from "@kiwicom/orbit-components/lib/OrbitProvider";
import { defaultTheme } from "@kiwicom/orbit-design-tokens";
import styled, { ThemeProvider } from 'styled-components';


export function PriceRange2({ filterBy, stays, handlePriceChange }) {
  const initialPriceRange = { ...filterBy.price };
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [staysPrice, setStaysPrice] = useState([]);
  const availableStays = [5, 29, 28, 7, 13, 7, 16, 12, 8, 39, 13, 7, 20, 38, 15, 18, 28, 14, 23, 24, 10, 24, 50, 20];
  const step = 150;
  const numberOfSteps = Math.round((3500 - 0) / step);

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
    let value = +target.value;

    if (value < 0) {
      value = 0;
    }

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




  const customTokens = getTokens({
    palette: {
      product: {
        light: "green",
        lightHover: "green",
        lightActive: "green",
        normal: "green",
        normalHover: "green",
        normalActive: "green",
        dark: "green",
        darker: "green",
        darkHover: "green",
        darkActive: "green",
        backgroundColor: 'green'
      },
    },
  })


  return (
    <div className='place-range-container'>
      <h4 className='price-range-title'> Price range</h4>

      <Slider
        useId={React.useId}
        theme={{
          rtl: true,
          transitions: true,
          lockScrolling: true,
          lockScrollingBarGap: true,
          orbit: customTokens
        }}
        histogramData={availableStays}
        defaultValue={[priceRange.minPrice, priceRange.maxPrice]}
        minValue={0}
        maxValue={3500 - (3500 % step)}
        step={150}
        onChange={handleSliderChange}
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
