import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { collection, getDocs, addDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import WorkoutList from './WorkoutList';


export default function Greeting() {

  const { currentUser, username } = useAuth();
  const navigate = useNavigate();
  const today = new Date();
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
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); //今の月 ex, 6月だと5
  const [currentYear, setCurrentYear] = useState(today.getFullYear()); //今の年　ex, 2025
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const [selectedDate, setSelectedDate] = useState(today);
  const [addPopup, setAddPopup] = useState(false);
  const [createPopup, setCreatePopup] = useState(false);
  const [detailsPopup, setDetailsPopup] = useState(false);

  const [bodyParts, setBodyParts] = useState([
    {id: "Chest", workoutName: ["Chest Press", "Bench Press"]},
    { id: "Legs", workoutName: ["Squat"]},
]);
 


  const [workouts, setWorkouts] = useState({
    Chest: [
      { id: uuidv4(), workoutName: "Chest Press", 
        sets: [
        { setId: uuidv4(), weight: "", reps: "", note: "", RM: "" }]
      },
      { id: uuidv4(), workoutName: "Bench Press", 
        sets: [
        { setId: uuidv4(), weight: "", reps: "", note: "", RM: "" }]
      },
    ],
    Legs: [
      { id: uuidv4(), workoutName: "Squat", 
        sets: [
        { setId: uuidv4(), weight: "", reps: "", note: "" }]
      },
    ],
    Back: [
      { id: uuidv4(), workoutName: "Lat Pulldown", 
        sets: [
        { setId: uuidv4(), weight: "", reps: "", note: "" }]
      },
      { id: uuidv4(), workoutName: "Underhand grip Lat Pulldown", 
        sets: [
        { setId: uuidv4(), weight: "", reps: "", note: "" }]
      },
    ],
    Arms: [],
  });
  
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [formData, setFormData] = useState([ 
    { weight: "", reps:"", note: ""}
  ]);

  function prevMonth() {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
    } 

  function nextMonth() {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  }
  const [allWorkouts, setAllWorkouts] = useState([]); //firestoreから取得した全workouts
  





  function handleClickDate (day) {
    const clickedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(clickedDate);
    setAddPopup(true);
  }

  function handleClickTodays() {
    setSelectedDate(today);
    setAddPopup(true);
  }
  
  function handleClickCreate() {
    setCreatePopup(true);
  }

 function handleChangeWorkouts(index, e) {
    const { name, value } = e.target;
    const updatedSets = [...formData];
    updatedSets[index][name] = value;
    setFormData(updatedSets);
  }

  function addSet() {
    setFormData([...formData, { weight: "", reps: "", note: "" }]);
  }

  function calculateRM(weight, reps) {
    const w = parseFloat(weight);
    const r = parseFloat(reps);
    if(!w || !r || r === 0 ) return "";
    return (w * (1 + r / 30)).toFixed(1);
  };

  async function handleWorkoutSubmit(e) {
    e.preventDefault();
      const date = selectedDate || new Date();
      const newWorkout = {
      id: uuidv4(),
      sets: formData,
      date: Timestamp.fromDate(date),
      bodyPart: selectedWorkout.id,
      workoutName: selectedWorkout.workoutName,
      }
    console.log(newWorkout);
    try {
      const docRef = await addDoc(collection(db, "workouts"), newWorkout);
      setWorkouts(prev => {
        const updated = { ...prev };
        console.log("updated", updated);
        if (!updated[newWorkout.bodyPart]) updated[newWorkout.bodyPart] =[];
        updated[newWorkout.bodyPart].push(newWorkout);
        return updated;
      });
      setDetailsPopup(false);
      console.log("Workout saved:", newWorkout);
    } catch(error) {
    console.log(error);
    }
  }

function handleCreateWorkout(e) {
  e.preventDefault();
  const bodyPart = e.target.bodyPart.value.trim();
  const workoutName = e.target.workoutName.value.trim();
  
  if(!bodyPart || !workoutName) {
    alert("Please fill i n both fields.");
    return;
  }

  const newWorkout = {
    id: uuidv4(),
    workoutName: workoutName,
    sets: [{
    setId: uuidv4(),
    weight: "",
    reps: "",
    note: "",
    }]
    };

  setWorkouts(prev => ({
    ...prev,
    [bodyPart]: prev[bodyPart] ? [...prev[bodyPart], newWorkout] : [newWorkout],
  }));

  setCreatePopup(false);
}

function handleDeleteWorkout(id) {
  const updated = {};
  for (const [bodyPart, exercises] of Object.entries(workouts)) {
    updated[bodyPart] = exercises.filter(workout => workout.id !== id);
  }
  setWorkouts(updated);
}

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
                      day + 1 === today.getDate() && 
                      currentMonth === today.getMonth() &&
                      currentYear === today.getFullYear() 
                      ? "current-day" : "" 
                  } 
                  onClick={() => handleClickDate(day + 1)} >
                  {day+1}
                  </span>
                  )}
              </div>
            </div>
        </div>
        <div className="greeting">
          <h1>Hello  {username}</h1>
          <h2>Email: {currentUser.email}</h2>
          <button onClick={handleClickTodays}>Today's Training</button>
          <div className='archived-days'>
                <h2>Weekly Archive days</h2>
                <h3>Monthy days</h3>
          </div>

          {/* add workout popup */}
          <div className='events'>
              {addPopup &&  (
              <div className='event-popup'>
                <h1>Add Work out</h1>
                <h2>{selectedDate ? selectedDate.toLocaleDateString() : ''}</h2>
                {bodyParts.map((part) => (
                <div key={part.id}>
                <h3>{part.id}</h3>
                  {part.workoutName.map((wn, idx) => (
                  <button 
                  key={idx}
                  onClick={() => {setSelectedWorkout({
                    id: part.id,
                    index: idx,
                    workoutName: wn
                  });
            setDetailsPopup(true);
                  }}>
                    {wn}
                  </button>
                  ))}
                </div>
              ))}
                <button onClick={handleClickCreate}>Create Work out</button>
                <button className="close-event-popup" onClick={() => setAddPopup(false)}>
                  <i className='bx bx-x'></i>
                </button>
              </div>
              )}
          </div>
            
          {/*workout details popup*/ }
          <div className='events'>
              {detailsPopup && selectedWorkout && (
                <div className='event-popup'>
                  <h1>{selectedWorkout.workoutName} (from {selectedWorkout.bodyPart})</h1>
                  <form 
                  onSubmit={handleWorkoutSubmit}
                  className='workoutDetail'
                  >
                    {formData.map((set, index) => (
                      <div className='set' key={index}>
                        <label>Set {index + 1}</label>
                        <input
                        type="number"
                        value={set.weight}
                        name="weight"
                        placeholder="Weight"
                        onChange={(e) => handleChangeWorkouts(index, e)}
                        />
                        <input
                        type="number"
                        value={set.reps}
                        name="reps"
                        placeholder="Reps"
                        onChange={(e) => handleChangeWorkouts(index, e)}
                        />
                        <textarea
                          value={set.note}
                          name="note"
                          onChange={(e) => handleChangeWorkouts(index, e)}
                          placeholder="Note"
                        />
                        <div>RM: {calculateRM(set.weight, set.reps)}</div>
                    </div>
                    ))}
                  <button type="button" onClick={addSet}>+ Add Set</button>
                  <button type="submit">Save</button>
                  </form>
                  <button className="close-event-popup" onClick={() => setDetailsPopup(false)}>
                    <i className='bx bx-x'></i>
                  </button>
                </div>
              )}
          </div>

          {/*to display workout*/}
          <WorkoutList  
          selectedDate={selectedDate}
          
          />
          
                
            
          {/*Create workout popup*/}
          <div className='events'>
            {createPopup &&  (
              <div className='event-popup'>
                <form onSubmit={handleCreateWorkout}>
                <h1>Create</h1>
                <label>Parts</label>
                <input type="text" 
                name="bodyPart"
                placeholder="Body Part"
                />
                <label>Workout Name</label>
                <input type="text" 
                name="workoutName"
                placeholder="Workout Name" 
                />
                <button>Save</button>
                <button className="close-event-popup" onClick={() => setCreatePopup(false)}>
                    <i className='bx bx-x'></i>
                  </button>
                </form>
              </div>
            )}
          </div>
            
            

        </div>
      </div>
    </div>
  )
}
//firestoreに保存したデータをフェッチして最初は今日のworkouts, カレンダーclickしたらクリックした日のworkoutsを表示できるようにした。
//bodyPart workooutnameも同じようにfirestoreからフェッチして表示したいがエラー
//bodyPartsのデータ構造を考えなおしてそれに応じたinput formをつくる