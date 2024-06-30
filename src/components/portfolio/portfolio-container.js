import React , { Component} from "react";
import axios from "axios";


import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
   constructor() {
    super();
    
    this.state = {
        pageTitle: "Welcome to my portfolio",
        isLoading: false,
        data: [
            {title:"Quip", category: "eCommerce", slug: "quip" }, 
            {title: "Evenbrite", category: "Scheduling", slug: "evenbrite" },
            {title: "Ministry safe", category: "Enterprise", slug: "ministry-safe" },
            {title: "SwingAway", category: "eCommerce", slug: "swingAway" }
        ]
    };
    
    this.handeFilter = this.handleFilter.bind(this);
    this.getPortfolioItems = this.getPortfolioItems.bind(this);

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
            console.log("response data", response);
          })
          .catch(error => {
            console.log(error);
          });
    }


   
    portfolioItems() {
    return this.state.data.map(item => {
        return <PortfolioItem title={item.title} url={"google.com"} slug={item.slug}/>;
        // añadimos otro prop --> slug
    });
   }



    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }

        this.getPortfolioItems();
    

        return (
            <div>
                <h2>{this.state.pageTitle}</h2>

                <button onClick={() => this.handeFilter("eCommerce")}>eCommerce</button>
                <button onClick={() => this.handeFilter("Scheduling")}>Scheduling</button>
                <button onClick={() => this.handeFilter("Enterprise")}>Enterprise</button>

                {this.portfolioItems()} 

            </div>
        );
    }
}