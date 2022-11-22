import React from "react";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { ThemeContext } from "../contexts";

function Post({ title, content, author, dateCreated, _id }) {
  const { secondaryColor } = useContext(ThemeContext);
  console.log("Todo rendered");
  return (
    <div>
      <Link to={`/post/${_id}`}>
        <h3 style={{ color: "black" }}>{title}</h3>
      </Link>
      <div>{content}</div>
      <br />
      <i>
        Written by <b>{author}</b>
      </i>
      Completed:{" "}
      <input
        type="checkbox"
        id="accept"
        name="accept"
        value="yes"
        onChange={(event) => setComplete(event.target.value)}
      />
      <br />
      Date Created: {dateCreated}
      <br />
      Date Completed: {setComplete}
    </div>
  );
}

export default React.memo(Todo);
//export default Todo;
