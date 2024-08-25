import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogFeaturedImage from "../blog/blog-featured-image";

export default class BlogDetail extends Component {
  constructor(props) {// we´re calling the props from the route
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      //we have to populate it
      blogItem: {}
    };
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

    return (
      <div className="blog-container">
        <div className="content-container">
            <h1>{title}</h1>

            <BlogFeaturedImage img={featured_image_url} />

            <div className="content">{ReactHtmlParser(content)}</div>
        </div>
    </div>
    );
  }
}