import { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import UserBar from "./user/UserBar";
import ToDoList from "./post/ToDoList";
import CreateToDo from "./post/AddToDo";

import appReducer from "./reducers";

function App() {
  const initialList = [
    {
      title: "My first ToDo",
      content: "All the task details can be written here.",
      author: "Meg",
      id: uuidv4(),

    },
    
  ];


  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: initialList,
  });

  return (
    <div>
      <UserBar user={state.user} dispatch={dispatch} />
      <ToDoList todos={state.todos} />
      {state.user && (
        <CreateToDo user={state.user} todos={state.todos} dispatch={dispatch} date = {state.date}/>
      )}
    </div>
  );
}

export default App;
