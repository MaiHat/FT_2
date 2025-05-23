import React from 'react';

const CalendarGrid = ({
  currentMonth,
  currentYear,
  currentDate,
  prevMonth,
  nextMonth,
  handleDayClick,
}) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className='calendar'>
      <div className="calendar--wrapper">
        <div className='navigate-date'>
          <div className='buttons'>
            <i className='bx bx-chevron-left' onClick={prevMonth}></i>
          </div>
          <h1 className='month'>{monthsOfYear[currentMonth]}</h1>
          <h1 className='year'>{currentYear}</h1>
          <div className='buttons'>
            <i className='bx bx-chevron-right' onClick={nextMonth}></i>
          </div>
        </div>
        <div className='weekdays'>
          {daysOfWeek.map((day) => <span key={day}>{day}</span>)}
        </div>
        <div className='days'>
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
