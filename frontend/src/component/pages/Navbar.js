import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import mapDispatchToProps from "../../redux/DispatchToProps";
import mapStateToProps from "../../redux/StateToProps";

class Navbar extends Component {

  datalocal = () => {
    const getToken = localStorage.getItem("author");
    const token = JSON.parse(getToken);
    return token?.username;
  }

  onLogout() {      
    
    fetch("/login/statusLog", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.datalocal(),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.author) {
        console.log('logout')
          this.props.logout();
          localStorage.setItem(
            "author",
            JSON.stringify({
              author: false,
              username: res.username,
            })
          );
          this.props.history.push("/");
        }
      });

  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div>Navbar</div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>

          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <div>{this.datalocal()}</div>
                <div>Profile</div>
                {this.datalocal()==="admin@world.com"?<div><Link to="/EditContent">EditContent</Link></div>:<div></div>}
                <input
                  type="button"
                  onClick={this.onLogout.bind(this)}
                  value="Logout"                  
                ></input>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Navbar);
