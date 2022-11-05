import React from "react";

import { useContext } from "react";
import { ThemeContext } from "../contexts";

function Todo({ title, content, author }) {
  const { secondaryColor } = useContext(ThemeContext);
  console.log("Todo rendered");
  return (
    <div>
      <h3 style={{ color: secondaryColor }}>{title}</h3>
      <div>{content}</div>
      <br />
      <i>
        Written by <b>{author}</b>
      </i>
    </div>
  );
}

export default React.memo(Todo);
//export default Todo;
