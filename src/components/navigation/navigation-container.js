import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { NavLink} from "react-router-dom";


const NavigationComponent = (props) => {
    const dynamicLink = (route, LinkText) => {
        return (
            <div className="nav-link-wrapper">
            <NavLink  to={route} activeClassName="nav-link-active">
                {LinkText}
            </NavLink>
            </div>
        );
    };

    const handleSignOut = () => {
        axios
            .delete("https://api.devcamp.space/logout", {
            withCredentials: true})
            .then(response =>{
                if (response.status === 200){
                    props.history.push("/");
                    props.handleSuccessfulLogout();
                }
                return response.data;
            })
            .catch(error =>{
                console.log("Error signing out", error);
            });
    };

        return (
            <div className="nav-wrapper">
                <div className="left-side">
                    <div className="nav-link-wrapper">
                        <NavLink exact to="/" activeClassName="nav-link-active">
                            Home
                        </NavLink>
                    </div>

                    <div className="nav-link-wrapper">
                        <NavLink exact to="/about-me" activeClassName="nav-link-active">
                            About
                        </NavLink>
                    </div>

                    <div className="nav-link-wrapper">
                    <NavLink exact to="/contact"activeClassName="nav-link-active">
                        Contact
                    </NavLink>
                    </div>

                    <div className="nav-link-wrapper">
                    <NavLink exact to="/blog" activeClassName="nav-link-active">
                        Blog
                    </NavLink>
                    </div>
                    
                    {/* <div className="nav-link-wrapper">
                    <NavLink exact to="/auth" activeClassName="nav-link-active">
                        Log in
                    </NavLink>
                    </div> */}
                   
                    {props.loggedInStatus === "LOGGED_IN" ? (
                        dynamicLink("/portfolio-manager", "Portfolio Manager")
                    ) : null }
                    
                    {/*  Added dynamic LOG IN to redirect to /auth */}
                    {props.loggedInStatus === "NOT_LOGGED_IN" ? (
                        dynamicLink("/auth", "Log in")
                    ) : null }

                    
                </div>
                <div className="right-side">
                    ISABEL HORMAECHE
                    {props.loggedInStatus === "LOGGED_IN" ? (
                        <a onClick={handleSignOut}>
                            <FontAwesomeIcon icon="sign-out-alt" />
                        </a>
                    ) : null}
                </div>

            </div>
        );
    }

export default withRouter(NavigationComponent);