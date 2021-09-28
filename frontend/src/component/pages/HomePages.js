import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class HomePages extends Component {
  render() {
    return (
      <div>
        <h1>
          Hello From HomePages          
        </h1>
      </div>
    );
  }
}

export default withRouter(HomePages);
