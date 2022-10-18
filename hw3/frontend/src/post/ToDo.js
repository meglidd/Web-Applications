import { useContext } from "react";
import { ThemeContext } from "../contexts";

export default function ToDo({ title, content, author, date }) {
  const { secondaryColor } = useContext(ThemeContext);

  return (
    <div>
      <h3 style={{ color: secondaryColor }}>{title}</h3>
      <div>{content}</div>
      <br />
      <i>
        Written by <b>{author}</b>
      </i>
      <br />
      Created On:
      {/* createdDate */}
      <br />
      Completed:
      <input
        type="checkbox"
        id="accept"
        name="accept"
        value="yes"
        // onChange={(event) => setComplete(event.target.value)}
      />
      <br />
      Completed On: {date}
      <br />
      <br />
      <br />
    </div>
  );
}
