import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import mapDispatchToProps from "../../redux/DispatchToProps";
import mapStateToProps from "../../redux/StateToProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Content from "./Content";

class EditContent extends Component {
  async onCollection(e) {
    await fetch("/post/" + e.target.value)
      .then((res) => res.json())
      .then((res) => {
        this.props.collections(e.target.value);
        this.props.getApi({ data: res.dataPost, typePost: e.target.value });
        this.props.newType();
      });
  }

  async onSubmit(e) {
    if (this.props.typecollection !== "ALL") {
      await fetch("/post", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionPost: this.props.typecollection,
          dataPost: document.getElementById("textcontent").value,
          authorPost: "admin",
        }),
      });

      this.props.textInput(document.getElementById("textcontent").value);
      document.getElementById("textcontent").value = "";
    }
  }

  async onDelete(e) {
    var indexname = e.currentTarget.name;
    await fetch("/post", {
      method: "delete",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typecollect: this.props.getnewdata.typePost,
        index1: e.currentTarget.name,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.res === "ok") {
          this.props.removeData(indexname);
        }
      });
  }

  async onNewDelete(e) {
    var indexname = e.currentTarget.name;
    await fetch("/post", {
      method: "delete",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typecollect: this.props.getnewdata.typePost,
        index1: e.currentTarget.name,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.res === "ok") {
          this.props.deleteInput(indexname);
        }
      });
  }

  async onEdit(event) {
    console.log(this.props.geteditdata);
    await fetch("/post", {
      method: "PATCH",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typePost: this.props.getnewdata.typePost,
        EditPost: this.props.geteditdata,
        index: event.currentTarget.name,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.res === "update data") {
          this.onCollection({
            target: { value: this.props.getnewdata.typePost },
          });
        }
      });
  }

  render() {
    var namelist = ["ALL", "House", "Game", "Pet", "Other"];
    return (
      <div>
        <Content />
        <div>
          {/* typecollection */}
          <p className="text-center mt-3">List EditContent</p>
          <div className="d-flex justify-content-between ">
            {namelist.map((value, index) => {
              return (
                <input
                  className="w-25 m-3 btn btn-light border rounded text-center"
                  type="button"
                  value={value}
                  id={index}
                  onClick={this.onCollection.bind(this)}
                />
              );
            })}
          </div>
          {/* textcontent */}
          <div className="d-flex justify-content-center mb-2">
            <textarea id="textcontent" className="w-75 mh-100"></textarea>
            <input
              type="button"
              value="POST"
              onClick={this.onSubmit.bind(this)}
            />
          </div>

          {/* content */}
          <div class="container d-flex flex-column bd-highlight mb-3">
            {this.props.textcontent.map((value, index) => {
              return (
                <div class="p-2 bg-primary mb-2" id={value + index}>
                  {value}
                  <button
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target={"#offcanvasRigh" + index}
                    aria-controls="offcanvasRight1"
                    onClick={() => this.props.inputEdit("")}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <div
                    class="offcanvas offcanvas-end"
                    tabindex="-1"
                    id={"offcanvasRigh" + index}
                    aria-labelledby="offcanvasRightLabel1"
                  >
                    <div class="offcanvas-header">
                      <h5 id="offcanvasRightLabel1">
                        Edit {this.props.getnewdata.typePost}
                      </h5>
                      <button
                        type="button"
                        class="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="offcanvas-body">
                      <textarea
                        id={"textcontentEdit" + index}
                        className="w-75 mh-100"
                        value={
                          this.props.geteditdata
                            ? this.props.geteditdata
                            : value
                        }
                        onChange={(e) => this.props.inputEdit(e.target.value)}
                      ></textarea>
                     {/* update */}
                     <input
                            type="button"
                            value="Edit"
                            name={index}
                            onClick={this.onEdit.bind(this)}
                          />
                    </div>
                  </div>
                  <button onClick={this.onNewDelete.bind(this)} name={index}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              );
            })}
            {this.props.getnewdata.typePost === "ALL"
              ? this.props.getnewdata.data.map((value, index) => {
                  return (
                    <div className="p-2 bg-primary mb-2" id={value + index}>
                      <div>{namelist[index+1]}</div>
                      {value.map((value1, index1) => {
                        return (
                          <div
                            className="p-2 bg-secondary mb-2"
                            id={value1 + index1}
                          >
                            {value1}
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              : this.props.getnewdata.data.map((value, index) => {
                  return (
                    <div className="p-2 bg-primary mb-2" id={value + index}>
                      {value}
                      {/* EDIT */}
                      <button
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target={"#offcanvasRight" + index}
                        aria-controls="offcanvasRight"
                        onClick={() => this.props.inputEdit("")}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <div
                        class="offcanvas offcanvas-end"
                        tabindex="-1"
                        id={"offcanvasRight" + index}
                        aria-labelledby="offcanvasRightLabel"
                      >
                        <div class="offcanvas-header">
                          <h5 id={"offcanvasRightLabel" + index}>
                            Edit {this.props.getnewdata.typePost}
                          </h5>
                          <button
                            type="button"
                            class="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="offcanvas-body">
                          <textarea
                            id={"textcontentEdit" + index}
                            className="w-75 mh-100"
                            value={
                              this.props.geteditdata
                                ? this.props.geteditdata
                                : value
                            }
                            onChange={(e) =>
                              this.props.inputEdit(e.target.value)
                            }
                          ></textarea>
                          {/* update */}
                          <input
                            type="button"
                            value="Edit"
                            name={index}
                            onClick={this.onEdit.bind(this)}
                          />
                        </div>
                      </div>
                      {/* DELETE */}
                      <button onClick={this.onDelete.bind(this)} name={index}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EditContent);
