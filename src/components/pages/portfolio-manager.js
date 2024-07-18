import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";
export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItems: []
        };

        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick(portfolioItem) {
        console.log("handleDeleteClick", portfolioItem);
      }

    handleSuccessfulFormSubmission(portfolioItem) {
        //console.log("handleSuccessfulFormSubmission", portfolioItem);
        
        // update the portfolioItems state
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
          });
        
        
    }
    
    handleFormSubmissionError(error) {
        console.log("handleFormSubmissionError error", error);
    }



    getPortfolioItems() {
        axios
          .get("https://isabelhormaeche.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", {
            withCredentials: true
            })
          .then(response => {

             console.log("response from get portfolio items", response);
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            });
          })
          .catch(error => {
            console.log("Error in getPortfolioItems", error);
          });
    }
    componentDidMount() {
        this.getPortfolioItems();
       }


    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm
                        handleSuccessfulFormSubmission = {this.handleSuccessfulFormSubmission}
                        handleFormSubmissionError = {this.handleFormSubmissionError}
                    />
                </div>

                <div className="right-column">
                    <PortfolioSidebarList 
                    handleDeleteClick={this.handleDeleteClick}
                    data={this.state.portfolioItems} />
                </div>
            </div>
            
        );
    }
}