import React , { Component} from "react";
import axios from "axios";


import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
   constructor() {
    super();
    
    this.state = {
        pageTitle: "Welcome to my portfolio",
        isLoading: false,
        data: []
    };
    
    this.handeFilter = this.handleFilter.bind(this);

   }


   handleFilter(filter) {
// el argumento podía llamarse también "selectedCategory" o algo similar para que coincida con el propósito de la función

    this.setState({
        data: this.state.data.filter(item => {
            return item.category === filter;
        })
    });
    }

    getPortfolioItems() {
        axios
          .get("https://isabelhormaeche.devcamp.space/portfolio/portfolio_items")
          .then(response => {
// "reponse" no es una key word, puede ser cualquier otra palabra (ejemplo:res) similar para que coincida con el propósito de la función

            // console.log("response data", response);
            this.setState({
                data: response.data.portfolio_items
            })
          })
          .catch(error => {
            console.log(error);
          });
    }

    portfolioItems() {
    return this.state.data.map(item => {
        return (
        <PortfolioItem 
        key={item.id} 
        item= {item}
        />
        );
    });
   }

   componentDidMount() {
    this.getPortfolioItems();
   }


    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }

        return (
            <div className="portfolio-items-wrapper">

                <button className="btn" onClick={() => this.handeFilter("eCommerce")}>eCommerce</button>
                <button className="btn" onClick={() => this.handeFilter("Scheduling")}>Scheduling</button>
                <button className="btn" onClick={() => this.handeFilter("Enterprise")}>Enterprise</button>

                {this.portfolioItems()} 
                
            </div>
        );
    }
}