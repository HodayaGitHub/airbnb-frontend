import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range'
import { stayService } from '../../services/stay.service'

import { useState } from 'react'

export function DateSelect({
  onSetField,
  checkIn,
  checkOut,
  monthsToShow = 2
}) {
  checkIn = checkIn || new Date()
  checkOut = checkOut || new Date()

  const [range, setRange] = useState([
    {
      startDate: checkIn,
      endDate: checkOut,
      key: 'selection'
    }
  ])

  function formatDate(date) {
    const options = { day: 'numeric', month: 'short' }
    return date.toLocaleDateString('en-US', options)
  }

  function handleChange(item) {
    const selection = item.selection
    setRange([selection])
    if (selection.startDate === selection.endDate) {
      onSetField('checkIn', selection.startDate)
      console.log(formatDate(selection.startDate))
    } else {
      onSetField('checkOut', selection.endDate)
    }
  }

  return (
    <DateRange
      className='myCalanadar'
      editableDateInputs={true}
      onChange={handleChange}
      moveRangeOnFirstSelection={false}
      ranges={range}
      months={monthsToShow}
      direction='horizontal'
      rangeColors={['#272727']}
      showDateDisplay={false}
      showMonthAndYearPickers={false}
    />
  )
}
