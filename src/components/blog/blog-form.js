import React, { Component } from "react";
import axios from "axios";

import RichTextEditor from "../forms/rich-text-editor";

export default class BlogForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: "",
            blog_status: "",
            content: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);

    }

    handleRichTextEditorChange(content) {  // we´ll pass string value for content
      
      this.setState({content});  // same as  "content: content", in JS we can write just "content"
        
    }

    buildForm() {
      let  formData = new FormData();

      formData.append("portfolio_blog[title]", this.state.title);
      formData.append("portfolio_blog[blog_status]", this.state.blog_status);
      formData.append("portfolio_blog[content]", this.state.content);

      return formData;
    }

    handleSubmit(event) {
      axios.post(
        //Changed API POST url in blogForm component
        "https://isabelhmai.devcamp.space/portfolio/portfolio_blogs", 
        this.buildForm(),
      {withCredentials: true}
     )
     .then(response => {
       this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog);
       //console.log("response data", response.data);

       this.setState({
        title: "",
        blog_status:""
       });
     })
     .catch(error => {
      console.log("handleSubmit for blog error", error);
     })

        event.preventDefault();
    }


    handleChange(event) {
        //console.log("handleChange", event);
        this.setState({
            [event.target.name]: event.target.value
        });
     }
    
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <div className="two-column">

          <input 
          type="text"
          onChange={this.handleChange}
          name="title"
          placeholder="Blog Title"
          value={this.state.title}
          />

          <input 
          type="text"
          onChange={this.handleChange}
          name="blog_status"
          placeholder="Blog status"
          value={this.state.blog_status}
          />
        </div>

        <div className="one-column">
          <RichTextEditor 
           handleRichTextEditorChange = {this.handleRichTextEditorChange}
          />
        </div>

        <button className="btn" >Save</button>
      </form>
    );
  }
}