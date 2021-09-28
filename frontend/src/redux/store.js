import { createStore } from "redux";

function author(state = false, action) {
  switch (action.type) {
    case "LOGIN":
      return true;
    case "LOGOUT":
      return false;
    default:return state
  }
}

const store = createStore(author);

export default store;
