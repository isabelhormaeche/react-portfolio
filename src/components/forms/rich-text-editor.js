import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default class RichTextEditor extends Component {
   constructor(props) {
     super(props);

     this.state = {
       editorState: EditorState.createEmpty()
     };

     this.onEditorStateChange = this.onEditorStateChange.bind(this);
   }

   onEditorStateChange(editorState) {

    this.setState(
      { editorState }, // "comma"-->the 2nd argument does not get run until first argument´s done--> updated local state
      this.props.handleRichTextEditorChange(
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
      ) 
    );
  }
    //editorState is an asynchronous event, there could be a bit of delay, ex: 0.5ms. 
    // Thus why we pass a 2nd argument.

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassname="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        /> 
      </div>
    );
  }
}