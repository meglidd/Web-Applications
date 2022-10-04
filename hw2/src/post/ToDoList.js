import ToDo from "./ToDo";

export default function ToDoList({ todos = [] }) {
  return (
    <div>
      {todos.map((p, i) => (
        <ToDo {...p} key={p.id} />
      ))}
    </div>
  );
}
