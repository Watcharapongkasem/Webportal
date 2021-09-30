import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import mapDispatchToProps from "../../redux/DispatchToProps";
import mapStateToProps from "../../redux/StateToProps";

class EditContent extends Component {
  onSubmit(e) {
    this.props.textInput(document.getElementById("textcontent").value);    
  }

  render() {
    var namelist = ["ALL", "House", "Game", "Pet", "Other"];
    return (
      <div>
        <div>
          <p className="text-center mt-3">List EditContent</p>
          <div className="d-flex justify-content-between ">
            {namelist.map((value, index) => {
              return (
                <input
                  className="w-25 m-3 btn btn-light border rounded text-center"
                  type="button"
                  value={value}
                  id={index}
                />
              );
            })}
          </div>
          <div className="d-flex justify-content-center mb-2">
            <textarea
              id="textcontent"
              className="w-75 mh-100"
            ></textarea>
            <input
              type="button"
              value="POST"
              onClick={this.onSubmit.bind(this)}
              className=""
            />
          </div>
          <div class="container d-flex flex-column bd-highlight mb-3">
            <div class="p-2 bg-primary">Flex item 1</div>
            <div class="p-2 bd-highlight">Flex item 2</div>
            <div class="p-2 bd-highlight">Flex item 3</div>
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
