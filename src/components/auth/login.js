import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
         });
    }

    handleSubmit(event) {
        // We create an authentication session in the server
         axios
         .post("https://api.devcamp.space/sessions",
         {
             client: {
                 email: this.state.email,
                 password: this.state.password
             }
         },
         { withCredentials: true }
         ) 
         .then(response => {
            //console.log("Respuesta", response);
             if (response.data.status === "created") {
                console.log("You can come in...");
                this.props.handleSuccessfulAuth();
            } else {
                this.setState({
                    errorText: "Wrong email or password"
                });
                this.props.handleUnsuccessfulAuth();
            }
         })
         // error because something wrong with the API itself:
         .catch(error => {
            this.setState({
                errorText: "An error occurred"
            });
            this.props.handleUnsuccessfulAuth();
         });

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>LOGGING TO ACCESS YOUR DASHBOARD</h1>

                <div>{this.state.errorText}</div>

                {/* <h2>{this.state.email}</h2>
                <h2>{this.state.password}</h2> */}

                <form onSubmit={this.handleSubmit}>

                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Your email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />

                    <input
                        type="password" 
                        name="password" 
                        placeholder="Your password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}