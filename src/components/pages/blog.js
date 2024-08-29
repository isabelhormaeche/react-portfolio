import React , { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

class Blog extends Component {
    constructor() {
        super();

        //console.log("Constructor: Blog component is being constructed");

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading:true,
            blogModalIsOpen: false
        };


        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener("scroll", this.onScroll, false);
        this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick(blog) {
        //console.log("deleted", blog);
        axios
        .delete(
            `https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`,
            {withCredentials: true}
        ).then (response => {
            //console.log("res from delete", response);
            this.setState({
                blogItems: this.state.blogItems.filter(blogItem => {
                    return blog.id !== blogItem.id;
                })
            });

            return response.data;
        })
        .catch(error => {
            console.log("delete blog error", error);
        })
    }

    handleSuccessfulNewBlogSubmission(blog) {
        //this.handleModalClose();
        this.setState({
            blogModalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems)
        });

    }

    handleModalClose() {
        this.setState({
            blogModalIsOpen: false
        });

    }

    handleNewBlogClick() {
        this.setState({
            blogModalIsOpen: true
        });
    }



    onScroll() {
            if (
                this.state.isLoading ||
                this.state.blogItems.length === this.state.totalCount
              ) {
                return;
              }

               if (window.innerHeight + document.documentElement.scrollTop >= 
                   document.documentElement.offsetHeight - 1
                
            //    if (window.innerHeight + document.documentElement.scrollTop +1 > 
            //         document.documentElement.offsetHeight

            
            //  if (window.innerHeight + document.documentElement.scrollTop === 
            //          document.documentElement.offsetHeight

            // Math.ceil: para redondear hacia arriba la posición de desplazamiento, asegurando que la condición se cumpla incluso si hay pequeños errores de redondeo
            // if (
            //     window.innerHeight + Math.ceil(document.documentElement.scrollTop) === document.documentElement.offsetHeight

            ) {
                this.getBlogItems();
                console.log("get more posts");
                // this.setState({
                //     isLoading: true
                //   });

            }
    }


    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1
          });

         // testing a new BLOG DataBase: isabelhmai 
         //for removing 3 old blogs that keep showing up from corrupted July DataBase:
        axios.get(`https://isabelhmai.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
            { withCredentials: true } 
        )
        .then(response => {
            console.log("getting", response.data);
            this.setState({
                blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
                totalCount: response.data.meta.total_records,
                isLoading: false
            });
        })
        .catch(error => {
            console.log("getBlogItems error", error);
        });
    }

    componentWillMount() {
        console.log("componentWillMount:getBlogItems: Cargando blogs..." );
        console.log("LoggedInStatus en Blog:", this.props.loggedInStatus);
        this.getBlogItems();
    }

    componentWillUnmount() {
         window.removeEventListener("scroll", this.onScroll, false );
        //  if ('caches' in window) {
        //     caches.keys().then(names => {
        //       names.forEach(name => {
        //         caches.delete(name);
        //       });
        //     });
        //   }
    }

    

    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
           if(this.props.loggedInStatus === "LOGGED_IN") {
            return (
                <div key={blogItem.id} className="admin-blog-wrapper">
                    <BlogItem  blogItem={blogItem} />
                    <a onClick={() => this.handleDeleteClick(blogItem)}>
                    <FontAwesomeIcon icon="trash" />
                    </a>
                </div>
            );

           } else {
            return <BlogItem key={blogItem.id} blogItem={blogItem} />
           }
        });
      

        return (
            <div className="blog-container">
                <BlogModal 
                handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission}
                handleModalClose={this.handleModalClose}
                modalIsOpen={this.state.blogModalIsOpen} />
                   

                {this.props.loggedInStatus === "LOGGED_IN" ? (
                <div className="new-blog-link">
                <a onClick={this.handleNewBlogClick}>
                <FontAwesomeIcon icon="plus-circle" />
                </a>
                </div>
                ) : null}


                 <div className="content-container">
                 {blogRecords}
                 </div>

                {this.state.isLoading ? (
                    <div className="content-loader">
                        <FontAwesomeIcon icon="spinner" spin />
                    </div>
                ) : null}
            </div>
          );
    }
}

export default Blog;