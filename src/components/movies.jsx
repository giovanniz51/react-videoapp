import React, {Component} from "react";
import {getMovies, deleteMovie} from "../services/movieService";

import Paginator from "./paginator";
import {paginate} from "../utils/paginate";
import {getGenres} from "../services/genreService";
import GenreList from "./genreList";
import MoviesTable from "./moviesTable";
import Form from "./form";

import _ from "lodash";

class Movies extends Component {
	state = {
		movies: [],
		pageSize: 4,
		currentPage: 1,
		genres: [],
		selectedGenre: "",
		sortColumn: {path: "title", order: "asc"},
		searchQuery: ""
	};


	handleGenreChange = (genre) => {
		if (genre == "all") {
			this.setState({selectedGenre: ""})
			return
		}
		const selectedGenre = this.state.genres.find(g => g == genre)
		this.setState({selectedGenre, currentPage: 1, searchQuery: ""})
	}

	async componentDidMount() {
		const genres = await getGenres()
		const movies = await getMovies()
		this.setState({movies: movies.data, genres: genres.data})
	}

	handleLike = (id) => {
		const likedMovie = this.state.movies.find((m) => m._id == id);
		likedMovie.liked = !likedMovie.liked;
		this.setState({movies: this.state.movies});
	};

	handleDelete = (id) => {
		const newMovies = this.state.movies.filter((m) => m._id !== id);
		deleteMovie(id);
		this.setState({movies: newMovies});
	};

	handlePaginate = (e, page) => {
		e.preventDefault();
		this.setState({currentPage: page});
	};

	handleSort = (sortColumn) => {
		this.setState({sortColumn})
	}

	getPagedData = () => {
		let filtered;
		if (!this.state.searchQuery){
			filtered =
				this.state.selectedGenre ?
					this.state.movies.filter(m => m.genre._id == this.state.selectedGenre._id)
					: this.state.movies
		}else{
			filtered = this.state.movies.filter(m => m.title.toLowerCase().startsWith(this.state.searchQuery.toLowerCase()))
		}

		const sorted = _.orderBy(filtered, [this.state.sortColumn.path], this.state.sortColumn.order)

		const movies = paginate(
			sorted,
			this.state.currentPage,
			this.state.pageSize
		);

		return {
			totalCount: filtered.length,
			data: movies
		}
	}

	handleSearch = ({target}) => {
		this.setState({selectedGenre: "", searchQuery: target.value, currentPage: 1})
	}

	render() {
		const {user} = this.props
		return (
			<div className="row">
				<div className="col-12 col-lg-3">
					<GenreList genres={this.state.genres} selected={this.state.selectedGenre}
							   onGenreChange={this.handleGenreChange}/>
				</div>
				<div className="col-12 col-lg-9">
					{user && <button onClick={() => this.props.history.push("movies/new")} className={"btn btn-primary"}>New
						Movies
					</button>}
					<div className="input-group my-3">
						<input onChange={this.handleSearch} type="text" className="form-control" placeholder="Search"/>
					</div>
					{this.getPagedData().totalCount ? (
						<p>Showing {this.getPagedData().totalCount} movies in the database</p>
					) : (
						<p>No movies</p>
					)}
					<MoviesTable history={this.props.history} sortColumn={this.state.sortColumn}
								 onSort={this.handleSort} m={this.getPagedData().data} onLike={this.handleLike}
								 onDelete={this.handleDelete}/>
					<Paginator
						onPaginate={this.handlePaginate}
						itemsCount={this.getPagedData().totalCount}
						pageSize={this.state.pageSize}
						currentPage={this.state.currentPage}
					></Paginator>
				</div>
			</div>
		);
	}
}

export default Movies;
