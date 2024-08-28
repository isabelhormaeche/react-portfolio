import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactPagePicture from "../../../static/assets/images/contact/james-harrison-vpOeXr5wmR4-unsplash.jpg";

export default function(){
    return (
       
        <div className="content-page-wrapper">
           <div 
           className="left-column" 
           style={{
            background: "url(" + ContactPagePicture + ") no-repeat", 
            backgroundSize: "cover",
            backgroundPosition: 'center' // Centra la imagen
        }}
           />
                
            <div className="right-column">
                <div className="contact-bullet-points">
                    <div className="bullet-point-group">
                        <div className="icon">
                        <FontAwesomeIcon icon="phone" />
                        </div>

                        <div className="text">555-555-5555</div>
                    </div>

                    <div className="bullet-point-group">
                        <div className="icon">
                        <FontAwesomeIcon icon="envelope" />
                        </div>

                        <div className="text">isabel@example.com</div>
                    </div>

                    <div className="bullet-point-group">
                        <div className="icon">
                        <FontAwesomeIcon icon="map-marked-alt" />
                        </div>

                        <div className="text">Bizkaia, ES</div>
                    </div>
                </div>
            </div>
        </div>
    );
}