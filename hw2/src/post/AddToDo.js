import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddToDo({ user, todos, dispatch }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: "CREATE_POST",
          title,
          content,
 //         complete: complete,
          author: user,
          id: uuidv4(),
        });
      }}
    >
      <div>
        Author: <b>{user}</b>
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
      <div>
      <label htmlFor="create-description">Description:</label>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      </div>


{/*   
      date created:(this field is set dynamically when the form is submitted – 
                    research the JS lib method Date.now())

      complete: (a boolean initially set to false when a Todo is created)

      date complete: set dynamically when checkbox is toggled

*/}

      <input type="submit" value="Add ToDo" />
    </form>
  );
}
