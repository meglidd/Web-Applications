function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        username: action.username,
        access_token: action.access_token,
      };
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        content: action.content,
        author: action.author,
        dateCreated: action.dateCreated,
        id: action.id,
      };
      return [newTodo, ...state];
    case "FETCH_TODOS":
      return action.todos;
    case "TOGGLE_TODO":
      return action.todo;
    case "DELETE_TODO":
      return [...state];

    case "CLEAR_TODOS":
      return [];

    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}
