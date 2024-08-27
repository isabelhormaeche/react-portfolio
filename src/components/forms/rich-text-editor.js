import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { resolve } from "path";
import { rejects } from "assert";

export default class RichTextEditor extends Component {
   constructor(props) {
     super(props);

     this.state = {
       editorState: EditorState.createEmpty()
     };

     this.onEditorStateChange = this.onEditorStateChange.bind(this);
     this.getBase64 = this.getBase64.bind(this);
     this.uploadFile = this.uploadFile.bind(this);
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

    getBase64(file, callback) {
      let reader = new FileReader();
      reader.readAsDataURL(file); //It is encoding it -> 
      //gives us the "result" we will pass in the callback()

      //promises:
      reader.onload = () => callback(reader.result);  // the callback is: "data => resolve({ data: {link:data} })"
      reader.onerror = error => {};
    }

    uploadFile(file) { // called by "uploadCallback"
      //console.log("upload file", file);
      return new Promise((resolve, reject) => {
        this.getBase64(file, data => resolve({ data: {link:data} }));
      });

    }

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassname="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.uploadFile,
              alt: { present: true, mandatory: false },
              previewImage: true,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
            }

          }}
        /> 
      </div>
    );
  }
}