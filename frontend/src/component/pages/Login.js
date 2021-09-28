import React, { Component } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../../redux/DispatchToProps";
import mapStateToProps from "../../redux/StateToProps";

class Login extends Component {
  onSubmit(event) {
    fetch("/login/user/" + String(document.getElementById("username").value))
      .then((response) => response.json())
      .then((data) => {
        var username = document.getElementById("username").value.trim();
        var password = document.getElementById("password").value.trim();
        if (
          username.search(/\w+@\w+\.\w+\.*\w*/g) !== -1 &&
          password.length >= 8 &&
          data.username === "Not Found"
        ) {
          document.getElementById("formRegister").action = "/login";
          document.getElementById("formRegister").submit();
        } else if (data.username !== "Not Found") {
          document.getElementById("errorpas").innerText =
            "can't use this username";
          setTimeout(() => {
            document.getElementById("errorpas").innerText = "";
          }, 2000);
        } else {
          document.getElementById("errorpas").innerText =
            "password least 8 word";
          setTimeout(() => {
            document.getElementById("errorpas").innerText = "";
          }, 2000);
        }
      });
  }

  onLogin(event) {
    fetch(
      "/login/getUser?" +
        "username=" +
        String(document.getElementById("usernameLogin").value) +
        "&password=" +
        String(document.getElementById("passwordLogin").value)
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "pass") {
          this.props.login();
          this.props.history.push(
            `/home?username=${String(
              document.getElementById("usernameLogin").value
            )}`
          );
        } else if (data.result === "not pass") {
          document.getElementById("errorpasLogin").innerText =
            "wrong Username or Password";
          setTimeout(() => {
            document.getElementById("errorpasLogin").innerText = "";
          }, 2000);
        }
      });
  }

  render() {
    return (
      <div>
        <div>Register</div>
        <form method="POST" id="formRegister">
          <label for="username">username</label>
          <input
            type="email"
            placeholder="example@hotmail.com"
            id="username"
            name="username"
          ></input>
          <br />
          <label for="password">password</label>
          <input
            type="password"
            placeholder="least 8 word"
            id="password"
            name="password"
          ></input>
          <br />
          <input
            type="button"
            value="Register"
            onClick={this.onSubmit.bind(this)}
          ></input>
        </form>
        <div id="errorpas"></div>
        <div>Login</div>
        <form method="GET" id="formLogin">
          <label for="username">username</label>
          <input
            type="email"
            placeholder="example@hotmail.com"
            id="usernameLogin"
            name="usernameLogin"
          ></input>
          <br />
          <label for="password">password</label>
          <input
            type="password"
            placeholder="least 8 word"
            id="passwordLogin"
            name="passwordLogin"
          ></input>
          <br />
          <input
            type="button"
            value="Login"
            onClick={this.onLogin.bind(this)}
          ></input>
        </form>
        <div id="errorpasLogin"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
