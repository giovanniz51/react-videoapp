import httpService from "./httpService";
import {getGenres} from "./genreService";

export function getMovies() {
	return httpService.get("http://localhost:3900/api/movies")
}

export function getMovie(id) {
	return getMovies().then( movies => movies.data.find(m => m._id === id));
}

export function saveMovie(movie) {
	return getMovies().then( movies => {
		let movieInDb = movies.data.find(m => m._id === movie._id) || {}

		movieInDb.title = movie.title;
		movieInDb.genreId = movie.genre;
		movieInDb.numberInStock = movie.numberInStock;
		movieInDb.dailyRentalRate = movie.dailyRentalRate;

		return httpService.post("http://localhost:3900/api/movies", movieInDb)
	});
}

export function updateMovie(movie) {
	const body = {...movie}
	body.genreId = movie.genre
	delete body.genre;
	delete body._id;
	console.log(body)
	return httpService.put("http://localhost:3900/api/movies/" + movie._id, body)
}

export function deleteMovie(id) {
	getMovies().then( movies => {
		let movieInDb = movies.data.find(m => m._id == id)
		httpService.delete("http://localhost:3900/api/movies/" + movieInDb._id, movieInDb._id)
	}).then(movie => movie);
}
