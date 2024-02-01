import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export function MyDonut() {
  const data = {
    labels: [
      'Entire Home',
      'Private Room',
      'Shared Room',
      'Hotel',
      'Unique Stays'
    ],
    datasets: [
      {
        label: 'Total products',
        data: [11, 9, 6, 5, 3],
        backgroundColor: [
          '#E97777',
          '#FF9F9F',
          '#FCDDB0',
          '#F9F7C9',
          '#CEE5D0'
        ],
        borderColor: '#ffffff',
        borderWidth: 1
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'left'
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = data.labels[context.dataIndex]
            return `${label}: ${context.parsed.toFixed(0)}`
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    cutout: '0%',
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    }
  }

  return (
    <section className='myDonut'>
      <h3>Stay types</h3>
      <div className='donut-container'>
        <Doughnut className='donut' data={data} options={options} />
      </div>
    </section>
  )
}
