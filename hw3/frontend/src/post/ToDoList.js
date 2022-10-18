import { useContext } from "react";

import ToDo from "./ToDo";
import { StateContext } from "../contexts";

export default function ToDoList() {
  const { state } = useContext(StateContext);
  const { todos } = state;
  return (
    <div>
      {todos.map((p, i) => (
        <ToDo {...p} key={p.id} />
      ))}
    </div>
  );
}
