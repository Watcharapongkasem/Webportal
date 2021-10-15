import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import mapDispatchToProps from "../../redux/DispatchToProps";
import mapStateToProps from "../../redux/StateToProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Content from "./Content";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

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
    console.log(event.currentTarget.name);
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
            <Content />
          </div>

          {/* content */}
          <div class="container d-flex flex-column bd-highlight mb-3">
            {this.props.textcontent.map((value, index) => {
              return (
                <div class="bg-primary mb-2 defaultheight" id={value + index}>
                  {/* DATA */}
                  <div
                    className="maindata"
                    dangerouslySetInnerHTML={{ __html: value }}
                  />
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
                      <CKEditor
                        onReady={(editor) => {
                          editor.ui
                            .getEditableElement()
                            .parentElement.insertBefore(
                              editor.ui.view.toolbar.element,
                              editor.ui.getEditableElement()
                            );

                          this.editor = editor;
                        }}
                        onError={({ willEditorRestart }) => {
                          if (willEditorRestart) {
                            this.editor.ui.view.toolbar.element.remove();
                          }
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          value === data
                            ? this.props.inputEdit("")
                            : this.props.inputEdit(data);
                        }}
                        editor={DecoupledEditor}
                        data={
                          this.props.geteditdata
                            ? this.props.geteditdata
                            : value
                        }
                        config={{
                          image: {
                            toolbar: [
                              "toggleImageCaption",
                              "imageTextAlternative",
                            ],
                          },
                          ckfinder: { uploadUrl: "/uploads" },
                        }}
                      />
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
                  <Link
                    to={`maindata?index=${index}&type=${this.props.getnewdata.typePost}`}
                    className="readmore"
                    target="_blank"
                  >
                    Read more
                  </Link>
                </div>
              );
            })}
            {this.props.getnewdata.typePost === "ALL"
              ? this.props.getnewdata.data.map((value, index) => {
                  console.log(value);
                  return (
                    <div className="p-2 bg-primary mb-2 " id={value + index}>
                      <div>{namelist[index + 1]}</div>
                      {value.map((value1, index1) => {
                        return (
                          <div
                            className="p-2 bg-secondary mb-2 defaultheight"
                            id={value1 + index1}
                          >
                            {/* DATA */}
                            <div
                              className="maindata"
                              dangerouslySetInnerHTML={{ __html: value1 }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              : this.props.getnewdata.data.map((value, index) => {
                  return (
                    <div
                      className="bg-primary mb-2 defaultheight"
                      id={value + index}
                    >
                      {/* DATA */}
                      <div
                        className="maindata"
                        dangerouslySetInnerHTML={{ __html: value }}
                      />
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
                          <CKEditor
                            onReady={(editor) => {
                              editor.ui
                                .getEditableElement()
                                .parentElement.insertBefore(
                                  editor.ui.view.toolbar.element,
                                  editor.ui.getEditableElement()
                                );

                              this.editor = editor;
                            }}
                            onError={({ willEditorRestart }) => {
                              if (willEditorRestart) {
                                this.editor.ui.view.toolbar.element.remove();
                              }
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              value === data
                                ? this.props.inputEdit("")
                                : this.props.inputEdit(data);
                            }}
                            editor={DecoupledEditor}
                            data={
                              this.props.geteditdata
                                ? this.props.geteditdata
                                : value
                            }
                            config={{
                              image: {
                                toolbar: [
                                  "toggleImageCaption",
                                  "imageTextAlternative",
                                ],
                              },
                              ckfinder: { uploadUrl: "/uploads" },
                            }}
                          />
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
                      <Link
                        to={`maindata?index=${index}&type=${this.props.getnewdata.typePost}`}
                        className="readmore"
                        target="_blank"
                      >
                        Read more
                      </Link>
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
