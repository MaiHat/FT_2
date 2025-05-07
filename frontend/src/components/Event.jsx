import React, { useState } from 'react'

function Event() {
     //dateおすとevent入力のpopupを出すための
        const [selectedDate, setSelectedDate] = useState(currentDate);
        const [showEventPopup, setShowEventPopup] = useState(false);
        //event入力
        const [events, setEvents] = useState([]);
        const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00"});
        const [eventText, setEventText] = useState("");
        //for editing event
        const [editingEvent, setEditingEvent] = useState(null);
    
}