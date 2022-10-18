import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { StateContext } from "../contexts";

export default function AddToDo() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdDate, setDate] = useState("");

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const date = new Date();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: "CREATE_TODO",
          title,
          content,
          author: user,
          id: uuidv4(),
          createdDate: date.getDate(),
        });
      }}
    >
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title: </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="create-description">Description:</label>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>

      <input type="submit" value="Add ToDo" />
    </form>
  );
}
