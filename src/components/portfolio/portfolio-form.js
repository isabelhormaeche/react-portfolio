import React, { Component } from "react";

export default class PortfolioForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        name: "",
        description: "",
        category: "",
        position: "",
        url:"",
        thumb_image: "",
        banner_image: "",
        logo: ""
      };

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
      console.log("handle change", event);
    }


  render() {
    return (
      <div>
        <h1>PortfolioForm</h1>
      
      <form>

        <div>
          <input
          type="text"
          name="name"
          placeholder="Portfolio Item Name"
          value={this.state.name}
          onchange={this.handleChange}
          />
        
          <input
          type="text"
          name="url" // must match the ones on the state list
          placeholder="URL"
          value={this.state.url}
          onchange={this.handleChange}
          />
        </div>

        <div>
          <input
          type="text"
          name="position"
          placeholder="Position"
          value={this.state.position}
          onchange={this.handleChange}
          />
        
          <input
          type="text"
          name="category" 
          placeholder="Category"
          value={this.state.category}
          onchange={this.handleChange}
          />
        </div>

        <div>
            <input
            type="text"
            name="description" 
            placeholder="description"
            value={this.state.description}
            onchange={this.handleChange}
            />
        </div>

        <div>
              <button type="submit">Save</button>
        </div>
        
      
      </form>
      </div>
    );
  }
}