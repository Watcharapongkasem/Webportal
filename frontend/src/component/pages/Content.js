import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import mapDispatchToProps from "../../redux/DispatchToProps";
import mapStateToProps from "../../redux/StateToProps";
import { connect } from "react-redux";

class Content extends Component {
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
          dataPost: this.props.newcontent,
          viewPost: 0,
          authorPost: "admin",
        }),
      });

      this.props.textInput(this.props.newcontent);
      this.props.textNewInput("");
    }
  }

  render() {
    return (
      <div id="textcontent">
        <CKEditor
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
            // Insert the toolbar before the editable area.
            editor.ui
              .getEditableElement()
              .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );
            this.editor = editor;
          }}
          onError={({ willEditorRestart }) => {
            // If the editor is restarted, the toolbar element will be created once again.
            // The `onReady` callback will be called again and the new toolbar will be added.
            // This is why you need to remove the older toolbar.
            if (willEditorRestart) {
              this.editor.ui.view.toolbar.element.remove();
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.props.textNewInput(data);
            console.log({ event, editor, data });
          }}
          editor={DecoupledEditor}
          data={this.props.newcontent}
          config={{
            image: {
              toolbar: [
                "imageStyle:inline",
                "imageStyle:block",
                "imageStyle:side",
                "|",
                "toggleImageCaption",
                "imageTextAlternative",
              ],
            },
            ckfinder: { uploadUrl: "/uploads" },
          }}
        />
        <input type="button" value="POST" onClick={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
