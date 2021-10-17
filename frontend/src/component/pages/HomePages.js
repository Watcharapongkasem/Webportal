import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import mapDispatchToProps from "../../redux/DispatchToProps";
import mapStateToProps from "../../redux/StateToProps";
import "../../Home.scss";
class HomePages extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], type: "" };
  }
  async loaddata(event) {
    const classactive = document.getElementsByClassName("textimg active");
    const classactiveimg = document.getElementsByClassName("activeimg");
    while (classactive.length > 0 && classactiveimg.length > 0) {
      classactive[0].classList.remove("active");
      classactiveimg[0].classList.remove("activeimg");
    }
    const listtype = ["ALL", "HOUSE", "GAME", "PET", "OTHER"];
    document.getElementById(event.target.name).classList.add("active");
    document
      .getElementById(event.target.name + listtype.indexOf(event.target.name))
      .classList.add("activeimg");

    await fetch(
      "/home?type=" +
        event.target.name.charAt(0).toUpperCase() +
        event.target.name.slice(1).toLowerCase()
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.content,
          type:
            event.target.name.charAt(0).toUpperCase() +
            event.target.name.slice(1).toLowerCase(),
        });
      });
  }

  componentDidMount() {
    fetch("/home?type=All")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: res.content,
          type: "All",
        });
      });
    document.getElementById("ALL").classList.add("active");
    document.getElementById("ALL0").classList.add("activeimg");
  }

  render() {
    const listtype = ["ALL", "HOUSE", "GAME", "PET", "OTHER"];
    const listtype1 = ["House", "Game", "Pet", "Other"];
    return (
      <div>
        <div className="boximg">
          {listtype.map((value, index) => {
            return (
              <div className="imgtype">
                <img
                  id={value + index}
                  src={value + ".jpg"}
                  alt={value}
                  onClick={this.loaddata.bind(this)}
                  name={value}
                ></img>
                <div id={value} className="textimg">
                  <div>{value}</div>
                </div>
              </div>
            );
          })}
        </div>
        {this.state.type === "All"
          ? this.state.data.map((data, index1) => {
              return (
                <div className="listtype">
                  <div className="titletype">{listtype[index1 + 1]}</div>
                  {data.map((listdata, index) => {
                    return (
                      <div className="alldata">
                        <div
                          className="datafrom"
                          dangerouslySetInnerHTML={{ __html: listdata }}
                        />
                        <Link
                          to={`maindata?index=${index}&type=${listtype1[index1]}`}
                          target="_blank"
                          className="morethan"
                        >
                          Read more
                        </Link>
                      </div>
                    );
                  })}
                </div>
              );
            })
          : this.state.data.map((data, index) => {
              return (
                <div className="othertype">
                  <div
                    className="subdata"
                    dangerouslySetInnerHTML={{ __html: data }}
                  />
                  <Link
                    to={`maindata?index=${index}&type=${this.state.type}`}
                    className="subread"
                    target="_blank"
                  >
                    Read more
                  </Link>
                </div>
              );
            })}
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(HomePages);
