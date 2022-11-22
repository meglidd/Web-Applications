import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useResource } from "react-request-hook";

import { StateContext } from "../contexts";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dateCreated, setDate] = useState("");
  const [error, setError] = useState(false);

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todo, createTodo] = useResource(
    ({ title, content, author, dateCreated }) => ({
      url: "/todo",
      method: "post",
      headers: { Authorization: `${state.user.access_token}` },
      data: { title, content, dateCreated },
    })
  );

  // ensure the newly created post didn't return an error, handle if it did
  useEffect(() => {
    if (todo.isLoading === false && todo.data) {
      dispatch({
        type: "CREATE_TODO",
        title: todo.data.title,
        content: todo.data.content,
        author: user.username,
        id: todo.data.id,
        dateCreated: todo.data.dateCreated,
      });
    }
  }, [todo]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo({ title, content, author: user, dateCreated });
      }}
    >
      <div>
        Author: <b>{user.username}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <input type="submit" value="Create" />
    </form>
  );
}
