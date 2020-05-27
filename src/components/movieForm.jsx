import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import {getGenres, findGenre} from "../services/genreService";
import {getMovie, saveMovie, updateMovie,} from "../services/movieService";
import {ToastContainer, toast} from "react-toastify"
import logService from "../services/logService";
import 'react-toastify/dist/ReactToastify.css';

class MovieForm extends Form {
	state = {
		genres: null,
		data: {
			title: "",
			genre: "",
			numberInStock: "",
			dailyRentalRate: ""
		},
		errors: {}
	}

	async componentDidMount() {
		const genres = await getGenres()
		this.setState({genres: genres.data})
		if (this.props.match.params.id){
			const movie = await getMovie(this.props.match.params.id)
			if (!movie) return this.props.history.push("/not-found")
			const stateMovie = {...this.state.data}
			stateMovie.title = movie.title
			stateMovie.genre = movie.genre._id
			stateMovie.dailyRentalRate = movie.dailyRentalRate
			stateMovie.numberInStock = movie.numberInStock
			this.setState({data: stateMovie})
		}

	}

	schema = {
		title: Joi.string().required().label("Title"),
		genre: Joi.string().required().label("Genre"),
		numberInStock: Joi.number().greater(0).less(100).required().label("Number in Stock"),
		dailyRentalRate: Joi.number().greater(0).less(11).required().label("Rate"),
	}

	doSubmit = () => {
		const movie = {...this.state.data}
		movie._id = this.props.match.params.id || "" ;
		if(!this.props.match.params.id)
			return saveMovie(movie).then(() => this.props.history.push("/movies")).catch(e => toast.error("Please Login!"));

		return updateMovie(movie).then(() => this.props.history.push("/movies")).catch(e => toast.error("Please Login!"))
	}

	render() {
		return (
			<React.Fragment>
				<ToastContainer>
				</ToastContainer>
				<h1>New Movie</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderInput("genre", "Genre", "select", this.state.genres)}
					{this.renderInput("numberInStock", "Number in Stock", "number")}
					{this.renderInput("dailyRentalRate", "Rate", "number")}
					{this.props.match.params.id ? this.renderButton("Edit Movie") : this.renderButton("Add Movie")}
				</form>
			</React.Fragment>
		)
	}
}

export default MovieForm