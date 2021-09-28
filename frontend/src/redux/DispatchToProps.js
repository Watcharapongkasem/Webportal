function mapDispatchToProps(dispatch) {
  return {
    login: () => {
      dispatch({ type: "LOGIN" });
    },
    logout: () => {
      dispatch({ type: "LOGOUT" });
    },
  };
}

export default mapDispatchToProps;
