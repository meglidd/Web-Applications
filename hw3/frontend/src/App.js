import { useState, useReducer, useEffect } from "react";
import { useResource } from "react-request-hook";
import { v4 as uuidv4 } from "uuid";

import UserBar from "./user/UserBar";
import ToDoList from "./post/ToDoList";
import AddToDo from "./post/AddToDo";
import Header from "./Header";
import ChangeTheme from "./ChangeTheme";

import appReducer from "./reducers";

import { ThemeContext, StateContext } from "./contexts";

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

  const { user } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user}’s ToDo List`;
    } else {
      document.title = "ToDo List";
    }
  }, [user]);

  const [theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondaryColor: "coral",
  });

  // useEffect(() => {
  //   fetch("/api/themes")
  //     .then((result) => result.json())
  //     .then((themes) => setTheme(themes));
  // }, []);

  // useEffect(() => {
  //   fetch("/api/todos")
  //     .then((result) => result.json())
  //     .then((todos) => dispatch({ type: "FETCH_TODOS", todos }));
  // }, []);

  const [todos, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));

  useEffect(getTodos, []);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data });
    }
  }, [todos]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header title="ToDo List" />
          <ChangeTheme theme={theme} setTheme={setTheme} />

          <UserBar />
          <ToDoList />
          {state.user && <AddToDo />}
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
