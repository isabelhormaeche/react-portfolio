import React, { Component } from "react";
import axios from "axios";




export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolioItem: {}
        }
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
            this.setState({
                portfolioItem: response.data.portfolio_item // what the server send back
            })
          
        })
        .catch(error => {
            console.log("getPortfolioItem error", error);
        });
    }

    render() {
        const { //destructuring
            banner_image_url,
            category,
            description,
            logo_url,
            name,
            thumb_image_url,
            url,
            } = this.state.portfolioItem;

        return (
                <div>
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            );
    }
}