import React, { Component } from "react";
import Login from "./component/pages/Login";
import Home from "./component/pages/HomePages";
import PrivateRoute from "./component/PrivateRoute";
import { connect } from "react-redux";
import mapStateToProps from "./redux/StateToProps";
import mapDispatchToProps from "./redux/DispatchToProps";
import StatusLogin from "./component/StatusLogin";
import EditContent from "./component/pages/EditContent";
import Maindata from "./component/pages/Maindata";
import Dashboard from "./component/pages/Dashboard";
import AdminRoute from "./component/AdminRoute";
import { Switch } from "react-router";
import ProFiles from "./component/pages/ProFiles";

class App extends Component {
  getToken() {
    const getToken = localStorage.getItem("author");
    const token = JSON.parse(getToken);
    return token?.author;
  }
  getUser() {
    const getToken = localStorage.getItem("author");
    const token = JSON.parse(getToken);
    return token.username;
  }
  render() {
    return (
      <div>
        <Switch>
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
          <AdminRoute
            exact
            path="/EditContent"
            component={EditContent}
            status={this.getToken.bind(this)}
            username={this.getUser.bind(this)}
          />
          <PrivateRoute
            exact
            path="/maindata"
            component={Maindata}
            status={this.getToken.bind(this)}
          />
          <PrivateRoute
            exact
            path="/Profile"
            component={ProFiles}
            status={this.getToken.bind(this)}
          />
          <AdminRoute
            exact
            path="/Dashboard"
            component={Dashboard}
            status={this.getToken.bind(this)}
            username={this.getUser.bind(this)}
          />
          <PrivateRoute
            exact
            path="*"
            component={Home}
            status={this.getToken.bind(this)}
          />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
