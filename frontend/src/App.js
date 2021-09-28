import React, { Component } from "react";
import Login from "./component/pages/Login";
import Home from "./component/pages/HomePages";
import { Route } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import { connect } from "react-redux";
import mapStateToProps from "./redux/StateToProps";
import mapDispatchToProps from "./redux/DispatchToProps";

class App extends Component {
  getToken() {
    if (this.props.statusLogin){
      localStorage.setItem('author', JSON.stringify({author:this.props.statusLogin}));
    }else{
      localStorage.setItem('author', JSON.stringify({author:this.props.statusLogin}));
    }
    const getToken = localStorage.getItem("author");
    const token = JSON.parse(getToken);
    return token?.author;
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <PrivateRoute
          exact
          path="/home"
          component={Home}
          status={this.getToken.bind(this)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
