import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import mapDispatchToProps from "../../redux/DispatchToProps";
import mapStateToProps from "../../redux/StateToProps";

class HomePages extends Component {
  render() {
    return (
      <div>
        <h1>
          {this.props.textcontent}   
        </h1>   
      </div>
    );
  }
  
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(HomePages);

