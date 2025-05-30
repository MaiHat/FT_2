import React, { useState } from 'react'

function Calendar() {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const currentDate = new Date();
    //calenadar
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    function prevMonth() {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
    } 

    function nextMonth() {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
    } 
     //dateおすとevent入力のpopupを出すための
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showEventPopup, setShowEventPopup] = useState(false);
    
    function handleDayClick (day) {
        const clickedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();
           
            setSelectedDate(clickedDate);
            setShowEventPopup(true);
            setEventText("");
            setEditingEvent(null);
        }

    function handleTodayClick() {
            setSelectedDate(currentDate);
            setShowEventPopup(true);
            setEventText("");
            setEditingEvent(null);
    }
    

    function handleEventSubmit() {
        const newEvent = {
            id: editingEvent ? editingEvent.id : Date.now(), //idがあればevent editなければnew event
            date: selectedDate,
            //part:  ,
           // event: ,
            //weight:,
            //reps:,
            //sets:,
            text: eventText,
        }

        let updatedEvents = [...events]

        if (editingEvent) {
            updatedEvents = updatedEvents.map((event) => 
            event.id === editingEvent.id ? newEvent : event, //editしてるidとupdatedEventsの中のevent.idがマッチしてたら上書き、
        )                                                      //してなかったら在存するeventをそのまま残す
        } else {
            updatedEvents.push(newEvent);
        }
        
        updatedEvents.sort((a,b) => new Date(a.date) - new Date(b.date));    //マイナスならaが先bが後にstoreされ、プラスなら逆。日付の整理のためのコード

        setEvents(updatedEvents); //changed from this([...events, newEvent]);
        setEventTime({ hours: "00", minutes: "00"})
        setEventText("");
        setShowEventPopup(false);
        setEditingEvent(null);
    }

    function handleEditEvent(event) { //for editiong event
        setSelectedDate(new Date(event.date)); //stringでstoreされているeventのdateをdata objectに変換している
        setEventTime({                          //splitting hoursとmins
            hours: event.time.split(":")[0],
            minutes: event.time.split(":")[1],
        });
        setEventText(event.text);   //setting event text
        setEditingEvent(event);     //storing the event being edited
        setShowEventPopup(true);    //show eventPopup to edit
    }

    function handleDeleteEvent(eventId) {
        const updatedEvents = events.filter((event) => event.id !== eventId); //選んだeventのidと同じidをfilterで見つけてdeleteする
        setEvents(updatedEvents);
    }

    /*function handleTimeChange(e) {
        const {name, value} = e.target;
        setEventTime((prevTime) => ({...prevTime, [name]: value.padStart(2, "0")})) 
        //入力されたvalueは2文字で1文字しかない場合は0が入れられるという設定
    } */

  return (
    <div className='calendar-container'>
    <div className='calendar-app'>
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
                    <span key={`empty-${index}`}/>
                ))}
                {[...Array(daysInMonth).keys()].map((day) => 
                <span 
                key={day + 1} 
                className={
                    day + 1 === currentDate.getDate() && 
                    currentMonth === currentDate.getMonth() &&
                    currentYear === currentDate.getFullYear() 
                    ? "current-day" : "" 
                } 
                onClick={() => handleDayClick(day + 1)} >
                {day+1}
                </span>
                )}
            </div>
            </div>
        </div>
        <div className='events'>
            {showEventPopup &&  (
                <div className='event-popup'>
                <h1>Select Event</h1>
              <div className='time-input'>
                    <div className='event-popup-time'>Part</div>
                    <input 
                    type="text" 
                    name="part" 
                    //value={} 
                    onChange={handleTimeChange} //(e) => setEventTime({...eventTime, hours: e.target.value})
                    />
                    <input 
                    type="number" 
                    name="minutes" 
                    min={0} 
                    max={60} 
                    className="minutes" 
                    value={eventTime.minutes}
                    onChange={handleTimeChange} //(e) => setEventTime({...eventTime, minutes: e.target.value})
                    />
                </div>
                <textarea 
                placeholder="Enter Event Text (Maximum 60 Characters)"
                value={eventText}
                onChange={(e) => {
                    if (e.target.value.length <= 60) {
                        setEventText(e.target.value)
                    }
                }}
                >
                </textarea>
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
                        {`${monthsOfYear[event.date.getMonth()]}
                        ${event.date.getDate()},
                        ${event.date.getFullYear()}`}
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
    </div>
    </div>
  )
}

export default Calendar;