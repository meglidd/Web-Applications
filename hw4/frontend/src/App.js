import React, { useState, useEffect, useReducer } from "react";
import { useResource } from "react-request-hook";
import { v4 as uuidv4 } from "uuid";

import UserBar from "./user/UserBar";
import TodoList from "./post/TodoList";
import CreateTodo from "./post/CreateTodo";
import Header from "./Header";
import ChangeTheme from "./ChangeTheme";

import appReducer from "./reducers";

import { ThemeContext, StateContext } from "./contexts";

function App() {
  const initialTodos = [];

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: initialTodos,
  });

  const { user } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user}’s Todo List`;
    } else {
      document.title = "Todo List";
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
      dispatch({ type: "FETCH_TODOS", todos: todos.data.reverse() });
    }
  }, [todos]);

  const [todo, deleteTodo] = useResource(() => ({
    url: "/todo",
    method: "delete",
  }));

  useEffect(deleteTodo, []);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: "FETCH_DELETE", todos: todos.data.remove() });
    }
  }, [todos]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header title="Todo List" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <React.Suspense fallback={"Loading..."}>
            <UserBar />
          </React.Suspense>
          <TodoList />
          {state.user && <CreateTodo />}
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
