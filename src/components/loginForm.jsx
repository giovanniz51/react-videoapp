import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import {login} from "../services/authService";

class LoginForm extends Form {
	state = {
		data: {
			username: "",
			password: ""
		},
		errors: {}
	}

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().min(5).label("Password")
	}

	doSubmit = async () => {
		const {data} = this.state
		try {
			const {data: jwt} = await login(data.username, data.password)
			localStorage.setItem("token", jwt)
			window.location = "/"
		}catch (e) {
			if (e.response && e.response.status == 400){
				const errors = {...this.state.errors}
				errors.username = e.response.data
				this.setState({errors})
			}
		}
	}

	render() {
		return (
			<React.Fragment>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderButton("Login")}
				</form>
			</React.Fragment>
		)
	}
}

export default LoginForm