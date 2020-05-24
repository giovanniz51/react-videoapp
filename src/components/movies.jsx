import React, { Component } from "react";
import * as fakeMovieService from "../services/fakeMovieService";
import Like from "./like";
import Paginator from "./paginator";
import { paginate } from "../utils/paginate";

class Movies extends Component {
	state = {
		movies: fakeMovieService.getMovies(),
		pageSize: 4,
		currentPage: 1,
	};

	handleDelete = (id) => {
		const newMovies = this.state.movies.filter((m) => m._id !== id);
		this.setState({ movies: newMovies });
	};

	handleLike = (id) => {
		const likedMovie = this.state.movies.find((m) => m._id == id);
		likedMovie.liked = !likedMovie.liked;
		this.setState({ movies: this.state.movies });
	};

	renderMovies = () => {
		const renderedMovies = paginate(
			this.state.movies,
			this.state.currentPage,
			this.state.pageSize
		);

		return renderedMovies.map((m) => (
			<tr key={m._id}>
				<td>{m.title}</td>
				<td>{m.genre.name}</td>
				<td>{m.numberInStock}</td>
				<td>{m.dailyRentalRate}</td>
				<td>
					<Like liked={m.liked} id={m._id} onLike={this.handleLike}></Like>
				</td>
				<td>
					<button
						onClick={() => this.handleDelete(m._id)}
						className="btn btn-danger"
					>
						Delete
					</button>
				</td>
			</tr>
		));
	};

	handlePaginate = (e, page) => {
		e.preventDefault();
		this.setState({ currentPage: page });
	};

	render() {
		return (
			<React.Fragment>
				{this.state.movies.length ? (
					<p>Showing {this.state.movies.length} movies in the database</p>
				) : (
					<p>No movies</p>
				)}
				<table className="table table-hover">
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Genre</th>
							<th scope="col">Stock</th>
							<th scope="col">Rate</th>
							<th scope="col"></th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>{this.renderMovies()}</tbody>
				</table>
				<Paginator
					onPaginate={this.handlePaginate}
					itemsCount={this.state.movies.length}
					pageSize={this.state.pageSize}
					currentPage={this.state.currentPage}
				></Paginator>
			</React.Fragment>
		);
	}
}

export default Movies;
