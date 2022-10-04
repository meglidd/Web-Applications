export default function ToDo({ title, content, author, date }) {
  
  return (
    <div>
      <h3>{title}</h3>
      <div>{content}</div>
      <br />

      <i>
        Written by <b>{author}</b>
      </i>

      <br/>
      Date Created: {date}

      <br/>

      <br/>
      Completed:       
      <input 
        type="checkbox" 
        id="accept" 
        name="accept" 
        value="yes"
        // onChange={(event) => setComplete(event.target.value)}
        />  
      {/* {complete} */}
      <br/>

      <br/>
     {/* Date Completed: {dateCompleted} */}
      <br/>

    </div>
  );
}
