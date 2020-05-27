import React from "react";
import Joi from "joi-browser";
import FormInput from "./formInput";

class Form extends React.Component {
	state = {
		data: {},
		errors: {}
	}

	validate = () => {
		const options = {abortEarly: false};
		const {error} = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;

		const errors = {};
		const eArray = error.details.map(e => {
			return {[e.path[0]]: e.message}
		})
		eArray.forEach(e => errors[Object.keys(e)] = e[Object.keys(e)])
		return errors
	}

	validateInput = ({name, value}) => {
		const obj = {[name]: value};
		const schema = {
			[name]: this.schema[name],
		}
		const {error} = Joi.validate(obj, schema);
		return error && error.details[0].message
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({errors: errors || {}});
		if (errors) return

		this.doSubmit();
	}

	handleChange = ({target: input}) => {
		const errors = {...this.state.errors};
		const error = this.validateInput(input);
		if (error) errors[input.name] = error;
		else delete errors[input.name]

		const data = {...this.state.data}
		data[input.name] = input.value;
		this.setState({data, errors})
	}

	renderButton = label => {
		return <button disabled={this.validate()} type="submit" className="btn btn-primary">{label}</button>
	}

	renderInput = (name, label, type = "text", extra = null) => {
		const {data, errors} = this.state

		return (
			<FormInput type={type} error={errors[name]} name={name} onChange={this.handleChange} value={data[name]}
					   label={label} extra={extra}></FormInput>
		)
	}
}

export default Form