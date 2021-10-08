import React, { Component } from "react";
import Login from "./component/pages/Login";
import Home from "./component/pages/HomePages";
import PrivateRoute from "./component/PrivateRoute";
import { connect } from "react-redux";
import mapStateToProps from "./redux/StateToProps";
import mapDispatchToProps from "./redux/DispatchToProps";
import StatusLogin from "./component/StatusLogin";
import EditContent from "./component/pages/EditContent";

class App extends Component {
  getToken() {
    const getToken = localStorage.getItem("author");
    const token = JSON.parse(getToken);
    return token?.author;
  }

  render() {
    return (
      <div>
        <StatusLogin
          exact
          path="/"
          component={Login}
          status={this.getToken.bind(this)}
        />
        <PrivateRoute
          exact
          path="/home"
          component={Home}
          status={this.getToken.bind(this)}
        />
        <PrivateRoute
          exact
          path="/EditContent"
          component={EditContent}
          status={this.getToken.bind(this)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
