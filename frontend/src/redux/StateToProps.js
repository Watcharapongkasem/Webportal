function mapStateToProps(state) {
  return { statusLogin: state.author, textcontent: state.content };
}

export default mapStateToProps;
