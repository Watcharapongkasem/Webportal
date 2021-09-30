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
  };
}

export default mapDispatchToProps;
