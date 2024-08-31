import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

 import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
 import dropzoneCss from "../../../node_modules/dropzone/dist/min/dropzone.min.css";

import RichTextEditor from "../forms/rich-text-editor";

export default class BlogForm extends Component {
    constructor(props){
        super(props);

        this.state = {
          id: "",
          title: "",
          blog_status: "",
          content: "",
          featured_image:"",
          apiUrl: "https://isabelhmai.devcamp.space/portfolio/portfolio_blogs",
          apiAction: "post"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
        // DropzoneComponent - three configuration functions:
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.featuredImageRef = React.createRef(); // for clearing off Dropzone

    }

    deleteImage(imageType) {
      axios
      .delete(
        `https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blogToEdit
          .id}?image_type=${imageType}`,
        { withCredentials: true }
      )
      .then(response => {
        this.props.handleFeaturedImageDelete();
        console.log("response from blog image delete", response);  
      })
      .catch(error => {
        console.log("deleteImage error", error);
      });
    }


    componentWillMount() {
      if (this.props.editMode) {
        // destructuring:
        const { id, title, blog_status, content } = this.props.blogToEdit;
      this.setState({
        id,
        title,
        blog_status,
        content,
        apiUrl: `https://isabelhmai.devcamp.space/portfolio/portfolio_blogs/${id}`,
        apiAction: "patch"
      });

        // this.setState({
        //   id: this.props.blogToEdit.id,
        //   title: this.props.blogToEdit.title,
        //   blog_status: this.props.blogToEdit.blog_status,
        //   content: this.props.blogToEdit.content,
        //   apiUrl: `https://isabelhmai.devcamp.space/portfolio/portfolio_blogs/${
        //     this.props.blogToEdit.id

        //   }`,
        //   apiAction: "patch"
        // });
      }
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

    handleSubmit (event) {
      axios({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        data: this.buildForm(),
        withCredentials: true
    })
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


        if(this.props.editMode) {
          // Update blog detail
          this.props.handleUpdateFormSubmission(response.data.portfolio_blog);
        } else { // Update the blog modal
          this.props.handleSuccessfullFormSubmission(
            response.data.portfolio_blog
          );
        }
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
           editMode={this.props.editMode} // from BlogDetail parent component
           // pass content only if we´re in editMode and there´s content:
           contentToEdit={
            this.props.editMode && this.props.blogToEdit.content 
            ? this.props.blogToEdit.content 
            : null
          }

          />
        </div>

        <div className="image-uploaders">
          {this.props.editMode && this.props.blogToEdit.featured_image_url ? (
            // <h1>Image goes here...</h1> 
            <div className="portfolio-manager-image-wrapper">
              <img src={this.props.blogToEdit.featured_image_url} />

              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("featured_image")}>Remove file</a>
              </div>
          </div>


          ) : (
         
          <DropzoneComponent
            ref={this.featuredImageRef}
            config={this.componentConfig()} // added () cause we want to run right away
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleFeaturedImageDrop()}
          >
            <div className="dz-message">Featured Image</div> 
          </DropzoneComponent>
          ) }
        </div>

        <button className="btn" >Save</button>
      </form>
    );
  }
}