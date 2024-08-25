import React from "react";
import { Link } from "react-router-dom";
import striptags from "striptags";
import Truncate from "react-truncate";

const BlogItem = props => {
    const {
        id,
        blog_status,
        content,
        title,
        featured_image_url
      } = props.blogItem;

      //console.log("props.blogItem", props.blogItem)

      return (
        <div>
          <Link to={`/b/${id}`}>
          <h1>{title}</h1>
          </Link>
          <div>
          <div>
            <Truncate
              lines={5}
              ellipsis={
                <span>
                  ...<Link to={`/b/${id}`}>Read more</Link>
                </span>
              }
            >
          {/* {content} */}
          {/* to remove html tags: */}
          {striptags(content)} 
        </Truncate>
      </div>
          </div>
        </div>
      );
    };
    
    export default BlogItem;