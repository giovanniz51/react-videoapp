import httpService from "./httpService";

export function getGenres() {
	return httpService.get("http://localhost:3900/api/genres")
}

export function findGenre(id){
	httpService.get("http://localhost:3900/api/genres").then(data => data.data.find(g => g._id == id))
}
