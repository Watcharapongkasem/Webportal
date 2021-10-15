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
      return [action.addContent, ...state];
    case "REMOVE_CONTENT":
      return state.filter((value, index) => {
        return index !== Number(action.id);
      });
    case "NEW_TYPE":
      return [];
    default:
      return state;
  }
}

function newcontent(state = '', action) {
  switch (action.type) {
    case "ADD_NEWCONTENT":
      return action.addNewContent;
    case "REMOVE_NEWCONTENT":
      return state.filter((value, index) => {
        return index !== Number(action.newid);
      });
    default:
      return state;
  }
}

function newcollection(state = "Other", action) {
  switch (action.type) {
    case "COLLETION":
      return action.collection;
    default:
      return state;
  }
}

function getData(state = { data: [], typePost: "Other" }, action) {
  switch (action.type) {
    case "ADD_DATA":
      return { data: action.getData, typePost: action.typePost };
    case "REMOVE_DATA":
      return {
        data: state.data.filter((value, index) => {
          return index !== Number(action.indexdata);
        }),
        typePost: state.typePost,
      };
    default:
      return state;
  }
}

function editData(state = "", action) {
  switch (action.type) {
    case "EDIT_DATA":
      return action.dataEdit;
    default:
      return state;
  }
}
const root = combineReducers({
  author,
  content,
  newcollection,
  getData,
  editData,
  newcontent,
});

const store = createStore(root);

export default store;
