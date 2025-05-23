import React, { useContext, useState, useEffect } from "react";


const WorkoutStateContext = createContext();
const WorkoutDispatchContext = createContext();

export const useWorkoutState = () => useContext(WorkoutStateContext);
export const useWorkoutDispatch = () => useContext(WorkoutDispatchContext);

export const WorkoutProvider = ({ children }) => {
  const [workoutState, dispatch] = useReducer(rootReducer, initializer);

  // Persist workout state on workout update
  useEffect(() => {
    localStorage.setItem("workout", JSON.stringify(workoutState));
  }, [workoutState]);

  return (
    <WorkoutStateContext.Provider value={workoutState}>
      <WorkoutDispatchContext.Provider value={dispatch}>
        {children}
      </WorkoutDispatchContext.Provider>
    </WorkoutStateContext.Provider>
  );
};




//change workout state with a value we provide
const exercise = {
    exerciseName,
    sets: { [uuidv4()]: DEFAULT_SET },
  };

  dispatch({
    type: "ADD_EXERCISE",
    payload: { exerciseId: uuidv4(), exercise },
  });

  