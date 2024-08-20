import React, { Component } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement(".app-wrapper");
export default class BlogModal extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%",
        width: "800px"
      },
      overlay: {
        backgroundColor: "rgba(1, 1, 1, 0.75)"   //darken all of the area around the modal
      }
    };
  }

  render() {
    return (
      <ReactModal 
      style={this.customStyles}
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
