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
        console.log("response", response);
      })
      .catch(error => {
        console.log("getBlogItem error", error);
      });
  }

  componentDidMount() {
    this.getBlogItem();
  }


  render() {
    console.log("currentID", this.state.currentId);
    return (
      <div>
        <h1>Blog detail</h1>
      </div>
    );
  }
}