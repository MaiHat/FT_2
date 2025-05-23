import React from 'react';

const EventManager = ({
  showEventPopup,
  setShowEventPopup,
  eventTime,
  handleTimeChange,
  eventText,
  setEventText,
  handleEventSubmit,
  editingEvent,
  events,
  monthsOfYear,
  handleEditEvent,
  handleDeleteEvent,
}) => {
  return (
    <div className='events'>
      {showEventPopup && (
        <div className='event-popup'>
          <div className='time-input'>
            <div className='event-popup-time'>Part</div>
            <input
              type="text"
              name="part"
              
            />
            <div>Event</div>
            <input
              type="text"
              name="event"
              className="event--name"
            />
            
          </div>
          <textarea
            placeholder="Enter Event Text (Maximum 60 Characters)"
            value={eventText}
            onChange={(e) => {
              if (e.target.value.length <= 60) {
                setEventText(e.target.value);
              }
            }}
          ></textarea>
          <button className="event-popup-btn" onClick={handleEventSubmit}>
            {editingEvent ? "Update Event" : "Add Event"}
          </button>
          <button className="close-event-popup" onClick={() => setShowEventPopup(false)}>
            <i className='bx bx-x'></i>
          </button>
        </div>
      )}

      {events.map((event, index) => (
        <div className='event' key={index}>
          <div className='event-date-wrapper'>
            <div className='event-date'>
              {`${monthsOfYear[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}`}
            </div>
            <div className='event-time'>{event.time}</div>
          </div>
          <div className='event-text'>{event.text}</div>
          <div className='event-buttons'>
            <i className='bx bxs-edit-alt' onClick={() => handleEditEvent(event)}></i>
            <i className='bx bxs-message-alt-x' onClick={() => handleDeleteEvent(event.id)}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventManager;
