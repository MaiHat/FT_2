import React, { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, doc, setDoc, Timestamp, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

{/*get workout data by date from database 
    display list of workout by bodyPart 
    for every bodyPart it should list workoutName
    for every workoutName have list of sets 
    
    Greeting.jsxでbodyPartsをfirestoreからfetchしてaddWorkout popupに表示したいが苦戦中

    */}

export default function WorkoutList({selectedDate}) {
    const [displayedWorkouts, setDisplayedWorkouts] = useState([]);
    async function fetchWorkoutData() {
        const ts = Timestamp.fromDate(selectedDate);
        //Timestamp is too acurate(by ミリseconds) so need to tell where to devide.
        const start = Timestamp.fromDate(new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          0, 0, 0, 0
        ));
        const end = Timestamp.fromDate(new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          23, 59, 59, 999
        ));
        //JSのデータ型をfirestoreのtimestamp型に変換し、0時から11:59までに設定
        const q = query(collection(db, "workouts"), where("date", ">=", start), where("date", "<=", end));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => doc.data());
        console.log(fetched, "date:", selectedDate);
        setDisplayedWorkouts(fetched);
    }
    useEffect(() => {
      if(selectedDate) {
        fetchWorkoutData();
      }
    }, [selectedDate]);
  return (
    <div>
      Karaage
      {displayedWorkouts.map((workout, index) => (
            <div className='event' key={index}>
              <div className='event-date'>
               {workout.date?.toDate().toLocaleDateString()}</div>
              <div className='event-time'>{workout.bodyPart}</div>
              <div className='event-text'>
                {workout.workoutName}<br />
                {workout.sets.map((set, i) => (
        <div key={i}> 
          Set {i+1}: {set.weight} kg x {set.reps}Reps RM:{set.RM}<br />
           Note: {set.note} 
        </div>
      ))}
                
              </div> 
              <div className='event-buttons'>
                <i className='bx bxs-edit-alt' ></i>
                <i className='bx bxs-message-alt-x' onClick={() => handleDeleteWorkout(workout.id)}></i>
              </div>
            </div>
          ))}
    </div>
  )
}
