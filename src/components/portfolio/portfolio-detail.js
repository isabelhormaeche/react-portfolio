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

            // a style object listing key:value pairs, is not cCSS, don´t put "";""
            const bannerStyles = {
                backgroundImage: "url(" + banner_image_url + ")",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center"
              };
          
              const logoStyles = {
                width: "200px"
              };

        return (
                <div className= "portfolio-detail-wrapper">
                    <div className="banner" style={bannerStyles}>
                        {/* //wil also use some inline styles to be dynamic */}
                        <img src={logo_url} style={logoStyles}/>
                    </div>

                    <div className="portfolio-detail-description-wrapper">
                        <div className="description">{description}</div>
                    </div>

                    <div className="bottom-content-wrapper">
                        <a  href={url} className="site-link" target="_blank" 
                        // here TARGET opens up a new tab, won't take them away from the portfolio itself
                        >
                            Visit {name}
                        </a>
                    </div>
                </div>
            );
    }
}