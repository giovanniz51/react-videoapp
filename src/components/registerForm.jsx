import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import * as userService from "../services/userService";

class RegisterForm extends Form {
	state = {
		data: {
			username: "",
			password: "",
			name: ""
		},
		errors: {}
	}

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().min(5).label("Password"),
		name: Joi.string().required().label("Name"),
	}

	doSubmit = async () => {
		try {
			const res = await userService.register(this.state.data)
			localStorage.setItem("token", res.headers["x-auth-token"])
			window.location = "/"
		}catch (e) {
			if(e.response && e.response.status === 400){
				const errors = {...this.state.errors}
				errors.username = e.response.data
				this.setState({errors})
			}
		}
	}

	render() {
		return (
			<React.Fragment>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderInput("name", "Name")}
					{this.renderButton("Register")}
				</form>
			</React.Fragment>
		)
	}
}

export default RegisterForm