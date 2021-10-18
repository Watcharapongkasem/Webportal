import React, { Component } from "react";
import "../../profile.scss";

export default class ProFiles extends Component {
  constructor(props) {
    super(props);
    this.state = { fname: "", lname: "", byear: "" };
  }
  async Savedata() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const byear = document.getElementById("byear").value;
    const diffyear = new Date().getFullYear() - byear;
    const getToken = localStorage.getItem("author");
    const username = JSON.parse(getToken).username;

    if (fname && lname && diffyear > 2) {
      await fetch("/login/profile", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          fname,
          lname,
          byear,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          const { fname, lname, byear } = res;
          this.setState({ fname, lname, byear });
        });
    }
  }

  componentDidMount() {
    const getToken = localStorage.getItem("author");
    const username = JSON.parse(getToken).username;
    fetch("/login/profile?username=" + username)
      .then((res) => res.json())
      .then((res) => {
        const { fname, lname, byear } = res;
        this.setState({ fname, lname, byear });
      });
  }

  render() {
    return (
      <div className="boxprofile">
        <div className="boxtitleP">
          <img src="profile.jpg" id="dashboard" alt="titledb"></img>
          <div className="texttitleP">PROFILE</div>
        </div>
        <div className="allform">
          <div className="formprofile">
            <form action="">
              <label htmlFor="fname">First name</label>
              <input type="text" id="fname" name="fname" />
              <label htmlFor="lname">Last name</label>
              <input type="text" id="lname" name="lname" />
              <label htmlFor="byear">Year of birth</label>
              <input type="number" id="byear" name="byear" />
              <input
                type="button"
                defaultValue="Save"
                onClick={this.Savedata.bind(this)}
              />
            </form>
          </div>
          <div className="formprofile">
            <div className="titletable">RECENT PROFILE</div>
            <table>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Year of birth</th>
              </tr>
              <tr>
                <td>{this.state.fname}</td>
                <td>{this.state.lname}</td>
                <td>{this.state.byear}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
