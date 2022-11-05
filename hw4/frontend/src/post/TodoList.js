import { useContext } from "react";

import Todo from "./Todo";
import { StateContext } from "../contexts";

export default function TodoList() {
  const { state } = useContext(StateContext);
  const { todos } = state;
  return (
    <div>
      {todos.map((p, i) => (
        <Todo {...p} key={p.id} />
      ))}
    </div>
  );
}
