import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import mapDispatchToProps from "../../redux/DispatchToProps";
import mapStateToProps from "../../redux/StateToProps";

class maindata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    const para = new URLSearchParams(this.props.location.search);
    this.index = para.getAll("index");
    this.type = para.getAll("type");
  }
  componentDidMount() {
    fetch("/content?index=" + this.index + "&type=" + this.type)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ text: res.content[0] });
      });
  }
  render() {
    return <div><div dangerouslySetInnerHTML={{ __html: this.state.text }} /></div>;
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(maindata);
