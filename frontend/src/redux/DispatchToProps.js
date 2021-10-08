function mapDispatchToProps(dispatch) {
  return {
    login: () => {
      dispatch({ type: "LOGIN" });
    },
    logout: () => {
      dispatch({ type: "LOGOUT" });
    },
    textInput: (value) => {
      dispatch({ type: "ADD_CONTENT", addContent: value });
    },
    deleteInput: (value) => {
      dispatch({ type: "REMOVE_CONTENT", id: value });
    },
    newType: () => {
      dispatch({ type: "NEW_TYPE" });
    },
    collections: (value) => {
      dispatch({ type: "COLLETION", collection: value });
    },
    getApi: (value) => {
      dispatch({
        type: "ADD_DATA",
        getData: value.data,
        typePost: value.typePost,
      });
    },
    removeData: (value) => {
      dispatch({ type: "REMOVE_DATA", indexdata: value });
    },
    inputEdit: (value) => {
      dispatch({ type: "EDIT_DATA", dataEdit: value });
    },
  };
}

export default mapDispatchToProps;
