import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { collection, getDocs, addDoc, doc, setDoc, Timestamp, query } from "firebase/firestore";
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
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();//0=Sunday, 1=Monday...
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();//ex30 
  const [selectedDate, setSelectedDate] = useState(today);
  const [addPopup, setAddPopup] = useState(false);
  const [createPopup, setCreatePopup] = useState(false);
  const [detailsPopup, setDetailsPopup] = useState(false);

  const [bodyParts, setBodyParts] = useState([
    {id: "Chest", workoutName: ["Chest Press", "Bench Press"]},
    { id: "Legs", workoutName: ["Squat"]},
  ]);
  const [displayedBodyParts, setDisplayedBodyParts] = useState([]);
  const [workouts, setWorkouts] = useState({});
  
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
  async function fetchBodyParts() {
     const q = query(collection(db, "bodyParts"));
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(doc => doc.data());
      console.log("bodyParts:", fetched);
      setDisplayedBodyParts(fetched);
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
    const setsWithRM = formData.map(set => ({
      ...set,
      RM: calculateRM(set.weight, set.reps) 
      ? parseFloat(calculateRM(set.weight, set.reps))
      : null
    }));

    const newWorkout = {
      id: uuidv4(),
      sets: setsWithRM,
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

useEffect( () => {
   fetchBodyParts()
}, []);

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
                  {/*Array(firstDayOfMonth) で「空白の箱」を作る 
                  keys() で 0 から firstDayOfMonth - 1 までの数字列を作る
                  .map() で空白 <span>
                  もし月の初日が木曜日（4）なら空の <span> が4個作られる
                  <span></span> <span></span> <span></span> <span></span>
                  */}
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
                  {/* Array(daysInMonth).keys()    月の日数分（28〜31日）だけ数列を作る → 例: [0, 1, 2, ..., 30]（31日分）
                  .map((day) => <span key={day + 1}>    day は 0〜30（0始まり）なので、day + 1 が実際のカレンダー日
                  className部分は今日の日付であれば "current-day" クラスを付与する条件分岐、
                  今日が 2025年6月16日 の場合、 16 にだけ "current-day" クラスが付く
                    */}
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
                {displayedBodyParts.map((part) => (
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
            onClick={handleClickDate}
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