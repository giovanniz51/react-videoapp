import React, { Component } from "react";
import {getMovies} from "../services/fakeMovieService";

import Paginator from "./paginator";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import GenreList from "./genreList";
import MoviesTable from "./moviesTable";
import _ from "lodash";
class Movies extends Component {
	state = {
		movies: [],
		pageSize: 4,
		currentPage: 1,
		genres: [],
		selectedGenre: "",
		sortColumn: {path: "title", order: "asc"}
	};
	
		
	handleGenreChange = (genre) => {
		if(genre == "all"){
			this.setState({selectedGenre: ""})	
			return
		}
		const selectedGenre = this.state.genres.find(g => g == genre)
		this.setState({selectedGenre, currentPage: 1})
	}
	
	componentDidMount(){
		this.setState({movies: getMovies(), genres: getGenres()})
	}

	handleLike = (id) => {
		const likedMovie = this.state.movies.find((m) => m._id == id);
		likedMovie.liked = !likedMovie.liked;
		this.setState({ movies: this.state.movies });
	};
    
    handleDelete = (id) => {
		const newMovies = this.state.movies.filter((m) => m._id !== id);
		this.setState({ movies: newMovies });
	};

	handlePaginate = (e, page) => {
		e.preventDefault();
		this.setState({ currentPage: page });
	};
	
	handleSort = (sortColumn) => {
		this.setState({sortColumn})
	}

	render() {
		const filtered = this.state.selectedGenre ? this.state.movies.filter(m => m.genre._id == this.state.selectedGenre._id) : this.state.movies
		
		const sorted = _.orderBy(filtered, [this.state.sortColumn.path], this.state.sortColumn.order)
		
		const renderedMovies = paginate(
			sorted,
			this.state.currentPage,
			this.state.pageSize
		);
		return (
			<div className="row">
				<div className="col-12 col-lg-3">
					<GenreList genres={this.state.genres} selected={this.state.selectedGenre} onGenreChange={this.handleGenreChange}/>
				</div>
				<div className="col-12 col-lg-9">
					{filtered.length ? (
								<p>Showing {filtered.length} movies in the database</p>
							) : (
								<p>No movies</p>
							)}
					<MoviesTable sortColumn={this.state.sortColumn} onSort={this.handleSort} m={renderedMovies} onLike={this.handleLike} onDelete={this.handleDelete} />
					<Paginator
						onPaginate={this.handlePaginate}
						itemsCount={filtered.length}
						pageSize={this.state.pageSize}
						currentPage={this.state.currentPage}
					></Paginator>
				</div>
			</div>
		);
	}
}

export default Movies;
