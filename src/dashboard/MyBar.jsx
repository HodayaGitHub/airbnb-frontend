import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  layout: {
    padding: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
    },
  },
  barThickness: 40,
}




const labels = ['January', 'February', 'March', 'April', 'May']

export const data = {
  labels,
  datasets: [
    {
      label: 'Data',
      data:[3000, 2000, 4560 ,8920, 7500],
      backgroundColor: '#FF0060',
    }
  ],
};

export function MyBar() {
  return(
    <section className='myBar' style={{maxWidth:'60vw'}}>
  <h3>Revenue / month</h3>
  <div className='bar-container'>
   <Bar options={options} data={data} />
  </div>
  </section> 
  )
}
