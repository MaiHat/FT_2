import React, { useEffect } from 'react'
import { collection, getDocs, addDoc, doc, setDoc, Timestamp, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
{/*get workout data by date from database 
    display list of workout by bodyPart 
    for every bodyPart it should list workoutName
    for every workoutName have list of sets */}
export default function WorkoutList() {
    async function fetchWorkoutData() {
        const yesterday = new Date("June 13, 2025 23:15:30");
        const ts = Timestamp.fromDate(yesterday);
        const todayString = new Date();
        const q = query(collection(db, "workouts"), where("date", ">", ts));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => doc.data());
        //setAllWorkouts(fetched);
        console.log(fetched);
        //newDate() で今の日時(ex: 2025-06-03T13:00:00Z)を取得,
        //.toDateSrting()で文字列の日付に変換(ex: Tue Jun 3 2025)Firestoreのworkout.dateもこの形式
        //setDisplayedWorkouts(fetched.filter(w => w.date === todayString));
        //dateが今日のを取り出す 
    }
    useEffect(() => {
    
    fetchWorkoutData();
    //fetchBodyParts();
  
  }, []);
  return (
    <div>
      Karaage
    </div>
  )
}
