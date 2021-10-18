import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { compose } from "redux";
import mapDispatchToProps from "../../redux/DispatchToProps";
import mapStateToProps from "../../redux/StateToProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  datalocal = () => {
    const getToken = localStorage.getItem("author");
    const token = JSON.parse(getToken);
    return token?.username;
  };

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
          console.log("logout");
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

  componentDidMount() {
    document.addEventListener("mouseup", function (e) {
      var container = document.getElementById("navbarNav");
      if (container && !container.contains(e.target)) {
        document.getElementById("navbarNav").classList.remove("showdis");
      }
    });
    if (this.props.location.pathname === "/home") {
      document.getElementById("linkhome").classList.add("focuslink");
    } else {
      document.getElementById("linkhome").classList.remove("focuslink");
    }
  }
  render() {
    return (
      <nav className="">
        <div className="navmenu">Web Portal</div>
        <NavLink exact to="/home" className="linkmenu navmenu" id="linkhome">
          HOME
        </NavLink>

        <button
          className="menudrop"
          type="button"
          onClick={() => {
            console.log(1);
            var classlist = document
              .getElementById("navbarNav")
              .className.split(/\s+/);
            for (var i = 0; i < classlist.length; i++) {
              if (classlist[i] === "showdis") {
                document
                  .getElementById("navbarNav")
                  .classList.remove("showdis");
              } else {
                document.getElementById("navbarNav").classList.add("showdis");
              }
            }
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div className="contentdrop mb-3" id="navbarNav">
          <ul className="navbar-nav">
            <li>
              <div>{this.datalocal()}</div>
              <div><Link to="/Profile">Profile</Link></div>
              {this.datalocal() === "admin@world.com" ? (
                <div>
                  <div>
                    <Link to="/EditContent">EditContent</Link>
                  </div>
                  <div>
                    <Link to="/Dashboard">Dashboard</Link>
                  </div>
                </div>
              ) : (
                <span></span>
              )}
              <input
                type="button"
                onClick={this.onLogout.bind(this)}
                value="Logout"
              ></input>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Navbar);
