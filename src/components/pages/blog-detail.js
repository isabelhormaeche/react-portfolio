import React, { Component } from "react";
import axios from "axios";

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
        `https://isabelhormaeche.devcamp.space/portfolio/portfolio_blogs/${this.state
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
    this.getBlogItem();
  }


  render() {
    //console.log("currentID", this.state.currentId);

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

            <div className="featured-image-wrapper">
              <img src={featured_image_url} />
            </div>

            <div className="content">{content}</div>
        </div>
    </div>
    );
  }
}