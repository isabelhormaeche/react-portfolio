import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogForm from "../blog/blog-form";
import BlogFeaturedImage from "../blog/blog-featured-image";

export default class BlogDetail extends Component {
  constructor(props) {// we´re calling the props from the route
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
      editMode: false // we see the content but,
      // if TRUE ->edit mode-> show up the blog form
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFeaturedImageDelete = this.handleFeaturedImageDelete.bind(this);
  }
  
  handleFeaturedImageDelete() {
    this.setState({
      blogItem: {
        feature_image_url: ""
      }
    });
  }


  handleEditClick() {
    console.log("handle edit clicked");
    this.setState({ editMode: true});

  }

  getBlogItem() {
    axios
      .get(
        // testing a new BLOG DataBase: isabelhmai 
         //for removing 3 old blogs that keep showing up from corrupted July DataBase:
        `https://isabelhmai.devcamp.space/portfolio/portfolio_blogs/${this.state
          .currentId}`
      )
      .then(response => {
        //console.log("response", response);
        this.setState({
          blogItem: response.data.portfolio_blog
        });
      })
      .catch(error => {
        console.log("getBlogItem error", error);
      });
  }

  componentDidMount() {
    console.log("getBlogItem: Cargando blog..." );
    this.getBlogItem();
  }


  render() {
    console.log("currentID", this.state.currentId);

    const {
      title,
      content,
      featured_image_url,
      blog_status
    } = this.state.blogItem;

    const contentManager = () => {
      if (this.state.editMode) {
        return (
        <BlogForm 
        handleFeaturedImageDelete={this.handleFeaturedImageDelete} 
        editMode={this.state.editMode} 
        blogToEdit={this.state.blogItem} 
        />
        );
      } else {
        return (
          <div className="content-container">
            <h1 onClick={this.handleEditClick}>{title}</h1>

            <BlogFeaturedImage img={featured_image_url} />

            <div className="content">{ReactHtmlParser(content)}</div>
        </div>
        )
      }
    };

    return <div className="blog-container">{contentManager()}</div>
      
  }
}