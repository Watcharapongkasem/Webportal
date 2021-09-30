import { combineReducers, createStore } from "redux";

function author(state = false, action) {
  switch (action.type) {
    case "LOGIN":
      return true;
    case "LOGOUT":
      return false;
    default:
      return state;
  }
}

function content(state = [], action) {
  switch (action.type) {
    case "ADD_CONTENT":
      return [...state,action.addContent];
    case "REMOVE_CONTENT":
      return state.filter((value, index) => {
        return index !== action.id;
      })
    default:
      return state;
  }
}

const root = combineReducers({ author, content });

const store = createStore(root);

export default store;
