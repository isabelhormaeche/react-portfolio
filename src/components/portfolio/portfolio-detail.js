import React, { Component } from "react";
import axios from "axios";

export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("componentWillMount Cargando portfolio item..." );
        this.getPortfolioItem();
    }

    getPortfolioItem() {
        axios
        .get(`https://isabelhormaeche.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug

        }`
        ,{withCredentials: true}  // no es necesario
        )
        .then(response => {
            console.log("getPortfolioItem res.", response);
          
        })
        .catch(error => {
            console.log("getPortfolioItem error", error);
        });
    }

    render() {
        return (
                <div>
                    <h2>Portfolio Detail for {this.props.match.params.slug}</h2>
                </div>
            );
    }
}