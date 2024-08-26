import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import RichTextEditor from "../forms/rich-text-editor";

export default class BlogForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: "",
            blog_status: "",
            content: "",
            featured_image:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
        // DropzoneComponent - three configuration functions:
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);

        this.featuredImageRef = React.createRef(); // for clearing off Dropzone

    }

    componentConfig() {
      return {
        iconFiletypes: [".jpg", ".png"],
        showFiletypeIcon: true,
        postUrl: "https://httpbin.org/post" // it´ll mimic like it's being sent --> little animation adds the check mark if the file is valid
      };
    }

    djsConfig() {
      return {
        addRemoveLinks: true,
        maxFiles: 1
      };
    }

    handleFeaturedImageDrop() {
      return {
        addedfile: file => this.setState({ featured_image: file })
      };
  }

    handleRichTextEditorChange(content) {  // we´ll pass string value for content
      
      this.setState({content});  // same as  "content: content", in JS we can write just "content"
        
    }

    buildForm() {
      let  formData = new FormData();

      formData.append("portfolio_blog[title]", this.state.title);
      formData.append("portfolio_blog[blog_status]", this.state.blog_status);
      formData.append("portfolio_blog[content]", this.state.content);

      if (this.state.featured_image) {
        formData.append(
          "portfolio_blog[featured_image]",
          this.state.featured_image
        );
      }

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
      // for clearing off Dropzone:
       if (this.state.featured_image) {
         this.featuredImageRef.current.dropzone.removeAllFiles();
       }

        this.setState({
          title: "",
          blog_status:"",
          content: "",
          featured_image: ""
        });


        this.props.handleSuccessfullFormSubmission(
          response.data.portfolio_blog
        );
       //console.log("response data", response.data);
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

        <div className="image-uploaders">
          <DropzoneComponent
            ref={this.featuredImageRef}
            config={this.componentConfig()} // added () cause we want to run right away
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleFeaturedImageDrop()}
          >
            <div className="dz-message">Featured Image</div> 
          </DropzoneComponent>
        </div>

        <button className="btn" >Save</button>
      </form>
    );
  }
}