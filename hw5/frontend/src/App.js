import React, { useState, useEffect, useReducer } from "react";
import { useResource } from "react-request-hook";
import TodoList from "./post/TodoList";
import CreateTodo from "./post/CreateTodo";

import appReducer from "./reducers";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

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
