import React, { Component } from "react";
import ReactModal from "react-modal";

export default class BlogModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactModal 
      // whenever a user clicks outside the Modal or  hit escape
      
      onRequestClose={() => {
        this.props.handleModalClose();
        //console.log("testing modal close");
      }}
      isOpen={this.props.modalIsOpen}
      >
        <h1>I'm in a modal!</h1>
      </ReactModal>
    );
  }
}
