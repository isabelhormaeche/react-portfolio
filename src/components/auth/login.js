import React, { Component } from "react";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlesumbit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // console.log("Handle change", event);
        // debugger;
        this.setState({
             [event.target.name]: event.target.value
         });
    }

    handleSubmit(event) {
        console.log("Handle submit", event);
    }

    render() {
        return (
            <div>
                <h1>LOGING TO ACCESS YOUR DASHBOARD</h1>

                <h2>{this.state.email}</h2>
                <h2>{this.state.password}</h2>

                <form onSubmit={this.handlesubmit}>

                    <input 
                    type="email" // specific to HTML
                    name="email" // same name as the one choosen in state
                    placeholder="Your email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    />

                    <input
                     type="password" // specific to HTML
                     name="password" // same name as the one choosen in state
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