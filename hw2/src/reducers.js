function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function postReducer(state, action) {
  switch (action.type) {
    case "CREATE_POST":
      const newPost = {
        title: action.title,
        content: action.content,
        author: action.author,
        id: action.id,
        date: action.date,
      };
      return [newPost, ...state];
    default:
      return state;
  }
}


export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: postReducer(state.todos, action),
  };
}