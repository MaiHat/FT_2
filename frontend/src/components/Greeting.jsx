import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Greeting() {
  const { currentUser, username } = useAuth();
  const navigate = useNavigate();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [addPopup, setAddPopup] = useState(false);
  const [createPopup, setCreatePopup] = useState(false);
  const [detailsPopup, setDetailsPopup] = useState(false);

  const [workouts, setWorkouts] = useState({
    Chest: [
      { id: uuidv4(), name: "Chest Press", weight: "", reps: "", sets: "", note: "" },
      { id: uuidv4(), name: "Bench Press", weight: "", reps: "", sets: "", note: "" },
    ],
    Legs: [
      { id: uuidv4(), name: "Squat", weight: "", reps: "", sets: "", note: "" },
    ],
    Back: [
      { id: uuidv4(), name: "Lat Pulldown", weight: "", reps: "", sets: "", note: "" },
      { id: uuidv4(), name: "Underhand grip Lat Pulldown", weight: "", reps: "", sets: "", note: "" },
    ],
    Arms: [],
  });

 
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [formData, setFormData] = useState({
    weight: "",
    reps:"", 
    sets: "",
    note: "",
  });

  useEffect(() => {
    if(selectedWorkout) {
      setFormData({
        weight: selectedWorkout.weight || "", 
        reps: selectedWorkout.reps || "",
        sets: selectedWorkout.sets || "",
        note: selectedWorkout.note || "",
      });
    }
  }, [selectedWorkout]);




  function handleClickTodays() {
    setSelectedDate(today);
    setAddPopup(true);
  }
  
  function handleClickCreate() {
    setCreatePopup(true);
  }

 function handleChangeWorkouts(e) {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleWorkoutSubmit(e){
  e.preventDefault();
  const newWorkout = {
    /*id: editingWorkout ? editingWorkout.id : Date.noe(), */
    ...workouts[selectedWorkout.bodyPart][selectedWorkout.index],
    id: uuidv4(),
    weight: formData.weight,
    reps: formData.reps,
    sets: formData.sets,
    note: formData.note,
    date: selectedDate ? selectedDate.toDateString() : new Date().toDateString(),
    bodyPart: selectedWorkout.bodyPart,
    name: selectedWorkout.name,
  }
  const updatedWorkouts = {...workouts};
  updatedWorkouts[selectedWorkout.bodyPart][selectedWorkout.index] = newWorkout;
  setWorkouts(updatedWorkouts);
  setDetailsPopup(false);
  console.log(newWorkout);
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
    name: workoutName,
    weight: "",
    reps: "",
    sets: "",
    note: "",
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
    <div>
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
             {Object.keys(workouts).map((bodyPart, index) => (
              <div key={index}>
                <h3>{bodyPart}</h3>
                {workouts[bodyPart].map((workout, idx) => (
                <button 
                key={idx}
                onClick={() => {setSelectedWorkout({
            bodyPart: bodyPart,
            index: idx,
            ...workout
                });
          setDetailsPopup(true);
                }}>
                  {workout.name}
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
                <h1>{selectedWorkout.name} (from {selectedWorkout.bodyPart})</h1>
                <form onSubmit={handleWorkoutSubmit}>
                  <label>Weight:</label>
                  <input
                    type="number"
                    value={formData.weight}
                    name="weight"
                    onChange={handleChangeWorkouts}
                  />
                  <label>Reps:</label>
                  <input
                    type="number"
                    value={formData.reps}
                    name="reps"
                    onChange={handleChangeWorkouts}
                  />
                  <label>Sets:</label>
                  <input
                    type="number"
                    value={formData.sets}
                    name="sets"
                    onChange={handleChangeWorkouts}
                  />
                  <label>Note:</label>
                  <textarea
                    value={formData.note}
                    name="note"
                    onChange={handleChangeWorkouts}
                    placeholder="note"
                  />
                  <button type="submit">Save</button>
                </form>
                <button className="close-event-popup" onClick={() => setDetailsPopup(false)}>
                  <i className='bx bx-x'></i>
                </button>
              </div>
            )}
        </div>

        {/*to display workout*/}
        {Object.entries(workouts).map(([bodyPart, exercises]) => (
              <div key={bodyPart}>
                {exercises
                  .filter(workout => workout.date === (selectedDate && selectedDate.toDateString()))
                  .map((workout, index) => (
                    <div className='event' key={index}>
                      <div className='event-date'>{workout.date}</div>
                      <div className='event-time'>{bodyPart}</div>
                      <div className='event-text'>
                        {workout.name} 
                        weight: {workout.weight} 
                        reps: {workout.reps} 
                        sets: {workout.sets} 
                        note: {workout.note}
                      </div> 
                      <div className='event-buttons'>
                        <i className='bx bxs-edit-alt' ></i>
                        <i className='bx bxs-message-alt-x' onClick={() => handleDeleteWorkout(workout.id)}></i>
                      </div>
                    </div>
                  ))
                }
              </div>
        ))}
           
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
  )
}
