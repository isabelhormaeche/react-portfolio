import React , { Component} from "react";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
   constructor() {
    super();

    console.log("Portfolio container has rendered");
   }
   
   portfolioItems() {
    const data = ["Quip", "Evenbrite", "Ministry safe", "SwingAway"];

    return data.map(item => {
        return <PortfolioItem />;
        // return <h1>{item}</h1>;
    })
   }

    render() {
        return (
            <div>
                <h2>Portfolio items go here updated...</h2>

                {this.portfolioItems()} 
            </div>

        );
    }
}