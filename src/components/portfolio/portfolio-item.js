import React from "react";
// you just want to render content, pass it data, image, title, link, etc "Dump component"
export default function(props) {
    return (
        <div>
            <h3>{props.title}</h3> 
            <h4>{props.url}</h4>
        </div>
    )
}